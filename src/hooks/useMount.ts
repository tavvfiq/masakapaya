import { useEffect, useRef } from 'react';

function useMount() {
  const isMounted = useRef(true);
  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);
  return isMounted.current;
}

export default useMount;
