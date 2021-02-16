import { RecipeType } from '@interface/index';

export type DismissRecipeType = {
  type: string;
  payload: string | [string, number];
};

export type FetchRecipeType = {
  type: string;
  payload: RecipeType[] | string | null;
};

export type RecipeActionType = DismissRecipeType | FetchRecipeType;
