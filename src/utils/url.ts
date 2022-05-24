import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  const [searchParams, setSearchParams] = useSearchParams();

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
    setSearchParams,
  ] as const;
};
/**
 * dependency:
 * 1. primitive
 * 2. state variable
 *
 * 3. object (x) -> will cause infinite loop render issue
 */
