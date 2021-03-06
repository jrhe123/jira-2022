import { useMemo } from "react";
import { URLSearchParamsInit, useSearchParams } from "react-router-dom";
import { cleanObject } from "utils";

export const useSetUrlSearchParam = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  return (params: { [key in string]: unknown }) => {
    const o = cleanObject({
      ...Object.fromEntries(searchParams),
      ...params,
    }) as URLSearchParamsInit;
    return setSearchParams(o);
  };
};

export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  const [searchParams] = useSearchParams();
  const setSearchParams = useSetUrlSearchParam();
  return [
    useMemo(
      // <- prevent param object keep changing addr
      () =>
        keys.reduce((prev, key) => {
          return { ...prev, [key]: searchParams.get(key) || "" };
        }, {} as { [key in K]: string }),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [searchParams]
    ),
    (params: Partial<{ [key in K]: unknown }>) => {
      return setSearchParams(params);
    },
  ] as const;
};
/**
 * dependency:
 * 1. primitive
 * 2. state variable
 *
 * 3. object (x) -> will cause infinite loop render issue
 */

/**
 * iterator:
 * []
 * {}
 * Map
 * -> can use for...of
 * -> check: myVar[Symbol.iterator]
 *
 * https://codesandbox.io/s/upbeat-wood-bum3j?file=/src/index.js
 */
