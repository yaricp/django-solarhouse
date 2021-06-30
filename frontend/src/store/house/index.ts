import { mutations } from './mutations';
import { getters } from './getters';
import { actions } from './actions';
import { HouseState } from './state';

const defaultState: HouseState = {
  houses: [],
};

export const houseModule = {
  state: defaultState,
  mutations,
  actions,
  getters,
};
