import { useRef, useState } from 'react';
import { RecipeDetailType } from '@interface/index';
import api from '@utils/api';
import useAsyncEffect from './useAsyncEffect';

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
  const reqMounted = useRef(true);

  const fetchDetail = async (isMounted?: boolean) => {
    setState({ ...state, loading: true, error: false });
    try {
      const { lists } = await api.fetchRecipeDetail(key);
      isMounted &&
        setState({
          error: lists ? false : true,
          recipeDetail: lists as RecipeDetailType,
          loading: false,
        });
    } catch (err) {
      console.log(err);
      isMounted && setState({ ...state, loading: false, error: true });
    }
  };

  const reload = () => {
    fetchDetail(reqMounted.current);
  };

  useAsyncEffect(
    async (isMounted) => {
      reqMounted.current = isMounted();
      await fetchDetail(reqMounted.current);
    },
    undefined,
    [],
  );
  return [state.loading, state.error, state.recipeDetail, reload];
}

export default useRecipeDetail;
