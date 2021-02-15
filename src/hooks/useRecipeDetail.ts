import { useState } from 'react';
import { RecipeDetailType } from '@interface/index';
import api from '@utils/api';
import useAsyncEffect from './useAsyncEffect';
import useMount from './useMount';

type State = {
  loading: boolean;
  error: boolean;
  recipeDetail: RecipeDetailType | null;
};

const initState = {
  loading: false,
  error: false,
  recipeDetail: null,
};

function useRecipeDetail(
  key: string,
): [boolean, boolean, RecipeDetailType | null, () => void] {
  const [state, setState] = useState<State>(initState);
  const isMounted = useMount();

  const fetchDetail = async () => {
    setState({ ...state, loading: true, error: false });
    try {
      const { results } = await api.fetchRecipeDetail(key);
      isMounted &&
        setState({
          error: results ? false : true,
          recipeDetail: results as RecipeDetailType,
          loading: false,
        });
    } catch (err) {
      console.log(err);
      isMounted && setState({ ...state, loading: false, error: true });
    }
  };

  const reload = () => {
    fetchDetail();
  };

  useAsyncEffect(
    async () => {
      await fetchDetail();
    },
    undefined,
    [],
  );
  return [state.loading, state.error, state.recipeDetail, reload];
}

export default useRecipeDetail;
