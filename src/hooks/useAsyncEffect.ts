import { useEffect, useRef } from 'react';

function useAsyncEffect<T>(
  effect: (isMounted: () => boolean) => T | Promise<T>,
  destroy?: (result?: T) => void,
  inputs?: any[],
) {
  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(
    function () {
      var result: T;
      var maybePromise = effect(function () {
        return isMounted.current;
      });

      Promise.resolve(maybePromise).then(function (value) {
        result = value;
      });

      return function () {
        if (destroy) {
          destroy(result);
        }
      };
    },
    [destroy ? inputs : destroy],
  );
}

export default useAsyncEffect;
