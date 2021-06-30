import { api } from '@/api/house';
import { ActionContext } from 'vuex';
import { IHouseProfileCreate, IHouseProfileUpdate } from '@/interfaces/house';
import { State } from '../state';
import { HouseState } from './state';
import { getStoreAccessors } from 'typesafe-vuex';
import { commitSetHouses, commitSetHouse } from './mutations';
import { dispatchCheckApiError } from '../main/actions';
import { commitAddNotification, commitRemoveNotification } from '../main/mutations';

type MainContext = ActionContext<HouseState, State>;

export const actions = {
    async actionGetHouses(context: MainContext) {
        try {
            const response = await api.getHouses(context.rootState.main.token);
            if (response) {
                commitSetHouses(context, response.data);
            }
        } catch (error) {
            await dispatchCheckApiError(context, error);
        }
    },
    async actionUpdateHouse(context: MainContext, payload: { id: number, user: IHouseProfileUpdate }) {
        try {
            const loadingNotification = { content: 'saving', showProgress: true };
            commitAddNotification(context, loadingNotification);
            const response = (await Promise.all([
                api.updateHouse(context.rootState.main.token, payload.id, payload.user),
                await new Promise((resolve, reject) => setTimeout(() => resolve(), 500)),
            ]))[0];
            commitSetHouse(context, response.data);
            commitRemoveNotification(context, loadingNotification);
            commitAddNotification(context, { content: 'House successfully updated', color: 'success' });
        } catch (error) {
            await dispatchCheckApiError(context, error);
        }
    },
    async actionCreateHouse(context: MainContext, payload: IHouseProfileCreate) {
        try {
            const loadingNotification = { content: 'saving', showProgress: true };
            commitAddNotification(context, loadingNotification);
            const response = (await Promise.all([
                api.createHouse(context.rootState.main.token, payload),
                await new Promise((resolve, reject) => setTimeout(() => resolve(), 500)),
            ]))[0];
            commitSetHouse(context, response.data);
            commitRemoveNotification(context, loadingNotification);
            commitAddNotification(context, {
                content: 'House successfully created',
                color: 'success',
            });
        } catch (error) {
            await dispatchCheckApiError(context, error);
        }
    },
};

const { dispatch } = getStoreAccessors<HouseState, State>('');

export const dispatchCreateHouse = dispatch(actions.actionCreateHouse);
export const dispatchGetHouses = dispatch(actions.actionGetHouses);
export const dispatchUpdateHouse = dispatch(actions.actionUpdateHouse);
