import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';
import { toast } from 'sonner';
import {
  Calendar,
  ArrowRight,
  DollarSign,
  Clock,
  AlertCircle,
  CheckCircle,
  ArrowLeft
} from 'lucide-react';
import { bookingService } from '../../services/bookingService';

const ExtendRental: React.FC = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [extending, setExtending] = useState(false);

  // Extension State
  const [newEndDate, setNewEndDate] = useState('');
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const [additionalCost, setAdditionalCost] = useState(0);

  useEffect(() => {
    if (bookingId) fetchBooking();
  }, [bookingId]);

  const fetchBooking = async () => {
    try {
      const data = await bookingService.getBookingById(bookingId!);
      setBooking(data);
    } catch (error) {
      toast.error("Failed to load booking details");
      navigate('/dashboard/bookings');
    } finally {
      setLoading(false);
    }
  };

  const handleCheckAvailability = async () => {
    if (!newEndDate) return;

    const currentEnd = new Date(booking.dropoff_datetime);
    const desiredEnd = new Date(newEndDate);

    if (desiredEnd <= currentEnd) {
      toast.error("New date must be after current end date");
      return;
    }

    setExtending(true);
    try {
      // Check availability for the GAP period
      // Start checking from current dropoff time to new dropoff time
      const available = await bookingService.checkAvailability(
        booking.car_id,
        currentEnd,
        desiredEnd
      );

      setIsAvailable(available);

      if (available) {
        // Calculate Days
        const diffTime = Math.abs(desiredEnd.getTime() - currentEnd.getTime());
        const extraDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        const pricePerDay = booking.car.price_per_day;
        setAdditionalCost(extraDays * pricePerDay);
      } else {
        toast.error("Vehicle is reserved during this period.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error checking availability");
    } finally {
      setExtending(false);
    }
  };

  const handleConfirmExtension = async () => {
    if (!isAvailable) return;

    setExtending(true);
    try {
      // 1. Update Booking Date & Amount
      const newTotal = booking.total_price + additionalCost;

      const { error } = await supabase
        .from('bookings')
        .update({
          dropoff_datetime: new Date(newEndDate).toISOString(),
          total_price: newTotal,
          // In real app, we'd create a new payment intent here or charge saved card
        })
        .eq('id', bookingId);

      if (error) throw error;

      toast.success("Rental extended successfully!");
      navigate(`/rental/${bookingId}/tracking`);

    } catch (err) {
      console.error(err);
      toast.error("Failed to extend rental.");
    } finally {
      setExtending(false);
    }
  };

  if (loading || !booking) return <div className="p-10 text-center">Loading...</div>;

  const currentEnd = new Date(booking.dropoff_datetime);

  return (
    <div className="min-h-screen bg-gray-50 pb-20 font-sans text-gray-900">
      {/* Header */}
      <header className="bg-black text-white p-6 sticky top-0 z-40 shadow-md">
        <div className="flex items-center gap-4 mb-4">
          <button onClick={() => navigate(-1)}><ArrowLeft className="w-6 h-6" /></button>
          <h1 className="text-xl font-bold uppercase tracking-widest">Extend Rental</h1>
        </div>
        <div>
          <p className="font-bold text-lg text-luxe-gold">{booking.car?.brand} {booking.car?.model}</p>
          <p className="text-xs text-gray-400">Current End: {currentEnd.toLocaleString()}</p>
        </div>
      </header>

      <div className="max-w-xl mx-auto p-6 space-y-6">

        {/* Date Selection */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5" /> Select New Return Date
          </h3>

          <div className="space-y-4">
            <input
              type="datetime-local"
              min={new Date(currentEnd.getTime() + 1000 * 60).toISOString().slice(0, 16)} // Min = current end + 1 min
              className="w-full bg-gray-50 border border-gray-300 p-4 rounded-lg font-mono font-bold text-lg"
              onChange={(e) => {
                setNewEndDate(e.target.value);
                setIsAvailable(null); // Reset check
              }}
            />
            <button
              onClick={handleCheckAvailability}
              disabled={!newEndDate || extending}
              className="w-full py-3 border border-black text-black rounded-lg font-bold uppercase tracking-widest text-xs hover:bg-black hover:text-white transition-all disabled:opacity-50"
            >
              {extending ? 'Checking...' : 'Check Availability'}
            </button>
          </div>
        </div>

        {/* Summary & Action */}
        {isAvailable === true && (
          <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-xl animate-fade-in">
            <div className="flex items-start gap-4 mb-4">
              <CheckCircle className="w-6 h-6 text-emerald-600 shrink-0" />
              <div>
                <h4 className="font-bold text-emerald-800">Vehicle Available!</h4>
                <p className="text-sm text-emerald-700 mt-1">
                  You can extend your rental until {new Date(newEndDate).toLocaleDateString()} for an additional fee.
                </p>
              </div>
            </div>

            <div className="flex justify-between items-center py-4 border-t border-emerald-200/50 mb-4">
              <span className="font-bold text-gray-600 text-sm uppercase">Additional Cost</span>
              <span className="font-mono font-bold text-2xl text-black">₹{additionalCost.toLocaleString()}</span>
            </div>

            <button
              onClick={handleConfirmExtension}
              disabled={extending}
              className="w-full bg-black text-white py-4 rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-emerald-600 transition-all shadow-lg flex items-center justify-center gap-2"
            >
              <DollarSign className="w-4 h-4" /> Pay & Extend Now
            </button>
          </div>
        )}

        {isAvailable === false && (
          <div className="bg-red-50 border border-red-100 p-6 rounded-xl animate-fade-in flex items-start gap-4">
            <AlertCircle className="w-6 h-6 text-red-600 shrink-0" />
            <div>
              <h4 className="font-bold text-red-800">Extension Unavailable</h4>
              <p className="text-sm text-red-700 mt-1">
                Sorry, this vehicle is booked by another client during the selected period. Please select an earlier time or return on schedule.
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ExtendRental;
