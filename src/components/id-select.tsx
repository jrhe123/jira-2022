import React from "react";
import { Raw } from "types";
import { Select } from "antd";

type SelectProps = React.ComponentProps<typeof Select>;

interface IdSelectProps
  extends Omit<SelectProps, "value" | "onChange" | "options"> {
  value?: Raw | null | undefined;
  onChange?: (value?: number) => void; // format data to number
  defaultOptionName?: string;
  options?: { name: string; id: number }[];
}

/**
 * value can be multiple type
 * onChange only return number| undefined
 * isNaN(Number(value)), if it's true means default option
 *
 * Number({}) -> undefined
 * Number("abc") -> undefined
 * @param props
 * @returns
 */
export const IdSelect = (props: IdSelectProps) => {
  const { value, onChange, defaultOptionName, options, ...restProps } = props;
  return (
    <Select
      value={options?.length ? toNumber(value) : 0}
      onChange={(value) => onChange?.(toNumber(value) || undefined)}
      {...restProps}
    >
      {defaultOptionName ? (
        <Select.Option value={0}>{defaultOptionName}</Select.Option>
      ) : null}
      {options?.map((option) => (
        <Select.Option key={option.id} value={option.id}>
          {option.name}
        </Select.Option>
      ))}
    </Select>
  );
};

const toNumber = (value: unknown) => (isNaN(Number(value)) ? 0 : Number(value));
