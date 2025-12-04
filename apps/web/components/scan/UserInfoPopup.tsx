'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface Vehicle {
  id: string;
  brand?: string | null;
  model?: string | null;
  registrationNumber?: string | null;
  place: number;
  type?: {
    id: string;
    name: string;
  } | null;
  VehicleImage?: Array<{
    id: string;
    file: {
      id: string;
      url?: string | null;
      key: string;
      originalName: string;
    };
  }> | null;
}

interface Review {
  id: string;
  content: string;
  rating: number;
  createdAt: string;
}

interface UserInfoPopupProps {
  user: {
    id: string;
    firstName: string;
    lastName?: string | null;
    phone?: string | null;
    username?: string | null;
    status?: string | null;
    avatar?: {
      url?: string | null;
    } | null;
    UserCover?: {
      file?: {
        url?: string | null;
      } | null;
    } | null;
    UserImage?: Array<{
      id: string;
      file: {
        url?: string | null;
      };
    }> | null;
    Role?: Array<{
      id: string;
      name: string;
    }> | null;
    vehicles?: Vehicle[] | null;
    review?: Review[] | null;
  };
  onClose: () => void;
  onContact: () => void;
  isLoadingContact?: boolean;
}

type TabType = 'about' | 'photos' | 'reviews' | 'courses';

export default function UserInfoPopup({
  user,
  onClose,
  onContact,
  isLoadingContact = false,
}: UserInfoPopupProps) {
  const isDriver = user.Role?.some((r) => r.name === 'DRIVER' || r.name === 'driver');
  const vehicle = user.vehicles?.[0];
  const vehicleCoverImage = vehicle?.VehicleImage?.[0]?.file?.url;
  const coverImage = user.UserCover?.file?.url || vehicleCoverImage;
  const profileImage = user.avatar?.url;
  const rating = user.review?.length
    ? (user.review.reduce((acc, r) => acc + r.rating, 0) / user.review.length).toFixed(1)
    : '4.2';

  const defaultTab: TabType = isDriver ? 'about' : 'photos';
  const [activeTab, setActiveTab] = useState<TabType>(defaultTab);

  const tabs: { id: TabType; label: string; showForDriver: boolean; showForUser: boolean }[] = [
    { id: 'about', label: 'A propos', showForDriver: true, showForUser: false },
    { id: 'photos', label: 'Photos', showForDriver: true, showForUser: true },
    { id: 'reviews', label: 'Avis', showForDriver: true, showForUser: true },
    { id: 'courses', label: 'Courses', showForDriver: true, showForUser: true },
  ];

  const visibleTabs = tabs.filter((tab) => (isDriver ? tab.showForDriver : tab.showForUser));

  const renderTabContent = () => {
    switch (activeTab) {
      case 'about':
        return (
          <div className="space-y-4 py-4">
            {vehicle && (
              <>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-500">Marque</span>
                  <span className="font-medium">{vehicle.brand || '-'}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-500">Modèle</span>
                  <span className="font-medium">{vehicle.model || '-'}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-500">N° d&apos;immatriculation</span>
                  <span className="font-medium">{vehicle.registrationNumber || '-'}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-500">Couleur du véhicule</span>
                  <span className="font-medium">-</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-500">Type du véhicule</span>
                  <span className="font-medium">{vehicle.type?.name || '-'}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-500">Année &amp; kilométrage</span>
                  <span className="font-medium">-</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-500">Nb de places</span>
                  <span className="font-medium">{vehicle.place}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-500">Langues parlées</span>
                  <span className="font-medium">Français, Anglais</span>
                </div>
              </>
            )}
          </div>
        );
      case 'photos':
        return (
          <div className="grid grid-cols-5 gap-2 py-4">
            {user.UserImage?.map((image) => (
              <div key={image.id} className="aspect-square relative rounded overflow-hidden">
                {image.file.url && (
                  <Image
                    src={image.file.url}
                    alt="Photo"
                    fill
                    className="object-cover"
                  />
                )}
              </div>
            ))}
            {(!user.UserImage || user.UserImage.length === 0) && (
              <p className="text-gray-500 col-span-5 text-center py-8">Aucune photo disponible</p>
            )}
          </div>
        );
      case 'reviews':
        return (
          <div className="space-y-4 py-4">
            {user.review?.map((review) => (
              <div key={review.id} className="border-b pb-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-yellow-500">★</span>
                  <span>{review.rating}</span>
                </div>
                <p className="text-gray-700">{review.content}</p>
              </div>
            ))}
            {(!user.review || user.review.length === 0) && (
              <p className="text-gray-500 text-center py-8">Aucun avis disponible</p>
            )}
          </div>
        );
      case 'courses':
        return (
          <div className="py-4">
            <p className="text-gray-500 text-center py-8">Historique des courses à venir</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-md text-gray-600 hover:text-gray-800"
          aria-label="Fermer"
        >
          ×
        </button>

        {/* Cover image */}
        <div className="relative w-full h-48 bg-gray-200">
          {coverImage && (
            <Image
              src={coverImage}
              alt="Cover"
              fill
              className="object-cover"
            />
          )}
        </div>

        {/* Profile section */}
        <div className="flex flex-col items-center -mt-16 relative z-10 px-6">
          {/* Profile image with status indicator */}
          <div className="relative">
            <div className="w-32 h-32 rounded-full border-4 border-white bg-gray-200 overflow-hidden">
              {profileImage ? (
                <Image
                  src={profileImage}
                  alt="Profile"
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <svg
                    className="w-16 h-16"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                </div>
              )}
            </div>
            {/* Online status indicator */}
            <div className="absolute bottom-2 right-2 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
          </div>

          {/* Name */}
          <h2 className="text-xl font-bold mt-2">
            {user.firstName} {user.lastName}
          </h2>

          {/* Info row */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-3 text-sm text-gray-600">
            {/* Rating */}
            <div className="flex items-center gap-1">
              <span className="text-yellow-500">★</span>
              <span>{rating}</span>
            </div>

            {/* Vehicle info (drivers only) */}
            {isDriver && vehicle && (
              <>
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4 text-red-400" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" />
                  </svg>
                  <span>{vehicle.brand} {vehicle.model}</span>
                </div>
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                  <span>Nb de places: {vehicle.place}</span>
                </div>
              </>
            )}

            {/* Phone */}
            {user.phone && (
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4 text-green-500" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                </svg>
                <span>{user.phone}</span>
              </div>
            )}

            {/* Chat button */}
            <button
              onClick={onContact}
              disabled={isLoadingContact}
              className="flex items-center gap-1 text-pink-500 hover:text-pink-600"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z" />
              </svg>
              <span>{isLoadingContact ? 'Ouverture...' : 'Discuter'}</span>
            </button>
          </div>

          {/* Bio */}
          <p className="text-gray-500 text-center mt-3 italic text-sm max-w-md">
            « Passionné de la route depuis 10 ans, votre confort et votre sécurité sont ma priorité. »
          </p>
        </div>

        {/* Tabs */}
        <div className="px-6 mt-4 border-b">
          <div className="flex gap-6">
            {visibleTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-2 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'text-pink-500 border-b-2 border-pink-500'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab content */}
        <div className="flex-1 overflow-y-auto px-6 pb-6">{renderTabContent()}</div>
      </div>
    </div>
  );
}
