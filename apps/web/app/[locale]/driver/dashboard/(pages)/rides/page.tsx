'use client';

import React, { useState, useEffect } from 'react';
import { RideContainer, Ride, CreateRideFormData } from '@/components/ride';

// Mock data for development - This will be replaced with GraphQL query
const mockRides: Ride[] = [
  {
    id: '1',
    status: 'IN_PROGRESS',
    departureAddress: 'Anosy',
    departureLat: -18.9127,
    departureLng: 47.5209,
    arrivalAddress: 'Ambatoroaka',
    arrivalLat: -18.8866,
    arrivalLng: 47.5189,
    scheduledDeparture: new Date('2025-07-12T08:40:00'),
    price: 10000,
    currency: 'MGA',
    vehicleType: 'Voiture',
    requiredSeats: 2,
    acceptsAnimals: false,
    acceptsBaggage: true,
    baggageDetails: 'valise, vélo',
    preferredLanguages: ['Malagasy', 'Française'],
    minDriverRating: 3,
    otherPreferences: 'Chauffeurs dynamique et cool et qui conduit prudemment',
    driver: null,
    passengers: [
      {
        id: 'u1',
        firstName: 'John',
        lastName: '',
        phone: '(+261) 34 00 000 00',
        avatarUrl: null,
        rating: 4.2,
      },
    ],
    vehicle: {
      brand: 'Peugeot',
      model: '205',
      seats: 4,
      type: 'Voiture',
    },
    createdAt: new Date(),
  },
  {
    id: '2',
    status: 'PENDING',
    departureAddress: 'Ankatso',
    departureLat: -18.9056,
    departureLng: 47.5006,
    arrivalAddress: 'Antsakaviro',
    arrivalLat: -18.8978,
    arrivalLng: 47.5189,
    scheduledDeparture: new Date('2025-07-12T14:00:00'),
    price: 15000,
    currency: 'MGA',
    vehicleType: 'Voiture',
    requiredSeats: 2,
    acceptsAnimals: true,
    acceptsBaggage: true,
    preferredLanguages: ['Malagasy', 'Française'],
    driver: null,
    passengers: [
      {
        id: 'u2',
        firstName: 'Doe',
        lastName: '',
        avatarUrl: null,
      },
    ],
    vehicle: null,
    createdAt: new Date(),
  },
  {
    id: '3',
    status: 'COMPLETED',
    departureAddress: 'Anosy',
    departureLat: -18.9127,
    departureLng: 47.5209,
    arrivalAddress: 'Ankorondrano',
    arrivalLat: -18.8756,
    arrivalLng: 47.5256,
    scheduledDeparture: new Date('2025-07-12T12:00:00'),
    finishedAt: new Date('2025-07-11T15:00:00'),
    price: 20000,
    currency: 'MGA',
    vehicleType: 'Voiture',
    requiredSeats: 2,
    acceptsAnimals: true,
    acceptsBaggage: true,
    baggageDetails: 'valise, vélo',
    preferredLanguages: ['Malagasy', 'Française'],
    minDriverRating: 3,
    otherPreferences: 'Chauffeurs dynamique et cool et qui conduit prudemment',
    driver: null,
    passengers: [
      {
        id: 'u1',
        firstName: 'Maria',
        lastName: 'Maria',
        phone: '(+261) 34 30 303 03',
        avatarUrl: null,
        rating: 4.2,
      },
    ],
    vehicle: {
      brand: 'Peugeot',
      model: '205',
      seats: 4,
      type: 'Voiture',
    },
    createdAt: new Date(),
  },
  {
    id: '4',
    status: 'PENDING',
    departureAddress: 'Behoririka',
    departureLat: -18.8945,
    departureLng: 47.5245,
    arrivalAddress: 'Ankazomanga',
    arrivalLat: -18.8823,
    arrivalLng: 47.5134,
    scheduledDeparture: new Date('2025-07-12T15:00:00'),
    price: 8000,
    currency: 'MGA',
    vehicleType: 'Voiture',
    requiredSeats: 1,
    acceptsAnimals: false,
    acceptsBaggage: true,
    driver: null,
    passengers: [],
    vehicle: null,
    createdAt: new Date(),
  },
  {
    id: '5',
    status: 'CANCELLED',
    departureAddress: 'Ambodrona',
    departureLat: -18.9034,
    departureLng: 47.5167,
    arrivalAddress: 'Anosy',
    arrivalLat: -18.9127,
    arrivalLng: 47.5209,
    scheduledDeparture: new Date('2025-07-12T08:00:00'),
    price: 2000,
    currency: 'MGA',
    vehicleType: 'Voiture',
    requiredSeats: 1,
    acceptsAnimals: false,
    acceptsBaggage: false,
    driver: null,
    passengers: [],
    vehicle: null,
    createdAt: new Date(),
  },
];

export default function DriverRidesPage() {
  const [rides, setRides] = useState<Ride[]>([]);
  const [loading, setLoading] = useState(true);
  const [createLoading, setCreateLoading] = useState(false);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setRides(mockRides);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleArchive = (ride: Ride) => {
    console.log('Archive ride:', ride.id);
    // TODO: Implement archive functionality
  };

  const handleDelete = (ride: Ride) => {
    console.log('Delete ride:', ride.id);
    // TODO: Implement delete functionality
  };

  const handleMessage = (ride: Ride) => {
    console.log('Message ride:', ride.id);
    // TODO: Navigate to messages
  };

  const handleCreateRide = async (data: CreateRideFormData) => {
    setCreateLoading(true);
    try {
      // TODO: Replace with actual GraphQL mutation
      // For now, simulate API call and add to local state
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const newRide: Ride = {
        id: `temp-${Date.now()}`,
        status: 'PENDING',
        departureAddress: data.departureAddress,
        departureLat: data.departureLat,
        departureLng: data.departureLng,
        arrivalAddress: data.arrivalAddress,
        arrivalLat: data.arrivalLat,
        arrivalLng: data.arrivalLng,
        scheduledDeparture: new Date(data.scheduledDeparture),
        price: data.price,
        currency: data.currency,
        requiredSeats: data.requiredSeats,
        acceptsAnimals: data.acceptsAnimals,
        acceptsBaggage: data.acceptsBaggage,
        baggageDetails: data.baggageDetails,
        otherPreferences: data.otherPreferences,
        driver: null,
        passengers: [],
        vehicle: null,
        createdAt: new Date(),
      };

      setRides((prev) => [newRide, ...prev]);
      console.log('Created ride:', newRide);
    } catch (error) {
      console.error('Error creating ride:', error);
      throw error;
    } finally {
      setCreateLoading(false);
    }
  };

  return (
    <div className="h-full">
      <RideContainer
        rides={rides}
        variant="driver"
        loading={loading}
        hasMore={false}
        onArchive={handleArchive}
        onDelete={handleDelete}
        onMessage={handleMessage}
        onCreateRide={handleCreateRide}
        createRideLoading={createLoading}
      />
    </div>
  );
}
