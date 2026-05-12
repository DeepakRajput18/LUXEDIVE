import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';
import { 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  CreditCard, 
  Car, 
  Calendar, 
  ChevronRight,
  ArrowRight,
  ShieldAlert,
  HelpCircle,
  FileText
} from 'lucide-react';
import { motion } from 'framer-motion';
import { jsPDF } from 'jspdf';
import { useAuth } from '../../contexts/AuthContext';

export default function PendingBookingPage() {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [booking, setBooking] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);

  const imageUrlToBase64 = async (url: string): Promise<string | null> => {
    try {
      const response = await fetch(url, { mode: 'cors' });
      const blob = await response.blob();
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(blob);
      });
    } catch (e) {
      console.warn('Failed to convert image to base64:', e);
      return null;
    }
  };

  const handleDownloadReceipt = async () => {
    if (!booking) return;
    setIsGenerating(true);

    try {
      const doc = new jsPDF();
      const primaryColor = '#F59E0B'; // Amber 500
      const textColor = '#000000';
      const secondaryTextColor = '#6B7280';
      const dividerColor = '#E5E7EB';

      // --- Header / Logo ---
      doc.setFillColor(0, 0, 0);
      doc.rect(0, 0, 210, 45, 'F');
      
      doc.setTextColor(255, 255, 255);
      doc.setFont('serif', 'bold italic');
      doc.setFontSize(32);
      doc.text('LUXEDIVE', 20, 28);
      
      doc.setFont('serif', 'normal');
      doc.setFontSize(8);
      doc.text('INSTITUTIONAL ASSET MANAGEMENT • SECURE PROTOCOL', 20, 36);

      // --- Receipt Label ---
      doc.setTextColor(primaryColor);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.text('OFFICIAL BOOKING RECEIPT', 140, 22);
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(10);
      doc.setFont('courier', 'bold');
      doc.text(`CODE: ${booking.booking_code || 'LXD-GEN-PEND'}`, 140, 30);

      // --- Info Bar ---
      doc.setFillColor(primaryColor);
      doc.rect(20, 55, 170, 0.5, 'F');

      // --- Column Layout: Left (Client) & Right (Registry) ---
      doc.setTextColor(secondaryTextColor);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7);
      doc.text('CLIENT IDENTIFIER', 20, 65);
      doc.text('REGISTRY TIMESTAMP', 140, 65);

      doc.setTextColor(textColor);
      doc.setFontSize(9);
      doc.text(user?.email || 'Authenticated User', 20, 72);
      doc.text(new Date().toLocaleString(), 140, 72);

      // --- ASSET VISUAL SECTION ---
      const carImage = booking.cars?.images?.[0] || booking.cars?.image_url;
      if (carImage) {
          const base64 = await imageUrlToBase64(carImage);
          if (base64) {
              // Draw image container
              doc.setFillColor(249, 250, 251);
              doc.roundedRect(20, 80, 170, 70, 3, 3, 'F');
              // Add car image (centered)
              // We'll use a fixed height and maintain aspect ratio roughly
              doc.addImage(base64, 'JPEG', 45, 85, 120, 60);
          }
      }

      doc.setTextColor(secondaryTextColor);
      doc.setFontSize(7);
      doc.text('ALLOCATED ASSET', 20, 158);
      doc.setTextColor(textColor);
      doc.setFontSize(14);
      doc.setFont('serif', 'bold italic');
      doc.text(`${booking.cars?.brand} ${booking.cars?.model}`, 20, 168);

      // --- LOGISTICS GRID ---
      doc.setDrawColor(229, 231, 235);
      doc.line(20, 175, 190, 175);

      // Pickup
      doc.setTextColor(secondaryTextColor);
      doc.setFontSize(7);
      doc.text('PICKUP PROTOCOL', 20, 185);
      doc.setTextColor(textColor);
      doc.setFontSize(8);
      doc.setFont('helvetica', 'normal');
      doc.text(`Date: ${new Date(booking.pickup_date).toLocaleDateString()}`, 20, 192);
      doc.text(`Time: ${booking.pickup_time || '09:00'}`, 20, 197);
      doc.setFontSize(7);
      doc.text(booking.pickup_location || 'Main Flagship Branch', 20, 203);

      // Dropoff
      doc.setTextColor(secondaryTextColor);
      doc.setFontSize(7);
      doc.text('DROP-OFF PROTOCOL', 110, 185);
      doc.setTextColor(textColor);
      doc.setFontSize(8);
      doc.setFont('helvetica', 'normal');
      doc.text(`Date: ${new Date(booking.drop_date).toLocaleDateString()}`, 110, 192);
      doc.text(`Time: ${booking.drop_time || '09:00'}`, 110, 197);
      doc.setFontSize(7);
      doc.text(booking.drop_location || 'Main Flagship Branch', 110, 203);

      // --- PERSONNEL & PAYMENT ---
      doc.line(20, 212, 190, 212);

      // Chauffeur
      doc.setTextColor(secondaryTextColor);
      doc.setFontSize(7);
      doc.text('PERSONNEL ALLOCATION', 20, 220);
      doc.setTextColor(textColor);
      doc.setFontSize(8);
      if (booking.chauffeurs) {
          doc.text(`CHAUFFEUR: ${booking.chauffeurs.full_name}`, 20, 227);
          doc.setFontSize(7);
          doc.text(`CREDENTIALS: VERIFIED`, 20, 232);
      } else {
          doc.text('STANDARD PROTOCOL: NO CHAUFFEUR', 20, 227);
      }

      // Financials
      doc.setTextColor(secondaryTextColor);
      doc.setFontSize(7);
      doc.text('FINANCIAL AUDIT (EXCL. GST)', 110, 220);
      doc.setTextColor(textColor);
      doc.setFontSize(8);
      
      const dailyRent = booking.car_rent_per_day || 0;
      const days = booking.total_days || 1;
      const deposit = booking.security_deposit_amount || 0;
      
      doc.text(`Asset Rent: INR ${dailyRent.toLocaleString()} X ${days} days`, 110, 227);
      doc.text(`Security Deposit: INR ${deposit.toLocaleString()}`, 110, 232);
      
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.text(`TOTAL PAID: INR ${booking.total_price?.toLocaleString()}`, 110, 240);
      
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7);
      const txnId = booking.payment_proofs?.[0]?.transaction_id || 'REGISTERED_IN_AUTH';
      doc.text(`TXN ID: ${txnId}`, 110, 246);
      doc.setTextColor('#059669');
      doc.text(`METHOD: ${booking.payment_method?.toUpperCase()} • VERIFIED`, 110, 251);

      // --- FOOTER ---
      doc.setDrawColor(primaryColor);
      doc.line(20, 265, 190, 265);
      
      doc.setTextColor(secondaryTextColor);
      doc.setFontSize(6);
      doc.text('CONFIDENTIAL COMMUNICATION • LUXEDIVE SECURE ARCHIVE', 105, 275, { align: 'center' });
      doc.text('This document is a legally binding electronic record of asset reservation. Final confirmation is subject to document verification protocol.', 105, 280, { align: 'center' });

      doc.save(`LUXEDIVE_Archive_${booking.booking_code || 'LXD'}.pdf`);
    } catch (err) {
      console.error('Archive Generation Exception:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const { data, error } = await supabase
          .from('bookings')
          .select('*, cars(*), chauffeurs(*), payment_proofs(*)')
          .eq('id', bookingId)
          .single();

        if (error) throw error;
        setBooking(data);
      } catch (err) {
        console.error('Error fetching booking:', err);
      } finally {
        setLoading(false);
      }
    };

    if (bookingId) fetchBooking();
  }, [bookingId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-12 h-12 border-2 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-24 pb-12 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Success Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 px-4 py-2 rounded-full text-green-500 mb-6">
            <ShieldCheck className="w-4 h-4" />
            <span className="text-[10px] font-black uppercase tracking-widest">Payment Successfully Received</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-serif mb-4 tracking-tight italic">Your Booking is Under Review</h1>
          <p className="text-gray-400 max-w-xl mx-auto text-sm md:text-base font-light leading-relaxed">
            Our team is currently verifying your documents and booking details. This process usually takes up to <span className="text-white font-medium">1 hour</span>.
          </p>
        </motion.div>

        {/* Status Card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="md:col-span-2 space-y-8">
            <div className="bg-[#0A0B0D] border border-white/5 rounded-[2.5rem] p-8 md:p-10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 blur-[100px] -mr-32 -mt-32" />
              
              <div className="flex items-start justify-between mb-10">
                <div className="space-y-1">
                  <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest">Reference ID</p>
                  <p className="text-xl font-mono text-amber-500 font-bold">{booking?.booking_code || bookingId?.slice(-8).toUpperCase()}</p>
                </div>
                <div className="flex flex-col items-end">
                    <div className="flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-xl">
                        <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-amber-500">Awaiting Verification</span>
                    </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center shrink-0">
                      <Car className="w-5 h-5 text-gray-400" />
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest mb-1">Selected Asset</p>
                      <p className="text-white font-medium">{booking?.cars?.brand} {booking?.cars?.model}</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center shrink-0">
                      <Calendar className="w-5 h-5 text-gray-400" />
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest mb-1">Schedule</p>
                      <p className="text-sm text-white font-light">
                        {new Date(booking?.pickup_datetime).toLocaleDateString()} — {new Date(booking?.dropoff_datetime).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center shrink-0">
                      <CreditCard className="w-5 h-5 text-gray-400" />
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest mb-1">Financial Obligation</p>
                      <p className="text-white font-medium">₹{booking?.total_price?.toLocaleString()}</p>
                      <p className="text-[10px] text-green-500 font-bold uppercase mt-1">Status: Paid</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5 text-gray-400" />
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest mb-1">ETA for Confirmation</p>
                      <p className="text-sm text-amber-500 font-bold">~ 45 Minutes</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Support/Info */}
            <div className="bg-white/5 border border-white/5 rounded-3xl p-6 flex items-start gap-4">
                <ShieldAlert className="w-6 h-6 text-amber-500 mt-1 shrink-0" />
                <div>
                   <h4 className="text-sm font-bold text-white mb-1 uppercase tracking-wider">Refund Policy Information</h4>
                   <p className="text-xs text-gray-500 leading-relaxed">
                     In the rare event that your booking is not approved by our concierge team, a <span className="text-white font-medium">100% full refund</span> will be initiated to your original payment method automatically within 1 hour.
                   </p>
                </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-[#0A0B0D] border border-white/5 rounded-3xl p-8 text-center h-full flex flex-col justify-between">
                <div>
                    <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <HelpCircle className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-serif mb-4 italic">Next Steps</h3>
                    <ul className="text-left space-y-4 mb-8">
                        <li className="flex items-center gap-3">
                            <CheckCircle2 className="w-4 h-4 text-green-500" />
                            <span className="text-xs text-gray-400">Document verification</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <CheckCircle2 className="w-4 h-4 text-green-500" />
                            <span className="text-xs text-gray-400">Inventory check</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <div className="w-4 h-4 border border-white/10 rounded-full" />
                            <span className="text-xs text-gray-400">Final confirmation SMS</span>
                        </li>
                    </ul>
                </div>
                
                <div className="space-y-3">
                    <button 
                        onClick={handleDownloadReceipt}
                        disabled={isGenerating}
                        className="w-full bg-[#F59E0B] text-black py-4 rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-amber-400 transition-all flex items-center justify-center gap-2 group shadow-[0_0_20px_rgba(245,158,11,0.2)]"
                    >
                        {isGenerating ? (
                            <><div className="w-3 h-3 border-2 border-black border-t-transparent rounded-full animate-spin" /> Generating Receipt...</>
                        ) : (
                            <><FileText className="w-3 h-3" /> Download Receipt</>
                        )}
                    </button>
                    <button 
                        onClick={() => navigate('/dashboard/bookings')}
                        className="w-full bg-white text-black py-4 rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-zinc-200 transition-all flex items-center justify-center gap-2 group"
                    >
                        View Dashboard
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <button 
                         onClick={() => navigate('/services')}
                         className="w-full bg-white/5 text-gray-400 py-4 rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-white/10 transition-all border border-white/5"
                    >
                        Explore Fleet
                    </button>
                </div>
            </div>
          </div>
        </div>

        {/* Footnote */}
        <p className="text-center text-[10px] text-gray-600 uppercase font-black tracking-[0.3em]">
          Luxedive Institutional Asset Management • Secure Protocol Beta v2.4
        </p>
      </div>
    </div>
  );
}
