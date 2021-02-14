import { FoodType } from '@interface/index';
import { ActionCreator } from '@store/thunk';
import api from '@utils/api';

const dismissFoodAction = (
  key: string,
  liked?: boolean,
  dismissed?: number,
) => {
  return {
    type: `DISMISS_FOOD${
      liked !== undefined ? (liked ? '_LIKED' : '_NOPED') : ''
    }`,
    payload: dismissed ? [key, dismissed] : key,
  };
};

const fetchFoodAction = (
  result: FoodType[] | string | null,
  error?: boolean,
) => {
  return {
    type: `FETCH_FOOD_${
      error !== undefined ? (error ? 'ERROR' : 'OK') : 'PENDING'
    }`,
    payload: result,
  };
};

export const dismissFood = (
  key: string,
  liked?: boolean,
  dismissed?: number,
): ActionCreator => {
  return (dispatch) => {
    dispatch(dismissFoodAction(key, liked, dismissed));
  };
};

export const fetchFood = (page: number): ActionCreator => {
  return async (dispatch) => {
    dispatch(fetchFoodAction(null));
    try {
      const { results } = await api.fetchFood(page);
      dispatch(fetchFoodAction(results, false));
    } catch (err) {
      dispatch(fetchFoodAction(err, true));
    }
  };
};
