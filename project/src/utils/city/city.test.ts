import { findCity } from './city';

describe('Business Logic: Return transferred city', () => {
  it('Return city of list.', () => {
    const city = 'Paris';
    expect(findCity(city)).toBe(city);
  });
});
