import { checkUndefinedValues, checkUndefinedValuesAndEmptyArrays } from './';

let valueForCheck: unknown;
describe('omit helpers', () => {
  describe('checkUndefinedValues()', () => {
    it('should return false for not empty value', async () => {
      valueForCheck = 'test';
      const isUndefined = checkUndefinedValues(valueForCheck);
      expect(isUndefined).toBe(false);
    });
    it('should return false for null value', async () => {
      valueForCheck = null;
      const isUndefined = checkUndefinedValues(valueForCheck);
      expect(isUndefined).toBe(false);
    });
    it('should return true for undefined value', async () => {
      valueForCheck = undefined;
      const isUndefined = checkUndefinedValues(valueForCheck);
      expect(isUndefined).toBe(true);
    });
  });
  describe('checkUndefinedValuesAndEmptyArrays()', () => {
    it('should return false for not empty array', async () => {
      valueForCheck = ['test'];
      const isUndefined = checkUndefinedValuesAndEmptyArrays(valueForCheck);
      expect(isUndefined).toBe(false);
    });
    it('should return true for empty array', async () => {
      valueForCheck = [];
      const isUndefined = checkUndefinedValuesAndEmptyArrays(valueForCheck);
      expect(isUndefined).toBe(true);
    });
    it('should return false for null value', async () => {
      valueForCheck = null;
      const isUndefined = checkUndefinedValuesAndEmptyArrays(valueForCheck);
      expect(isUndefined).toBe(false);
    });
    it('should return true for undefined value', async () => {
      valueForCheck = undefined;
      const isUndefined = checkUndefinedValuesAndEmptyArrays(valueForCheck);
      expect(isUndefined).toBe(true);
    });
  });
});
