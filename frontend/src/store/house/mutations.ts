import { IHouseProfile } from '@/interfaces/house';
import { HouseState } from './state';
import { getStoreAccessors } from 'typesafe-vuex';
import { State } from '../state';

export const mutations = {
    setHouses(state: HouseState, payload: IHouseProfile[]) {
        state.houses = payload;
    },
    setHouse(state: HouseState, payload: IHouseProfile) {
        const houses = state.houses.filter(
            (house: IHouseProfile) => house.id !== payload.id,
        );
        houses.push(payload);
        state.houses = houses;
    },
};

const { commit } = getStoreAccessors<HouseState, State>('');

export const commitSetHouse = commit(mutations.setHouse);
export const commitSetHouses = commit(mutations.setHouses);
