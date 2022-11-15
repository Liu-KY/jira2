import { useEffect, useRef, useState } from "react";

export const isFalsy = (value: unknown) => (value === 0 ? false : !value);

export const cleanObject = (object: object) => {
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
};

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
  }, []);
};

export const useDebounce = <T>(value: T, time?: number) => {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => setDebounceValue(value), time);
    return () => clearTimeout(timeout);
  }, [value, time]);

  return debounceValue;
};

export const useDocumentTitle = (newTitle: string, keepOnUnmount = true) => {
  const defaultTitle = useRef(document.title).current;
  useEffect(() => {
    document.title = newTitle;
  }, [newTitle]);

  useEffect(() => {
    return () => {
      if (!keepOnUnmount) document.title = defaultTitle;
    };
  }, []);
};
