import { HouseState } from './state';
import { getStoreAccessors } from 'typesafe-vuex';
import { State } from '../state';

export const getters = {
    adminHouses: (state: HouseState) => state.houses,
    adminOneHouse: (state: HouseState) => (houseId: number) => {
        const filteredHouses = state.houses.filter((house) => house.id === houseId);
        if (filteredHouses.length > 0) {
            return { ...filteredHouses[0] };
        }
    },
};

const { read } = getStoreAccessors<HouseState, State>('');

export const readAdminOneHouse = read(getters.adminOneHouse);
export const readAdminHouses = read(getters.adminHouses);
