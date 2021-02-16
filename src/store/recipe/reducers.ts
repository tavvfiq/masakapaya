import { RecipeType } from '@interface/index';
import { filterArray } from '@utils/math';
import { RecipeActionType } from './types';

export type foodState = {
  recipeTinder: RecipeType[];
  liked: RecipeType[];
  noped: RecipeType[];
  loading: boolean;
  error: boolean;
};

const initialState: foodState = {
  recipeTinder: [],
  liked: [],
  noped: [],
  loading: false,
  error: false,
};

export default function foodReducer(
  state = initialState,
  { type, payload }: RecipeActionType,
) {
  const { recipeTinder, liked, noped } = state;
  const _recipeTinder = [...recipeTinder];
  const lastElementId = recipeTinder.length - 1;
  switch (type) {
    case 'DISMISS_RECIPE':
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [_, dismissed] = payload as [string, number];
      _recipeTinder[lastElementId].dismissed = dismissed;
      return {
        ...state,
        recipeTinder: _recipeTinder,
      };
    case 'DISMISS_RECIPE_LIKED':
      const _liked = [...liked];
      _liked.push(recipeTinder[lastElementId]);
      _recipeTinder.pop();
      return {
        ...state,
        recipeTinder: _recipeTinder,
        liked: _liked,
      };
    case 'DISMISS_RECIPE_NOPED':
      const _noped = [...noped];
      _noped.push(recipeTinder[lastElementId]);
      _recipeTinder.pop();
      return {
        ...state,
        recipeTinder: _recipeTinder,
        noped: _noped,
      };
    case 'FETCH_RECIPE_PENDING':
      return {
        ...state,
        loading: true,
        error: false,
      };
    case 'FETCH_RECIPE_OK':
      const _tmp: RecipeType[] = (payload as RecipeType[])
        .map((recipe) => {
          return {
            ...recipe,
            dismissed: 0,
          };
        })
        .filter((recipe) => {
          return !liked.includes(recipe);
        })
        .filter((recipe) => {
          return !noped.includes(recipe);
        });
      _recipeTinder.unshift(..._tmp);
      return {
        ...state,
        loading: false,
        error: false,
        recipeTinder: _recipeTinder,
      };
    case 'FETCH_RECIPE_ERROR':
      return {
        ...state,
        error: true,
        loading: false,
      };
    case 'CLEAR_SAVED_RECIPE_LIKED':
      return {
        ...state,
        liked: filterArray(state.liked, (item) => {
          return item.url !== (payload as string);
        }),
      };
    case 'CLEAR_SAVED_RECIPE_NOPED':
      return {
        ...state,
        noped: filterArray(state.noped, (item) => {
          return item.url !== (payload as string);
        }),
      };

    default:
      return state;
  }
}
