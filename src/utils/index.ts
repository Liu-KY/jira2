import { useEffect, useRef, useState } from "react";

export const isFalsy = (value: unknown) => (value === 0 ? false : !value),
  cleanObject = (object: object) => {
    const result = { ...object };
    Object.keys(result).forEach((key) => {
      // @ts-ignore
      const value = result[key];
      if (isFalsy(value)) {
        // @ts-ignore
        delete result[key];
      }
    });

    return result;
  },
  useMount = (callback: () => void) => {
    useEffect(() => {
      callback();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
  },
  useDebounce = <T>(value: T, time?: number) => {
    const [debounceValue, setDebounceValue] = useState(value);

    useEffect(() => {
      const timeout = setTimeout(() => setDebounceValue(value), time);
      return () => clearTimeout(timeout);
    }, [value, time]);

    return debounceValue;
  },
  useDocumentTitle = (newTitle: string, keepOnUnmount = true) => {
    const defaultTitle = useRef(document.title).current;
    useEffect(() => {
      document.title = newTitle;
    }, [newTitle]);

    useEffect(() => {
      return () => {
        if (!keepOnUnmount) document.title = defaultTitle;
      };
    }, [defaultTitle, keepOnUnmount]);
  },
  /**
   * 传入一个对象，和键集合，返回对应的对象中的键值对
   * @param obj
   * @param keys
   */
  subset = <O extends { [key in string]: unknown }, K extends keyof O>(
    obj: O,
    keys: K[]
  ) => {
    const filteredEntries = Object.entries(obj).filter(([key]) =>
      keys.includes(key as K)
    );
    return Object.fromEntries(filteredEntries) as Pick<O, K>;
  },
  useMountedRef = () => {
    const mountedRef = useRef(false);

    useEffect(() => {
      mountedRef.current = true;
      return () => {
        mountedRef.current = false;
      };
    });
    return mountedRef;
  };
