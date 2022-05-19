import { useEffect, useState } from "react";

export const isFalsy = (value) => (value === 0 ? false : !value);

export const cleanObject = (object) => {
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (isFalsy(value)) {
      delete result[key];
    }
  });
  return result;
};

export const useMount = (callback) => {
  useEffect(() => {
    callback();
  }, []);
};

export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // when value / delay changes, exec
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    // after every useEffect call exec
    return () => clearTimeout(timeout);
  }, [value, delay]);

  // return the final one, which is no one clear it
  return debouncedValue;
};
