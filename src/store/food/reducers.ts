import { FoodType } from '@interface/index';
import { foodActionType } from './types';

export type foodState = {
  foodTinder: FoodType[];
  liked: FoodType[];
  noped: FoodType[];
  loading: boolean;
  error: boolean;
};

const initialState: foodState = {
  foodTinder: [],
  liked: [],
  noped: [],
  loading: false,
  error: false,
};

export default function foodReducer(
  state = initialState,
  { type, payload }: foodActionType,
) {
  const { foodTinder, liked, noped } = state;
  const _foodTinder = [...foodTinder];
  const lastElementId = foodTinder.length - 1;
  switch (type) {
    case 'DISMISS_FOOD':
      const [_, dismissed] = payload as [string, number];
      _foodTinder[lastElementId].dismissed = dismissed;
      return {
        ...state,
        foodTinder: _foodTinder,
      };
    case 'DISMISS_FOOD_LIKED':
      const _liked = [...liked];
      _liked.push(foodTinder[lastElementId]);
      _foodTinder.pop();
      return {
        ...state,
        foodTinder: _foodTinder,
        liked: _liked,
      };
    case 'DISMISS_FOOD_NOPED':
      const _noped = [...noped];
      _noped.push(foodTinder[lastElementId]);
      _foodTinder.pop();
      return {
        ...state,
        foodTinder: _foodTinder,
        noped: _noped,
      };
    case 'FETCH_FOOD_PENDING':
      return {
        ...state,
        loading: true,
        error: false,
      };
    case 'FETCH_FOOD_OK':
      const _tmp: FoodType[] = (payload as FoodType[])
        .map((food) => {
          return {
            ...food,
            dismissed: 0,
          };
        })
        .filter((food) => {
          return !liked.includes(food);
        })
        .filter((food) => {
          return !noped.includes(food);
        });
      _foodTinder.unshift(..._tmp);
      return {
        ...state,
        loading: false,
        error: false,
        foodTinder: _foodTinder,
      };
    case 'FETCH_FOOD_ERROR':
      return {
        ...state,
        error: true,
        loading: false,
      };
    default:
      return state;
  }
}
