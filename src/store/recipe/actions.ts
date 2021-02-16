import { RecipeType } from '@interface/index';
import { ActionCreator } from '@store/thunk';
import api from '@utils/api';

const dismissRecipeAction = (
  key: string,
  liked?: boolean,
  dismissed?: number,
) => {
  return {
    type: `DISMISS_RECIPE${
      liked !== undefined ? (liked ? '_LIKED' : '_NOPED') : ''
    }`,
    payload: dismissed ? [key, dismissed] : key,
  };
};

const fetchRecipeAction = (
  result: RecipeType[] | string | null,
  error?: boolean,
) => {
  return {
    type: `FETCH_RECIPE_${
      error !== undefined ? (error ? 'ERROR' : 'OK') : 'PENDING'
    }`,
    payload: result,
  };
};

export const dismissRecipe = (
  key: string,
  liked?: boolean,
  dismissed?: number,
): ActionCreator => {
  return (dispatch) => {
    dispatch(dismissRecipeAction(key, liked, dismissed));
  };
};

export const fetchRecipe = (page: number): ActionCreator => {
  return async (dispatch) => {
    dispatch(fetchRecipeAction(null));
    try {
      const { lists } = await api.fetchRecipe(page);
      if (lists === undefined) throw new Error(`lists is ${lists}`);
      dispatch(fetchRecipeAction(lists as RecipeType[], false));
    } catch (err) {
      console.log(err);
      dispatch(fetchRecipeAction(err, true));
    }
  };
};
