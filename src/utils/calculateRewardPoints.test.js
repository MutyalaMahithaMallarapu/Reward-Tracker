import { calculateRewardPoints } from './calculateRewardPoints'

describe('calculateRewardPoints', () => {
    test('should return 0 points for amount 50 or less', () => {
      expect(calculateRewardPoints(50)).toBe(0);
      expect(calculateRewardPoints(30)).toBe(0);
      expect(calculateRewardPoints(0)).toBe(0);
    });
  
    test('should return correct points for amount between 51 and 100', () => {
      expect(calculateRewardPoints(51)).toBe(1);
      expect(calculateRewardPoints(75)).toBe(25);
      expect(calculateRewardPoints(100)).toBe(50);
    });
  
    test('should return correct points for amount over 100', () => {
      expect(calculateRewardPoints(101)).toBe(52); // 50 + (1 * 2)
      expect(calculateRewardPoints(120)).toBe(90); // 50 + (20 * 2)
      expect(calculateRewardPoints(150)).toBe(150); // 50 + (50 * 2)
    });
  
    test('should handle decimal amounts correctly', () => {
      expect(calculateRewardPoints(120.75)).toBe(91); // 50 + (20.75 * 2) = 91.5 => floored to 91
      expect(calculateRewardPoints(99.99)).toBe(49); // 49.99 - 50 => 49.99 => floored to 49
    });
  
    test('should return 0 for negative or invalid amounts', () => {
      expect(calculateRewardPoints(-10)).toBe(0);
      expect(calculateRewardPoints(NaN)).toBe(0);
    });
  });