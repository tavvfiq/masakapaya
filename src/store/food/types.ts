import { FoodType } from '@interface/index';

export type DismissFoodType = {
  type: string;
  payload: string | [string, number];
};

export type FetchFoodType = {
  type: string;
  payload: FoodType[] | string | null;
};

export type foodActionType = DismissFoodType | FetchFoodType;
