'use client';

import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';

export interface CreateRideFormData {
  departureAddress: string;
  departureLat: number;
  departureLng: number;
  arrivalAddress: string;
  arrivalLat: number;
  arrivalLng: number;
  scheduledDeparture: string;
  price: number;
  currency: string;
  requiredSeats: number;
  acceptsAnimals: boolean;
  acceptsBaggage: boolean;
  baggageDetails?: string;
  otherPreferences?: string;
}

interface CreateRideDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateRideFormData) => Promise<void>;
  loading?: boolean;
  variant: 'user' | 'driver';
}

const defaultFormData: CreateRideFormData = {
  departureAddress: '',
  departureLat: -18.8792, // Default Antananarivo coordinates
  departureLng: 47.5079,
  arrivalAddress: '',
  arrivalLat: -18.8792,
  arrivalLng: 47.5079,
  scheduledDeparture: '',
  price: 0,
  currency: 'MGA',
  requiredSeats: 1,
  acceptsAnimals: false,
  acceptsBaggage: true,
  baggageDetails: '',
  otherPreferences: '',
};

export function CreateRideDialog({
  isOpen,
  onClose,
  onSubmit,
  loading = false,
  variant,
}: CreateRideDialogProps) {
  const [formData, setFormData] = useState<CreateRideFormData>(defaultFormData);
  const [errors, setErrors] = useState<Partial<Record<keyof CreateRideFormData, string>>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof CreateRideFormData, string>> = {};

    if (!formData.departureAddress.trim()) {
      newErrors.departureAddress = 'L\'adresse de départ est requise';
    }
    if (!formData.arrivalAddress.trim()) {
      newErrors.arrivalAddress = 'L\'adresse d\'arrivée est requise';
    }
    if (!formData.scheduledDeparture) {
      newErrors.scheduledDeparture = 'La date de départ est requise';
    }
    if (formData.price < 0) {
      newErrors.price = 'Le prix doit être positif';
    }
    if (formData.requiredSeats < 1) {
      newErrors.requiredSeats = 'Au moins 1 place est requise';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await onSubmit(formData);
      setFormData(defaultFormData);
      onClose();
    } catch (error) {
      console.error('Erreur lors de la création de la course:', error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'number' ? Number(value) : value,
    }));

    // Clear error when user starts typing
    if (errors[name as keyof CreateRideFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            {variant === 'user' ? 'Créer une nouvelle course' : 'Proposer une course'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
            type="button"
            disabled={loading}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Departure Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Adresse de départ *
            </label>
            <input
              type="text"
              name="departureAddress"
              value={formData.departureAddress}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.departureAddress ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Ex: Anosy, Antananarivo"
              disabled={loading}
            />
            {errors.departureAddress && (
              <p className="text-red-500 text-sm mt-1">{errors.departureAddress}</p>
            )}
          </div>

          {/* Arrival Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Adresse d&apos;arrivée *
            </label>
            <input
              type="text"
              name="arrivalAddress"
              value={formData.arrivalAddress}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.arrivalAddress ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Ex: Analakely, Antananarivo"
              disabled={loading}
            />
            {errors.arrivalAddress && (
              <p className="text-red-500 text-sm mt-1">{errors.arrivalAddress}</p>
            )}
          </div>

          {/* Scheduled Departure */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date et heure de départ *
            </label>
            <input
              type="datetime-local"
              name="scheduledDeparture"
              value={formData.scheduledDeparture}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.scheduledDeparture ? 'border-red-500' : 'border-gray-300'
              }`}
              disabled={loading}
            />
            {errors.scheduledDeparture && (
              <p className="text-red-500 text-sm mt-1">{errors.scheduledDeparture}</p>
            )}
          </div>

          {/* Price and Currency */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Prix</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                min="0"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.price ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="10000"
                disabled={loading}
              />
              {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Devise</label>
              <select
                name="currency"
                value={formData.currency}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={loading}
              >
                <option value="MGA">MGA</option>
                <option value="EUR">EUR</option>
                <option value="USD">USD</option>
              </select>
            </div>
          </div>

          {/* Required Seats */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre de places requises
            </label>
            <input
              type="number"
              name="requiredSeats"
              value={formData.requiredSeats}
              onChange={handleChange}
              min="1"
              max="10"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.requiredSeats ? 'border-red-500' : 'border-gray-300'
              }`}
              disabled={loading}
            />
            {errors.requiredSeats && (
              <p className="text-red-500 text-sm mt-1">{errors.requiredSeats}</p>
            )}
          </div>

          {/* Options */}
          <div className="space-y-2">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="acceptsAnimals"
                checked={formData.acceptsAnimals}
                onChange={handleChange}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                disabled={loading}
              />
              <span className="text-sm text-gray-700">Animaux acceptés</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="acceptsBaggage"
                checked={formData.acceptsBaggage}
                onChange={handleChange}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                disabled={loading}
              />
              <span className="text-sm text-gray-700">Bagages acceptés</span>
            </label>
          </div>

          {/* Baggage Details */}
          {formData.acceptsBaggage && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Détails des bagages
              </label>
              <input
                type="text"
                name="baggageDetails"
                value={formData.baggageDetails}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ex: valise, vélo"
                disabled={loading}
              />
            </div>
          )}

          {/* Other Preferences */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Autres préférences
            </label>
            <textarea
              name="otherPreferences"
              value={formData.otherPreferences}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ex: Chauffeur dynamique et cool"
              disabled={loading}
            />
          </div>

          {/* Buttons */}
          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 disabled:opacity-50"
              disabled={loading}
            >
              Annuler
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-[#E33486] text-white rounded-md hover:bg-[#c92d75] disabled:opacity-50 flex items-center justify-center gap-2"
              disabled={loading}
            >
              {loading ? (
                'Création...'
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  Créer
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
