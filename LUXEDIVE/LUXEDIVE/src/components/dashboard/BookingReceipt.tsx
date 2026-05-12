import React from 'react';

export interface BookingReceiptData {
  bookingNumber?: string;
  customer: {
    name: string;
    phone: string;
    email: string;
  };
  car: {
    brand: string;
    model: string;
    category: string;
    image?: string;
  };
  chauffeur?: {
    name: string;
    experience: string | number;
    price: number;
    exp?: string | number;
  };
  trip: {
    pickup: string;
    dropoff: string;
    pickupDate: string;
    pickupTime: string;
    dropoffDate: string;
    dropoffTime: string;
    duration: string;
  };
  payment: {
    basePrice: number;
    chauffeurCharge: number;
    taxes: number;
    totalPrice: number;
  };
}

export const BookingReceipt: React.FC<{ data: BookingReceiptData }> = ({ data }) => {
  // Use professional format or fallback to the provided booking number
  const uniqueId = `LXD-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
  const displayBookingId = data.bookingNumber || uniqueId;
  const phoneNumber = data.customer.phone || "+91 9XXXXXXXXX";

  // Normalize chauffeur properties to support both `exp` and `experience` / `price` and `charges` depending on caller
  const chauffeur = data.chauffeur ? {
      name: data.chauffeur.name,
      exp: data.chauffeur.exp || data.chauffeur.experience,
      price: data.chauffeur.price || (data.chauffeur as any).charges || 0
  } : null;

  return (
    <div className="receipt-container">
      <style>{`
        @media print {
          @page {
            size: A4;
            margin: 0; /* IMPORTANT */
          }

          html, body {
            margin: 0 !important;
            padding: 0 !important;
            height: 297mm !important;
            width: 210mm !important;
            overflow: hidden !important;
            background: #000 !important;
          }

          body * {
            visibility: hidden;
          }

          .receipt-container, .receipt-container * {
            visibility: visible;
          }

          .receipt-container {
            position: absolute;
            top: 0;
            left: 0;
            width: 210mm;
            height: 297mm;
            padding: 12mm;
            box-sizing: border-box;
            background: #000 !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
        }

        .receipt-container {
          background: #0c0c0c;
          color: #fff;
          font-family: 'Poppins', sans-serif;
          width: 210mm;
          height: 297mm;
          padding: 10mm; /* Reduced slightly to ensure fit */
          box-sizing: border-box;
          margin: 0 auto;
          overflow: hidden; /* IMPORTANT */
          display: flex;
          flex-direction: column;
          page-break-after: avoid;
          page-break-before: avoid;
        }

        /* 1. CAR IMAGE FULL SHOW (NOT CROPPED) */
        .car-image {
          width: 100%;
          height: 140px; /* Reduced to 140px per strict requirement */
          object-fit: contain; /* IMPORTANT */
          border-radius: 10px;
          background: #111;
          margin-bottom: 12px;
        }

        /* 7. CONTENT FIT IN ONE PAGE */
        .section {
          margin-bottom: 6px;
          background: rgba(255, 215, 0, 0.03);
          border: 1px solid rgba(255, 215, 0, 0.2);
          border-radius: 8px;
          padding: 8px 10px;
          page-break-inside: avoid;
        }

        .section-title {
          color: gold;
          font-size: 13px;
          font-weight: bold;
          text-transform: uppercase;
          margin-bottom: 4px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .section-title::after {
          content: "";
          flex: 1;
          height: 1px;
          background: #FFD700; /* Gold divider line */
          opacity: 0.3;
        }

        p {
          margin: 2px 0;
          font-size: 11px;
          color: #ddd;
        }

        .strong-text {
          color: #fff;
          font-weight: 500;
        }

        .phone {
          color: #fff !important;
          opacity: 1 !important;
          display: block !important;
        }

        .header-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 15px;
          border-bottom: 2px solid #FFD700;
          padding-bottom: 15px;
        }

        .receipt-logo {
          font-size: 28px;
          font-weight: 800;
          color: #FFD700;
          letter-spacing: 8px;
          text-transform: uppercase;
          margin: 0;
        }

        h3 {
          margin: 0;
          font-size: 16px;
          color: #ddd;
        }

        .footer {
          margin-top: auto;
          text-align: center;
          padding-top: 15px;
          border-top: 1px solid rgba(255, 215, 0, 0.3);
        }

        .footer-msg {
          font-size: 16px;
          font-weight: 800;
          color: #FFD700;
          letter-spacing: 4px;
          text-transform: uppercase;
        }
      `}</style>

      {/* HEADER & UNIQUE BOOKING ID */}
      <div className="header-row">
        <div>
          <h1 className="receipt-logo">LUXEDIVE</h1>
          <p style={{ fontSize: '11px', color: '#888', letterSpacing: '2px', marginTop: '4px' }}>PRIVATE LUXURY MOBILITY</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <h3>Booking ID: <span style={{ color: '#FFD700' }}>{displayBookingId}</span></h3>
          <p style={{ fontSize: '12px' }}>Date: {new Date().toLocaleDateString()}</p>
        </div>
      </div>

      {/* CAR IMAGE SECTION */}
      <img className="car-image" src={data.car.image || "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800"} alt="Vehicle" />

      {/* CAR DETAILS & CLIENT PROFILE */}
      <div style={{ display: 'flex', gap: '15px' }}>
        <div className="section" style={{ flex: 1 }}>
          <div className="section-title">🚗 Car Details</div>
          <p>Car: <span className="strong-text">{data.car.brand} {data.car.model}</span></p>
          <p>Type: <span className="strong-text">{data.car.category}</span></p>
        </div>
        
        <div className="section" style={{ flex: 1 }}>
          <div className="section-title">👤 Client Profile</div>
          <p>Name: <span className="strong-text">{data.customer.name}</span></p>
          <p>Contact: <span className="strong-text phone">{phoneNumber}</span></p>
          <p>Email: <span className="strong-text">{data.customer.email}</span></p>
        </div>
      </div>

      {/* FULL ADDRESS & LOGISTICS */}
      <div className="section">
        <div className="section-title">📍 Logistics & Address</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <div>
            <p className="strong-text" style={{ color: '#FFD700', fontSize: '11px', letterSpacing: '1px', textTransform: 'uppercase' }}>Pickup Location</p>
            <p>Date: <span className="strong-text">{data.trip.pickupDate} • {data.trip.pickupTime}</span></p>
            <p>Address: <span className="strong-text">{data.trip.pickup}</span></p>
            <p>City: <span className="strong-text">Ahmedabad</span></p>
          </div>
          <div>
            <p className="strong-text" style={{ color: '#FFD700', fontSize: '11px', letterSpacing: '1px', textTransform: 'uppercase' }}>Dropoff Location</p>
            <p>Date: <span className="strong-text">{data.trip.dropoffDate} • {data.trip.dropoffTime}</span></p>
            <p>Address: <span className="strong-text">{data.trip.dropoff}</span></p>
            <p>Duration: <span className="strong-text">{data.trip.duration}</span></p>
          </div>
        </div>
      </div>

      {/* CHAUFFEUR CONDITION LOGIC */}
      <div style={{ display: 'flex', gap: '15px' }}>
        <div className="section" style={{ flex: 1 }}>
          <div className="section-title">👔 Chauffeur</div>
          {chauffeur ? (
            <div>
              <p>Name: <span className="strong-text">{chauffeur.name}</span></p>
              <p>Experience: <span className="strong-text">{chauffeur.exp} yrs</span></p>
              <p>Charge: <span className="strong-text">₹{chauffeur.price}/day</span></p>
            </div>
          ) : (
            <p className="strong-text" style={{ color: '#FFD700' }}>No Chauffeur Selected (Self-Drive)</p>
          )}
        </div>

        {/* PAYMENT SUMMARY */}
        <div className="section" style={{ flex: 1 }}>
          <div className="section-title">💳 Payment Details</div>
          <p>Base Rental: <span className="strong-text">₹{data.payment.basePrice.toLocaleString()}</span></p>
          <p>Chauffeur Fees: <span className="strong-text">₹{data.payment.chauffeurCharge.toLocaleString()}</span></p>
          <p>Taxes & Security: <span className="strong-text">₹{data.payment.taxes.toLocaleString()}</span></p>
          <div style={{ margin: '8px 0', borderBottom: '1px dashed #FFD700', opacity: 0.5 }}></div>
          <p style={{ fontSize: '16px', color: '#FFD700', fontWeight: '800' }}>Total Paid: ₹{data.payment.totalPrice.toLocaleString()}</p>
          <p>Payment Mode: <span className="strong-text">Online ✅</span></p>
        </div>
      </div>

      {/* FOOTER */}
      <div className="footer">
        <div className="footer-msg">Thank you for choosing LUXEDIVE</div>
        <p style={{ fontSize: '10px', color: '#888', marginTop: '10px' }}>
          Support: +91-LUX-DIVE | info@luxedive.com | www.luxedive.com
        </p>
        <p style={{ fontSize: '9px', color: '#555', marginTop: '5px' }}>
          This is a computer-generated confirmation receipt and does not require a physical signature.
        </p>
      </div>
    </div>
  );
};

export default BookingReceipt;
