// Ride-related types
export type RideStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';

export interface RideUser {
  id: string;
  firstName: string;
  lastName?: string | null;
  email?: string | null;
  phone?: string | null;
  avatarUrl?: string | null;
  rating?: number | null;
}

export interface RideVehicle {
  brand: string;
  model: string;
  seats: number;
  type?: string | null;
}

export interface Ride {
  id: string;
  status: RideStatus;
  departureAddress: string;
  departureLat: number;
  departureLng: number;
  arrivalAddress: string;
  arrivalLat: number;
  arrivalLng: number;
  scheduledDeparture: Date | string;
  price: number;
  currency: string;
  vehicleType?: string | null;
  requiredSeats: number;
  acceptsAnimals: boolean;
  acceptsBaggage: boolean;
  baggageDetails?: string | null;
  otherPreferences?: string | null;
  preferredLanguages?: string[] | null;
  minDriverRating?: number | null;
  driver?: RideUser | null;
  passengers: RideUser[];
  vehicle?: RideVehicle | null;
  finishedAt?: Date | string | null;
  createdAt: Date | string;
}

export const STATUS_LABELS: Record<RideStatus, string> = {
  PENDING: 'En attente',
  IN_PROGRESS: 'En cours',
  COMPLETED: 'Terminée',
  CANCELLED: 'Annulée',
};

export const STATUS_COLORS: Record<RideStatus, string> = {
  PENDING: 'bg-yellow-500',
  IN_PROGRESS: 'bg-green-500',
  COMPLETED: 'bg-red-500',
  CANCELLED: 'bg-gray-500',
};
