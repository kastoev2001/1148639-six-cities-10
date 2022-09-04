import { cityData, changeCity } from './city-data';

describe('Reducer: cityData.', () => {
  it('without additional parameters should return inital state.', () => {
    expect(cityData.reducer(undefined, { type: 'UNKNOWN_ACTION' }))
      .toEqual({ activeCity: 'Paris' });
  });

  it('Should upadate activeCity when changed city.', () => {
    const state = { activeCity: 'Paris' };
    expect(cityData.reducer(state, changeCity('Amsterdam')))
      .toEqual({ activeCity: 'Amsterdam' });
  });
});
