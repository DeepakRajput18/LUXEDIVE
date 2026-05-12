"""
LUXEDIVE Fleet Demand Forecasting — ML Training Pipeline
=========================================================
Uses Prophet (time-series) + Random Forest ensemble for high-accuracy predictions.
Run this script once you have ≥3 months of real booking data.

Usage:
    cd ml/demand_forecasting
    python -m venv venv
    source venv/bin/activate  # Windows: venv\Scripts\activate
    pip install -r requirements.txt
    export DATABASE_URL="<your-supabase-connection-string>"
    python train_model.py
"""

import os
import json
import psycopg2
import pandas as pd
import numpy as np
from datetime import datetime, timedelta
from psycopg2.extras import RealDictCursor
from dotenv import load_dotenv

load_dotenv()

DB_URL = os.getenv("DATABASE_URL")

# ─────────────────────────────────────────────────────────────────────────────
# Data Fetching
# ─────────────────────────────────────────────────────────────────────────────

def get_conn():
    return psycopg2.connect(DB_URL)


def fetch_booking_data() -> pd.DataFrame:
    """Fetch historical confirmed/completed bookings from Supabase."""
    conn = get_conn()
    query = """
        SELECT
            b.id AS booking_id,
            b.car_id,
            c.brand || ' ' || c.model AS car_name,
            c.category,
            DATE(b.pickup_datetime) AS pickup_date,
            DATE(b.dropoff_datetime) AS dropoff_date,
            b.total_amount,
            b.status,
            EXTRACT(DOW FROM b.pickup_datetime) AS day_of_week,
            EXTRACT(MONTH FROM b.pickup_datetime) AS month,
            EXTRACT(YEAR FROM b.pickup_datetime) AS year,
            EXTRACT(WEEK FROM b.pickup_datetime) AS week_of_year
        FROM bookings b
        JOIN cars c ON c.id = b.car_id
        WHERE b.status IN ('confirmed', 'completed', 'active')
          AND b.pickup_datetime >= NOW() - INTERVAL '12 months'
        ORDER BY b.pickup_datetime ASC
    """
    df = pd.read_sql(query, conn)
    conn.close()
    print(f"  Fetched {len(df)} bookings")
    return df


def fetch_events_data() -> pd.DataFrame:
    """Fetch Ahmedabad events calendar."""
    conn = get_conn()
    query = "SELECT * FROM ahmedabad_events ORDER BY start_date"
    df = pd.read_sql(query, conn)
    conn.close()
    print(f"  Fetched {len(df)} events")
    return df


def fetch_search_analytics() -> pd.DataFrame:
    """Fetch car search/view analytics data."""
    conn = get_conn()
    query = """
        SELECT car_id, search_date, view_count, click_count
        FROM car_search_analytics
        WHERE search_date >= NOW() - INTERVAL '6 months'
    """
    df = pd.read_sql(query, conn)
    conn.close()
    print(f"  Fetched {len(df)} analytics rows")
    return df


def fetch_all_cars() -> pd.DataFrame:
    """Fetch all car IDs and metadata."""
    conn = get_conn()
    query = "SELECT id, brand, model, category, daily_rate FROM cars WHERE is_available = true"
    df = pd.read_sql(query, conn)
    conn.close()
    return df


# ─────────────────────────────────────────────────────────────────────────────
# Feature Engineering
# ─────────────────────────────────────────────────────────────────────────────

def create_features(
    bookings_df: pd.DataFrame,
    events_df: pd.DataFrame,
    search_df: pd.DataFrame
) -> pd.DataFrame:
    """Engineer features for the ML model."""

    # Aggregate: bookings per car per day
    daily = bookings_df.groupby(["car_id", "pickup_date"]).agg(
        booking_count=("booking_id", "count"),
        revenue=("total_amount", "sum")
    ).reset_index()

    daily["pickup_date"] = pd.to_datetime(daily["pickup_date"])

    # Time-based features
    daily["month"] = daily["pickup_date"].dt.month
    daily["day_of_week"] = daily["pickup_date"].dt.dayofweek  # 0=Mon,6=Sun
    daily["week_of_year"] = daily["pickup_date"].dt.isocalendar().week.astype(int)
    daily["is_weekend"] = daily["day_of_week"].isin([5, 6]).astype(int)
    daily["quarter"] = daily["pickup_date"].dt.quarter

    # Season features (Ahmedabad-specific)
    daily["is_wedding_season"] = daily["month"].isin([11, 12, 1, 2]).astype(int)
    daily["is_ipl_season"] = daily["month"].isin([4, 5]).astype(int)
    daily["is_festival_month"] = daily["month"].isin([10, 11]).astype(int)
    daily["is_summer"] = daily["month"].isin([4, 5, 6]).astype(int)
    daily["is_monsoon"] = daily["month"].isin([7, 8, 9]).astype(int)

    # Event overlap features
    events_df["start_date"] = pd.to_datetime(events_df["start_date"])
    events_df["end_date"] = pd.to_datetime(events_df["end_date"])

    event_types = ["wedding_season", "festival", "holiday", "ipl", "corporate_event"]
    for etype in event_types:
        col = f"event_{etype}"
        daily[col] = 0

    for _, event in events_df.iterrows():
        mask = (
            (daily["pickup_date"] >= event["start_date"]) &
            (daily["pickup_date"] <= event["end_date"])
        )
        etype_col = f"event_{event['event_type']}"
        if etype_col in daily.columns:
            daily.loc[mask, etype_col] = 1

    # Merge search analytics
    search_agg = search_df.groupby(["car_id", "search_date"]).agg(
        views=("view_count", "sum"),
        clicks=("click_count", "sum")
    ).reset_index()
    search_agg["search_date"] = pd.to_datetime(search_agg["search_date"])
    search_agg = search_agg.rename(columns={"search_date": "pickup_date"})

    daily = daily.merge(search_agg, on=["car_id", "pickup_date"], how="left").fillna(0)

    # Lag features per car
    daily = daily.sort_values(["car_id", "pickup_date"])
    daily["demand_lag_7"] = daily.groupby("car_id")["booking_count"].shift(7).fillna(0)
    daily["demand_lag_14"] = daily.groupby("car_id")["booking_count"].shift(14).fillna(0)
    daily["demand_lag_30"] = daily.groupby("car_id")["booking_count"].shift(30).fillna(0)
    daily["demand_rolling_7"] = daily.groupby("car_id")["booking_count"].transform(
        lambda x: x.rolling(7, min_periods=1).mean()
    )
    daily["demand_rolling_30"] = daily.groupby("car_id")["booking_count"].transform(
        lambda x: x.rolling(30, min_periods=1).mean()
    )

    daily = daily.fillna(0)
    return daily


# ─────────────────────────────────────────────────────────────────────────────
# Model Training
# ─────────────────────────────────────────────────────────────────────────────

def train_random_forest(features_df: pd.DataFrame):
    """Train Random Forest on historical data."""
    from sklearn.ensemble import RandomForestRegressor
    from sklearn.model_selection import train_test_split
    import joblib

    feature_cols = [
        "month", "day_of_week", "week_of_year", "is_weekend", "quarter",
        "is_wedding_season", "is_ipl_season", "is_festival_month",
        "is_summer", "is_monsoon",
        "views", "clicks",
        "demand_lag_7", "demand_lag_14", "demand_lag_30",
        "demand_rolling_7", "demand_rolling_30",
        "event_wedding_season", "event_festival", "event_holiday",
        "event_ipl", "event_corporate_event"
    ]

    X = features_df[feature_cols]
    y = features_df["booking_count"]

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    model = RandomForestRegressor(
        n_estimators=300,
        max_depth=15,
        min_samples_split=10,
        min_samples_leaf=5,
        random_state=42,
        n_jobs=-1
    )
    model.fit(X_train, y_train)

    train_r2 = model.score(X_train, y_train)
    test_r2 = model.score(X_test, y_test)
    print(f"  Random Forest — Train R²: {train_r2:.4f} | Test R²: {test_r2:.4f}")

    joblib.dump(model, "demand_model_rf.pkl")
    joblib.dump(feature_cols, "feature_cols.pkl")

    return model, feature_cols


def train_prophet_per_car(bookings_df: pd.DataFrame) -> dict:
    """Train a Prophet model per-car for time-series forecasting."""
    from prophet import Prophet

    car_ids = bookings_df["car_id"].unique()
    prophet_forecasts = {}

    for car_id in car_ids:
        car_df = bookings_df[bookings_df["car_id"] == car_id].copy()
        car_df = car_df.groupby("pickup_date")["booking_id"].count().reset_index()
        car_df.columns = ["ds", "y"]
        car_df["ds"] = pd.to_datetime(car_df["ds"])

        if len(car_df) < 10:
            continue  # Not enough data for prophets

        try:
            m = Prophet(
                weekly_seasonality=True,
                yearly_seasonality=True,
                changepoint_prior_scale=0.1
            )
            m.fit(car_df)

            future = m.make_future_dataframe(periods=90)
            forecast = m.predict(future)
            forecast = forecast[forecast["ds"] >= pd.Timestamp.now()]
            prophet_forecasts[str(car_id)] = forecast[["ds", "yhat", "yhat_lower", "yhat_upper"]].to_dict("records")
        except Exception as e:
            print(f"  Prophet failed for {car_id}: {e}")

    print(f"  Prophet trained for {len(prophet_forecasts)} cars")
    return prophet_forecasts


# ─────────────────────────────────────────────────────────────────────────────
# Inference: Generate Predictions
# ─────────────────────────────────────────────────────────────────────────────

def generate_predictions(model, feature_cols, cars_df: pd.DataFrame,
                          events_df: pd.DataFrame, prophet_forecasts: dict,
                          days_ahead=90) -> list[dict]:
    """Generate demand predictions for all cars for next N days."""

    today = datetime.now().date()
    predictions = []

    for _, car in cars_df.iterrows():
        car_id = str(car["id"])

        for day in range(days_ahead):
            pred_date = today + timedelta(days=day)
            month = pred_date.month
            dow = pred_date.weekday()
            is_weekend = 1 if dow >= 5 else 0

            features = {
                "month": month,
                "day_of_week": dow,
                "week_of_year": pred_date.isocalendar()[1],
                "is_weekend": is_weekend,
                "quarter": (month - 1) // 3 + 1,
                "is_wedding_season": int(month in [11, 12, 1, 2]),
                "is_ipl_season": int(month in [4, 5]),
                "is_festival_month": int(month in [10, 11]),
                "is_summer": int(month in [4, 5, 6]),
                "is_monsoon": int(month in [7, 8, 9]),
                "views": 0, "clicks": 0,
                "demand_lag_7": 0, "demand_lag_14": 0, "demand_lag_30": 0,
                "demand_rolling_7": 0, "demand_rolling_30": 0,
                "event_wedding_season": 0, "event_festival": 0,
                "event_holiday": 0, "event_ipl": 0, "event_corporate_event": 0,
            }

            # Overlay event features
            active_events = []
            for _, ev in events_df.iterrows():
                if ev["start_date"].date() <= pred_date <= ev["end_date"].date():
                    etype_col = f"event_{ev['event_type']}"
                    if etype_col in features:
                        features[etype_col] = 1
                    active_events.append(ev["event_type"])

            X = pd.DataFrame([{k: features[k] for k in feature_cols}])
            raw_pred = float(model.predict(X)[0])

            # Blend with Prophet if available
            prophet_score = None
            if car_id in prophet_forecasts:
                for fc in prophet_forecasts[car_id]:
                    if str(fc["ds"])[:10] == str(pred_date):
                        prophet_score = max(0, fc["yhat"])
                        break

            if prophet_score is not None:
                raw_pred = 0.6 * raw_pred + 0.4 * prophet_score

            # Normalize to 0-1 demand score
            max_theoretical = 12.0
            demand_score = min(max(raw_pred / max_theoretical, 0), 0.98)

            confidence = "high" if demand_score >= 0.7 else "medium" if demand_score >= 0.4 else "low"
            predicted_bk = max(0, round(raw_pred))

            predictions.append({
                "car_id": car_id,
                "prediction_date": str(pred_date),
                "demand_score": round(demand_score, 2),
                "predicted_bookings": predicted_bk,
                "confidence_level": confidence,
                "factors": json.dumps({
                    "is_weekend": bool(is_weekend),
                    "month": month,
                    "category": car["category"],
                    "events": active_events,
                    "base_score": round(raw_pred / max_theoretical, 2)
                })
            })

    return predictions


def save_predictions_to_db(predictions: list[dict]) -> None:
    """Upsert predictions into demand_predictions table."""
    conn = get_conn()
    cursor = conn.cursor()

    # Delete today+ predictions first
    cursor.execute("DELETE FROM demand_predictions WHERE prediction_date >= CURRENT_DATE")

    for pred in predictions:
        cursor.execute("""
            INSERT INTO demand_predictions
                (car_id, prediction_date, demand_score, predicted_bookings,
                 confidence_level, factors)
            VALUES (%s, %s, %s, %s, %s, %s::jsonb)
            ON CONFLICT (car_id, prediction_date) DO UPDATE SET
                demand_score = EXCLUDED.demand_score,
                predicted_bookings = EXCLUDED.predicted_bookings,
                confidence_level = EXCLUDED.confidence_level,
                factors = EXCLUDED.factors,
                updated_at = NOW()
        """, (
            pred["car_id"],
            pred["prediction_date"],
            pred["demand_score"],
            pred["predicted_bookings"],
            pred["confidence_level"],
            pred["factors"]
        ))

    conn.commit()
    conn.close()
    print(f"  Saved {len(predictions)} predictions to demand_predictions")


# ─────────────────────────────────────────────────────────────────────────────
# Main Pipeline
# ─────────────────────────────────────────────────────────────────────────────

def main():
    print("\n🚀 LUXEDIVE Demand Forecasting Pipeline")
    print("=" * 50)

    if not DB_URL:
        print("❌ DATABASE_URL not set. Please set the environment variable.")
        return

    print("\n📊 Fetching data...")
    bookings_df = fetch_booking_data()
    events_df = fetch_events_data()
    search_df = fetch_search_analytics()
    cars_df = fetch_all_cars()

    if len(bookings_df) < 50:
        print("⚠️  Less than 50 bookings found. Rule-based predictions will be more accurate.")
        print("   Consider running the SQL seed script instead.")

    print("\n🔧 Engineering features...")
    features_df = create_features(bookings_df, events_df, search_df)

    print("\n🤖 Training Random Forest...")
    model, feature_cols = train_random_forest(features_df)

    print("\n📈 Training Prophet (per car time-series)...")
    events_df["start_date"] = pd.to_datetime(events_df["start_date"])
    events_df["end_date"] = pd.to_datetime(events_df["end_date"])
    prophet_forecasts = train_prophet_per_car(bookings_df)

    print("\n🔮 Generating predictions for next 90 days...")
    predictions = generate_predictions(
        model, feature_cols, cars_df, events_df, prophet_forecasts, days_ahead=90
    )

    print(f"  Generated {len(predictions)} total predictions")

    print("\n💾 Saving to Supabase...")
    save_predictions_to_db(predictions)

    print("\n✅ Done! Fleet demand predictions updated.")
    print("   Check Supabase: SELECT * FROM demand_predictions ORDER BY demand_score DESC LIMIT 10;")


if __name__ == "__main__":
    main()
