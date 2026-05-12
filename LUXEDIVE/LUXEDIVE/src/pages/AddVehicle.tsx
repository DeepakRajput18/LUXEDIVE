import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Car, 
  Upload, 
  MapPin, 
  Info, 
  CheckCircle2, 
  AlertCircle,
  Plus,
  Trash2,
  ChevronRight,
  ChevronLeft,
  Camera,
  ShieldCheck,
  IndianRupee,
  FileText,
  Search
} from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import { toast } from '../lib/toast';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Textarea } from '../components/ui/Textarea';
import { Label } from '../components/ui/Label';
import { Select } from '../components/ui/Select';
import { SeoHelmet } from '../components/SeoHelmet';

interface CarBrand {
  brand_id: string;
  brand_name: string;
  country: string;
  is_luxury: boolean;
}

interface CarModel {
  model_id: string;
  model_name: string;
  body_type: string;
}

const YEARS = Array.from({ length: 12 }, (_, i) => (new Date().getFullYear() - i + 1).toString());

const STEPS = [
  { id: 'details', title: 'Vehicle Details', icon: Car },
  { id: 'history', title: 'History & Usage', icon: FileText },
  { id: 'photos', title: 'Photos & Address', icon: Camera },
];

export default function AddVehicle() {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    year: '',
    registration_number: '',
    buying_cost: '',
    fuel_type: '',
    transmission: '',
    seating: '',
    category: '',
    description: '',
    usage_history: '',
    faults: '',
    city: 'Ahmedabad',
    full_address: '',
    images: [] as string[],
  });

  const [brands, setBrands] = useState<CarBrand[]>([]);
  const [filteredBrands, setFilteredBrands] = useState<CarBrand[]>([]);
  const [models, setModels] = useState<CarModel[]>([]);
  
  const [selectedBrand, setSelectedBrand] = useState<CarBrand | null>(null);
  const [selectedModel, setSelectedModel] = useState<CarModel | null>(null);
  const [brandSearch, setBrandSearch] = useState('');
  const [registrationValid, setRegistrationValid] = useState<boolean | null>(null);

  useEffect(() => {
    loadBrands();
  }, []);

  useEffect(() => {
    if (brandSearch.trim() === '') {
      setFilteredBrands(brands);
    } else {
      const filtered = brands.filter(brand =>
        brand.brand_name.toLowerCase().includes(brandSearch.toLowerCase())
      );
      setFilteredBrands(filtered);
    }
  }, [brandSearch, brands]);

  useEffect(() => {
    if (selectedBrand) {
      loadModels(selectedBrand.brand_id);
    } else {
      setModels([]);
      setSelectedModel(null);
    }
  }, [selectedBrand]);

  const loadBrands = async () => {
    try {
      const { data, error } = await supabase.rpc('get_all_car_brands');
      if (error) throw error;
      setBrands(data || []);
      setFilteredBrands(data || []);
    } catch (err) {
      console.error('Error loading brands:', err);
    }
  };

  const loadModels = async (brandId: string) => {
    try {
      const { data, error } = await supabase.rpc('get_models_by_brand', {
        p_brand_id: brandId
      });
      if (error) throw error;
      setModels(data || []);
    } catch (err) {
      console.error('Error loading models:', err);
    }
  };

  const validateRegistrationNumber = async (regNumber: string) => {
    const formatted = regNumber.toUpperCase().replace(/\s/g, '');
    try {
      const { data, error } = await supabase.rpc('validate_registration_number', {
        p_registration_number: formatted
      });
      if (error) throw error;
      setRegistrationValid(data.valid);
      if (data.valid) {
        setFormData(prev => ({ ...prev, registration_number: formatted }));
      }
    } catch (err) {
      console.error('Validation error:', err);
      setRegistrationValid(false);
    }
  };

  const handleRegistrationChange = (value: string) => {
    let formatted = value.toUpperCase().replace(/[^A-Z0-9]/g, '');
    if (formatted.length >= 2) {
      formatted = formatted.slice(0, 2) + '-' + formatted.slice(2);
    }
    if (formatted.length >= 6) {
      formatted = formatted.slice(0, 5) + '-' + formatted.slice(5);
    }
    if (formatted.length >= 9) {
      formatted = formatted.slice(0, 8) + '-' + formatted.slice(8);
    }
    formatted = formatted.slice(0, 13);
    setFormData(prev => ({ ...prev, registration_number: formatted }));
    
    if (formatted.length === 13) {
      validateRegistrationNumber(formatted);
    } else {
      setRegistrationValid(null);
    }
  };

  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const newPreviews = files.map(file => URL.createObjectURL(file));
      
      setImageFiles(prev => [...prev, ...files]);
      setImagePreviews(prev => [...prev, ...newPreviews]);
    }
  };

  const removeImage = (index: number) => {
    setImageFiles(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const isStepValid = () => {
    if (currentStep === 0) {
      return (
        formData.brand !== '' &&
        formData.model !== '' &&
        formData.year !== '' &&
        formData.registration_number.length === 13 &&
        registrationValid === true &&
        formData.buying_cost !== '' &&
        formData.fuel_type !== '' &&
        formData.transmission !== '' &&
        formData.seating !== '' &&
        formData.category !== ''
      );
    }
    if (currentStep === 1) {
      return (
        formData.description.trim() !== '' &&
        formData.usage_history.trim() !== ''
      );
    }
    return true;
  };

  const nextStep = () => {
    if (currentStep < STEPS.length - 1 && isStepValid()) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo(0, 0);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    if (imageFiles.length < 3) {
      toast('Please upload at least 3 photos of your vehicle.', 'error');
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Upload Images to Supabase Storage
      const uploadedImageUrls: string[] = [];
      
      for (const file of imageFiles) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${user.id}/${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
        
        const { error: uploadError, data } = await supabase.storage
          .from('user-vehicles')
          .upload(fileName, file);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('user-vehicles')
          .getPublicUrl(fileName);
          
        uploadedImageUrls.push(publicUrl);
      }

      // 2. Call RPC to submit vehicle
      const { data: rpcResult, error: rpcError } = await supabase.rpc('submit_user_vehicle', {
        p_owner_id: user.id,
        p_brand: selectedBrand?.brand_name || formData.brand,
        p_model: selectedModel?.model_name || formData.model,
        p_year: parseInt(formData.year.toString()),
        p_registration_number: formData.registration_number,
        p_buying_cost: parseFloat(formData.buying_cost),
        p_description: formData.description,
        p_usage_history: formData.usage_history,
        p_faults: formData.faults,
        p_images: uploadedImageUrls,
        p_city: formData.city,
        p_full_address: formData.full_address,
        p_fuel_type: formData.fuel_type,
        p_transmission: formData.transmission,
        p_seating: parseInt(formData.seating),
        p_category: formData.category
      });

      if (rpcError) throw rpcError;

      setSuccess(true);
      window.scrollTo(0, 0);
    } catch (err: any) {
      console.error('Submission error:', err);
      toast(err.message || 'Failed to submit vehicle. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="fixed inset-0 z-[10000] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
        <div className="bg-zinc-900 border border-amber-500/30 rounded-[2.5rem] p-10 shadow-[0_0_100px_rgba(0,0,0,0.8)] max-w-md w-full relative animate-in zoom-in-95 slide-in-from-bottom-8 duration-500">
          <div className="flex flex-col items-center text-center">
            <div className="w-24 h-24 bg-amber-500/10 rounded-3xl flex items-center justify-center border border-amber-500/20 mb-8 animate-bounce">
              <CheckCircle2 className="w-12 h-12 text-amber-500" />
            </div>
            
            <span className="text-amber-500 text-[10px] font-black uppercase tracking-[0.4em] mb-4">Submission Captured</span>
            <h3 className="text-4xl font-serif text-white mb-6">Listing Received</h3>
            
            <p className="text-gray-400 text-sm leading-relaxed mb-10">
              Your vehicle listing has been successfully submitted to our elite curation board. Our administrators will review the details and high-resolution assets shortly.
            </p>

            <div className="space-y-4 w-full">
              <Button 
                onClick={() => navigate('/dashboard/my-vehicles')}
                className="w-full h-14 bg-white text-black hover:bg-amber-500 hover:text-white transition-all rounded-xl font-bold uppercase tracking-widest text-xs shadow-xl"
              >
                Track My Vehicle
              </Button>
              <button 
                onClick={() => setSuccess(false)}
                className="text-gray-500 hover:text-white text-[10px] uppercase font-bold tracking-widest transition-colors"
              >
                Submit another vehicle
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-luxe-black pt-28 pb-20 px-4">
      <SeoHelmet 
        title="List Your Luxury Vehicle | LUXEDIVE Marketplace"
        description="Earn from your luxury car by listing it on LUXEDIVE. Join our exclusive peer-to-peer luxury rental marketplace."
      />

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif mb-4 animate-glow bg-gradient-to-r from-luxe-gold via-luxe-gold-light to-luxe-gold bg-clip-text text-transparent">
            Monetize Your Luxury Fleet
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Join India's most exclusive luxury car rental network. High returns, professional management, and full insurance coverage.
          </p>
        </div>

        {/* Progress Stepper */}
        <div className="flex justify-between items-center mb-12 relative px-4 sm:px-12">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white/5 -translate-y-1/2 z-0" />
          <div 
            className="absolute top-1/2 left-0 h-0.5 bg-luxe-gold -translate-y-1/2 z-0 transition-all duration-500" 
            style={{ width: `${(currentStep / (STEPS.length - 1)) * 100}%` }}
          />
          
          {STEPS.map((step, index) => {
            const StepIcon = step.icon;
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;

            return (
              <div key={step.id} className="relative z-10 flex flex-col items-center">
                <div className={`
                  w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300
                  ${isActive ? 'bg-luxe-gold text-black shadow-lg shadow-luxe-gold/20 scale-110' : 
                    isCompleted ? 'bg-luxe-gold/20 text-luxe-gold border border-luxe-gold/30' : 
                    'bg-luxe-surface text-gray-500 border border-white/5'}
                `}>
                  {isCompleted ? <CheckCircle2 className="w-6 h-6" /> : <StepIcon className="w-6 h-6" />}
                </div>
                <span className={`mt-2 text-xs font-medium uppercase tracking-widest ${isActive ? 'text-luxe-gold' : 'text-gray-500'}`}>
                  {step.title}
                </span>
              </div>
            );
          })}
        </div>



        <form onSubmit={handleSubmit} className="glass-panel rounded-3xl p-6 md:p-10">
          {/* Step 1: Basic Details */}
          {currentStep === 0 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2 relative">
                  <Label>Vehicle Brand</Label>
                  <div className="relative mb-2">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 z-10" />
                    <Input
                      type="text"
                      value={brandSearch}
                      onChange={(e) => setBrandSearch(e.target.value)}
                      placeholder="Search brands..."
                      className="pl-10"
                    />
                  </div>
                  {(!selectedBrand || brandSearch !== selectedBrand.brand_name) && brandSearch.length > 0 && (
                    <div className="absolute top-16 left-0 right-0 z-50 max-h-60 overflow-y-auto bg-zinc-900 border border-white/20 rounded-lg shadow-xl custom-scrollbar">
                      {filteredBrands.length === 0 ? (
                        <div className="p-4 text-center text-gray-500 text-sm">
                          No brands found
                        </div>
                      ) : (
                        filteredBrands.map(brand => (
                          <button
                            key={brand.brand_id}
                            type="button"
                            onClick={() => {
                              setSelectedBrand(brand);
                              setBrandSearch(brand.brand_name);
                              setFormData(prev => ({ ...prev, brand: brand.brand_name, model: '' }));
                              setSelectedModel(null);
                            }}
                            className={`w-full text-left px-4 py-3 hover:bg-white/10 transition flex items-center justify-between border-b border-white/5 last:border-0 ${
                              selectedBrand?.brand_id === brand.brand_id ? 'bg-luxe-gold/10' : ''
                            }`}
                          >
                            <div>
                              <div className="text-white text-sm font-medium">{brand.brand_name}</div>
                            </div>
                          </button>
                        ))
                      )}
                    </div>
                  )}
                  {selectedBrand && brandSearch === selectedBrand.brand_name && (
                    <div className="flex items-center justify-between p-3 rounded-lg border border-luxe-gold/30 bg-luxe-gold/5 mt-2">
                       <div className="flex items-center gap-3">
                          <CheckCircle2 className="w-5 h-5 text-luxe-gold" />
                          <div>
                            <div className="text-white text-sm font-medium">{selectedBrand.brand_name}</div>
                          </div>
                       </div>
                       <button 
                         type="button" 
                         onClick={() => { setSelectedBrand(null); setBrandSearch(''); setFormData(prev => ({ ...prev, brand: '', model: '' })); }}
                         className="text-xs text-red-400 hover:text-red-300 px-2 py-1"
                       >
                         Change
                       </button>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="model">Vehicle Model</Label>
                  {!selectedBrand ? (
                    <div className="flex h-10 w-full items-center px-3 rounded-md border border-white/10 bg-black/50 text-sm text-gray-500 cursor-not-allowed">
                      Search and select a brand first
                    </div>
                  ) : models.length === 0 ? (
                    <div className="flex h-10 w-full items-center px-3 rounded-md border border-white/10 bg-black/50 text-sm text-gray-500">
                      <div className="w-4 h-4 border-2 border-gray-500 border-t-transparent rounded-full animate-spin mr-2" />
                      Loading models...
                    </div>
                  ) : (
                    <Select
                      id="model" name="model"
                      placeholder="Select Model"
                      value={selectedModel?.model_id || formData.model}
                      onChange={(e) => {
                        const model = models.find(m => m.model_id === e.target.value || m.model_name === e.target.value);
                        if (model) {
                          setSelectedModel(model);
                          setFormData(prev => ({ ...prev, model: model.model_name }));
                        }
                      }}
                      required
                      options={models.map(model => ({ 
                        value: model.model_id, 
                        label: `${model.model_name} ${model.body_type ? `(${model.body_type})` : ''}` 
                      }))}
                    />
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="year">Manufacturing Year</Label>
                  <Select
                    id="year" name="year"
                    placeholder="Select Year"
                    value={formData.year}
                    onChange={handleInputChange}
                    required
                    options={YEARS.map(year => ({ value: year, label: year }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="registration_number">Registration Number</Label>
                  <div className="relative">
                    <Input 
                      id="registration_number" name="registration_number" placeholder="GJ-01-AB-1234" 
                      value={formData.registration_number} 
                      onChange={(e) => handleRegistrationChange(e.target.value)} 
                      maxLength={13}
                      className={`uppercase tracking-wider font-mono ${
                        registrationValid === null
                          ? ''
                          : registrationValid
                          ? 'border-green-500/50 focus-visible:ring-green-500/50'
                          : 'border-red-500/50 focus-visible:ring-red-500/50'
                      }`}
                      required 
                    />
                    {registrationValid !== null && (
                      <div className={`absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-5 h-5 rounded-full ${
                        registrationValid ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'
                      }`}>
                        {registrationValid ? <CheckCircle2 className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                      </div>
                    )}
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <p className="text-xs text-gray-500">Format: STATE-DISTRICT-LETTERS-NUMBERS (e.g., GJ-01-AB-1234)</p>
                    {registrationValid === false && formData.registration_number.length === 13 && (
                      <span className="text-xs text-red-400 font-medium">Invalid format</span>
                    )}
                  </div>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="buying_cost">Estimated Market Value (₹)</Label>
                  <div className="relative">
                    <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <Input 
                      id="buying_cost" name="buying_cost" type="number" 
                      className="pl-10" placeholder="Price in INR"
                      value={formData.buying_cost} onChange={handleInputChange} required 
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">This helps us calculate the ideal daily rental rate for you.</p>
                </div>

                {/* NEW FIELDS: Fuel Type, Transmission, Seating, Category */}
                <div className="space-y-2">
                  <Label htmlFor="fuel_type">Fuel Type</Label>
                  <Select
                    id="fuel_type" name="fuel_type"
                    placeholder="Select Fuel Type"
                    value={formData.fuel_type}
                    onChange={handleInputChange}
                    required
                    options={[
                      { value: 'Petrol', label: '⛽ Petrol' },
                      { value: 'Diesel', label: '🛢️ Diesel' },
                      { value: 'Electric', label: '⚡ Electric' },
                      { value: 'Hybrid', label: '🔋 Hybrid' },
                      { value: 'CNG', label: '💨 CNG' },
                    ]}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="transmission">Transmission</Label>
                  <Select
                    id="transmission" name="transmission"
                    placeholder="Select Transmission"
                    value={formData.transmission}
                    onChange={handleInputChange}
                    required
                    options={[
                      { value: 'Automatic', label: '🔄 Automatic' },
                      { value: 'Manual', label: '⚙️ Manual' },
                    ]}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="seating">Seating Capacity</Label>
                  <Select
                    id="seating" name="seating"
                    placeholder="Select Seats"
                    value={formData.seating}
                    onChange={handleInputChange}
                    required
                    options={[
                      { value: '2', label: '2 Seats' },
                      { value: '4', label: '4 Seats' },
                      { value: '5', label: '5 Seats' },
                      { value: '6', label: '6 Seats' },
                      { value: '7', label: '7 Seats' },
                      { value: '8', label: '8 Seats' },
                    ]}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    id="category" name="category"
                    placeholder="Select Category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                    options={[
                      { value: 'LUXURY', label: '💎 Luxury' },
                      { value: 'SPORTS', label: '🏎️ Sports' },
                      { value: 'EXOTIC', label: '🌟 Exotic' },
                      { value: 'CLASSIC', label: '🏛️ Classic' },
                      { value: 'WEDDING', label: '💍 Wedding' },
                      { value: 'SUV', label: '🚙 SUV' },
                    ]}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: History & Usage */}
          {currentStep === 1 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-8">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="description">About the Vehicle</Label>
                  <Textarea 
                    id="description" name="description" 
                    placeholder="Tell us what makes this car special. Highlight features like custom interiors, performance kits, or unique history."
                    className="h-32"
                    value={formData.description} onChange={handleInputChange} required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="usage_history">Usage History & Maintenance</Label>
                  <Textarea 
                    id="usage_history" name="usage_history" 
                    placeholder="Current odometer reading, service history, and how many owners?"
                    className="h-24"
                    value={formData.usage_history} onChange={handleInputChange} required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="faults">Any Known Issues / Faults (Optional)</Label>
                  <Textarea 
                    id="faults" name="faults" 
                    placeholder="Transparency helps speed up verification."
                    className="h-20"
                    value={formData.faults} onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Photos & Physical Details */}
          {currentStep === 2 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-8">
              <div className="space-y-4">
                <Label>Vehicle Photos (Min 3 required)</Label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {imagePreviews.map((preview, index) => (
                    <div key={index} className="relative aspect-square rounded-2xl overflow-hidden group border border-white/5">
                      <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                      <button 
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  <label className="aspect-square rounded-2xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center cursor-pointer hover:border-luxe-gold/50 hover:bg-luxe-gold/5 transition-all">
                    <Plus className="w-8 h-8 text-luxe-gold mb-2" />
                    <span className="text-xs text-gray-500">Add Photo</span>
                    <input type="file" multiple accept="image/*" onChange={handleImageChange} className="hidden" />
                  </label>
                </div>
                <p className="text-xs text-gray-500 flex items-center gap-1.5">
                  <Info className="w-3 h-3" />
                  Upload clear photos of front, back, interior and side profile.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-white/5">
                <div className="space-y-2">
                  <Label htmlFor="city">City (Location of Vehicle)</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <div className="flex h-10 w-full items-center rounded-md border border-white/10 bg-white/5 px-3 pl-10 text-sm text-gray-300 cursor-not-allowed select-none">
                      Ahmedabad
                    </div>
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-luxe-gold font-medium tracking-wide">Fixed</span>
                  </div>
                  <p className="text-xs text-gray-500">LUXEDIVE currently operates in Ahmedabad only.</p>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="full_address">Pickup Address</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
                    <Textarea 
                      id="full_address" name="full_address" placeholder="Specify full address for car inspection." 
                      className="pl-10 h-24"
                      value={formData.full_address} onChange={handleInputChange} required 
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="mt-12 flex items-center justify-between border-t border-white/5 pt-8">
            <button
              type="button"
              onClick={prevStep}
              className={`flex items-center gap-2 text-gray-400 hover:text-white transition-colors ${currentStep === 0 ? 'invisible' : ''}`}
            >
              <ChevronLeft className="w-5 h-5" />
              <span>Previous Step</span>
            </button>

            {currentStep < STEPS.length - 1 ? (
              <Button 
                type="button" 
                onClick={nextStep}
                disabled={!isStepValid()}
                className={`px-8 h-12 rounded-xl flex items-center gap-2 ${
                  isStepValid() 
                    ? 'bg-zinc-800 hover:bg-zinc-700 text-white' 
                    : 'bg-zinc-800/50 text-gray-500 cursor-not-allowed'
                }`}
              >
                <span>Continue</span>
                <ChevronRight className="w-5 h-5" />
              </Button>
            ) : (
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="bg-luxe-gold hover:bg-luxe-gold-light text-black px-12 h-12 rounded-xl flex items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Listing</span>
                    <ShieldCheck className="w-5 h-5" />
                  </>
                )}
              </Button>
            )}
          </div>
        </form>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <ShieldCheck className="w-8 h-8 text-luxe-gold mb-4" />
            <h3 className="text-lg font-serif mb-2">Safe & Insured</h3>
            <p className="text-sm text-gray-500">Every rental is covered by our comprehensive ₹2Cr multi-risk insurance policy.</p>
          </div>
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <IndianRupee className="w-8 h-8 text-luxe-gold mb-4" />
            <h3 className="text-lg font-serif mb-2">High Returns</h3>
            <p className="text-sm text-gray-500">Keep 80% of the daily rental revenue. Average luxury car earns ₹2.5L/month.</p>
          </div>
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <CheckCircle2 className="w-8 h-8 text-luxe-gold mb-4" />
            <h3 className="text-lg font-serif mb-2">Full Control</h3>
            <p className="text-sm text-gray-500">Decide when your car is available. Block dates for personal use anytime.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
