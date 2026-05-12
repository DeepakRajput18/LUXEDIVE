import React, { useState, useEffect } from 'react';
import { IndianRupee } from 'lucide-react';

interface PriceInputProps {
  value: number | '';
  onChange: (value: number | '') => void;
  type: 'car' | 'chauffeur';
  label?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  min?: number;
  max?: number;
}

export function PriceInput({
  value,
  onChange,
  type,
  label,
  required = false,
  disabled = false,
  error: externalError,
  min: customMin,
  max: customMax,
}: PriceInputProps) {
  const [error, setError] = useState<string | null>(null);

  // Business logic overrides
  const MIN_PRICE = customMin !== undefined ? customMin : (type === 'chauffeur' ? 10000 : 1);
  const MAX_PRICE = customMax !== undefined ? customMax : (type === 'chauffeur' ? 30000 : 500000);

  const validatePrice = (val: number | '') => {
    if (val === '') {
      if (required) setError('Price is required');
      else setError(null);
      return false;
    }

    if (val < MIN_PRICE) {
      setError(`Minimum ₹${MIN_PRICE.toLocaleString()} required`);
      return false;
    }

    if (val > MAX_PRICE) {
      setError(`Maximum limit is ₹${MAX_PRICE.toLocaleString()}`);
      return false;
    }

    setError(null);
    return true;
  };

  useEffect(() => {
    if (value !== '') validatePrice(value);
    else setError(null);
  }, [value, type]);

  const displayError = externalError || error;

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-300">
          {label} {required && <span className="text-[#c5a659]">*</span>}
        </label>
      )}
      
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <IndianRupee className="h-5 w-5 text-gray-400" />
        </div>
        
        <input
          type="number"
          value={value}
          onChange={(e) => {
            const val = e.target.value === '' ? '' : Number(e.target.value);
            onChange(val);
            validatePrice(val);
          }}
          disabled={disabled}
          min={MIN_PRICE}
          max={MAX_PRICE}
          placeholder={`e.g. ${MIN_PRICE.toLocaleString()}`}
          className={`
            block w-full pl-10 pr-4 py-3 bg-gray-800/50 
            border transition-colors duration-200 focus:outline-none focus:ring-1
            ${displayError 
              ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500 bg-red-500/5' 
              : 'border-white/10 focus:border-[#c5a659] focus:ring-[#c5a659]'}
            rounded-lg text-white placeholder-gray-500
            disabled:opacity-50 disabled:cursor-not-allowed
          `}
        />
      </div>

      {displayError ? (
        <p className="text-sm text-red-400 animate-fade-in">{displayError}</p>
      ) : (
        <p className="text-xs text-gray-500">
          Range: ₹{MIN_PRICE.toLocaleString()} to ₹{MAX_PRICE.toLocaleString()} per day
        </p>
      )}
    </div>
  );
}
