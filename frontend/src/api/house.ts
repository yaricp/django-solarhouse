import axios from 'axios';
import { apiUrl } from '@/env';
import { IHouseProfile, IHouseProfileUpdate, IHouseProfileCreate } from '@/interfaces/house';

function authHeaders(token: string) {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
}

export const api = {
  async logInGetToken(username: string, password: string) {
    const params = new URLSearchParams();
    params.append('username', username);
    params.append('password', password);

    return axios.post(`${apiUrl}/api/v1/login/access-token`, params);
  },
  async getHouses(token: string) {
    return axios.get<IHouseProfile[]>(`${apiUrl}/api/v1/houses/`, authHeaders(token));
  },
  async updateHouse(token: string, userId: number, data: IHouseProfileUpdate) {
    return axios.put(`${apiUrl}/api/v1/houses/${userId}`, data, authHeaders(token));
  },
  async createHouse(token: string, data: IHouseProfileCreate) {
    return axios.post(`${apiUrl}/api/v1/houses/`, data, authHeaders(token));
  },

};
