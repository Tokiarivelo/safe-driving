// src/drivers/drivers.utils.spec.ts
import {
  toRad,
  toDeg,
  randomPointAround,
  generateRandomDriversAround,
} from './drivers.utils';

describe('DriversUtils', () => {
  describe('toRad', () => {
    it('should convert degrees to radians correctly', () => {
      expect(toRad(0)).toBe(0);
      expect(toRad(180)).toBeCloseTo(Math.PI);
      expect(toRad(90)).toBeCloseTo(Math.PI / 2);
      expect(toRad(360)).toBeCloseTo(2 * Math.PI);
    });
  });

  describe('toDeg', () => {
    it('should convert radians to degrees correctly', () => {
      expect(toDeg(0)).toBe(0);
      expect(toDeg(Math.PI)).toBeCloseTo(180);
      expect(toDeg(Math.PI / 2)).toBeCloseTo(90);
      expect(toDeg(2 * Math.PI)).toBeCloseTo(360);
    });
  });

  describe('randomPointAround', () => {
    const centerLat = 48.8566; // Paris latitude
    const centerLng = 2.3522; // Paris longitude
    const radiusMeters = 1000; // 1km

    it('should generate a point within the specified radius', () => {
      const point = randomPointAround(centerLat, centerLng, radiusMeters);

      expect(point).toHaveProperty('lat');
      expect(point).toHaveProperty('lng');
      expect(typeof point.lat).toBe('number');
      expect(typeof point.lng).toBe('number');

      // Calculate distance using Haversine formula
      const R = 6371000; // Earth radius in meters
      const dLat = toRad(point.lat - centerLat);
      const dLng = toRad(point.lng - centerLng);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(centerLat)) *
          Math.cos(toRad(point.lat)) *
          Math.sin(dLng / 2) *
          Math.sin(dLng / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = R * c;

      // Point should be within the radius (with small tolerance for floating point)
      expect(distance).toBeLessThanOrEqual(radiusMeters + 1);
    });

    it('should generate different points on multiple calls', () => {
      const point1 = randomPointAround(centerLat, centerLng, radiusMeters);
      const point2 = randomPointAround(centerLat, centerLng, radiusMeters);

      // While theoretically they could be the same, it's highly unlikely
      expect(point1.lat !== point2.lat || point1.lng !== point2.lng).toBe(true);
    });

    it('should handle radius of 0', () => {
      const point = randomPointAround(centerLat, centerLng, 0);
      expect(point.lat).toBeCloseTo(centerLat, 5);
      expect(point.lng).toBeCloseTo(centerLng, 5);
    });
  });

  describe('generateRandomDriversAround', () => {
    const centerLat = 48.8566;
    const centerLng = 2.3522;
    const radiusMeters = 1500;

    it('should generate the correct number of drivers', () => {
      const count = 10;
      const drivers = generateRandomDriversAround(centerLat, centerLng, radiusMeters, count);

      expect(drivers).toHaveLength(count);
    });

    it('should generate drivers with all required fields', () => {
      const drivers = generateRandomDriversAround(centerLat, centerLng, radiusMeters, 5);

      drivers.forEach((driver) => {
        expect(driver).toHaveProperty('id');
        expect(driver).toHaveProperty('name');
        expect(driver).toHaveProperty('vehicle');
        expect(driver).toHaveProperty('lat');
        expect(driver).toHaveProperty('lng');
        expect(driver).toHaveProperty('status');

        expect(typeof driver.id).toBe('string');
        expect(typeof driver.name).toBe('string');
        expect(typeof driver.vehicle).toBe('string');
        expect(typeof driver.lat).toBe('number');
        expect(typeof driver.lng).toBe('number');
        expect(typeof driver.status).toBe('string');
      });
    });

    it('should generate drivers with valid statuses', () => {
      const drivers = generateRandomDriversAround(centerLat, centerLng, radiusMeters, 5);
      const validStatuses = ['AVAILABLE', 'BUSY', 'OFFLINE'];

      drivers.forEach((driver) => {
        expect(validStatuses).toContain(driver.status);
      });
    });

    it('should generate drivers within the specified radius', () => {
      const drivers = generateRandomDriversAround(centerLat, centerLng, radiusMeters, 10);

      drivers.forEach((driver) => {
        const R = 6371000;
        const dLat = toRad(driver.lat - centerLat);
        const dLng = toRad(driver.lng - centerLng);
        const a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(toRad(centerLat)) *
            Math.cos(toRad(driver.lat)) *
            Math.sin(dLng / 2) *
            Math.sin(dLng / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c;

        expect(distance).toBeLessThanOrEqual(radiusMeters + 1);
      });
    });

    it('should generate unique driver IDs', () => {
      const drivers = generateRandomDriversAround(centerLat, centerLng, radiusMeters, 20);
      const ids = drivers.map((d) => d.id);
      const uniqueIds = new Set(ids);

      expect(uniqueIds.size).toBe(drivers.length);
    });

    it('should handle count of 0', () => {
      const drivers = generateRandomDriversAround(centerLat, centerLng, radiusMeters, 0);
      expect(drivers).toHaveLength(0);
    });
  });
});
