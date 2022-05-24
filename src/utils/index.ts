import { useEffect, useRef, useState } from "react";

export const isFalsy = (value: unknown) => (value === 0 ? false : !value);

export const isVoid = (value: unknown) =>
  value === undefined || value === null || value === "";

/**
 * object: can be used in these 3 ways
 *
 * let a: object
 * a = {name: "jack"}
 * a = () => {}
 * a = new RegExp("")
 *
 * -> { [key: string]: unknown }
 *
 */
export const cleanObject = (object: { [key: string]: unknown }) => {
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (isVoid(value)) {
      delete result[key];
    }
  });
  return result;
};

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export const useDebounce = <V>(value: V, delay?: number): V => {
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

export const useArray = <T>(initialArray: T[]) => {
  const [value, setValue] = useState(initialArray);
  return {
    value,
    setValue,
    add: (item: T) => setValue([...value, item]),
    clear: () => setValue([]),
    removeIndex: (index: number) => {
      const copy = [...value];
      copy.splice(index, 1);
      setValue(copy);
    },
  };
};

// version 1
// export const useDocumentTitle = (
//   title: string,
//   keepOnUnmount: boolean = true
// ) => {
//   // closure: the old title is not changed
//   const oldTitle = document.title;
//   useEffect(() => {
//     document.title = title;
//   }, [title]);

//   useEffect(() => {
//     return () => {
//       if (!keepOnUnmount) {
//         document.title = oldTitle;
//       }
//     };
//   }, []); // <- js closure, no deps
// };

// version 2
export const useDocumentTitle = (
  title: string,
  keepOnUnmount: boolean = true
) => {
  // useRef: ref current value is not changed during life circle
  const oldTitle = useRef(document.title).current;
  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    return () => {
      if (!keepOnUnmount) {
        document.title = oldTitle;
      }
    };
  }, [oldTitle, keepOnUnmount]);
};

export const resetRoute = () => (window.location.href = window.location.origin);
