import { Select } from "antd";
import React from "react";

type SelectProps = React.ComponentProps<typeof Select>;

export interface IdSelectProps
  extends Omit<SelectProps, "onChange" | "value" | "options"> {
  value?: string | number | undefined;
  onChange?: (value?: number) => void;
  defaultOptionName?: string;
  options: { name: string; id: number }[];
}

export const IdSelect = ({
  value,
  onChange,
  options,
  defaultOptionName,
  ...resetProps
}: IdSelectProps) => {
  return (
    <Select
      value={toNumber(value)}
      onChange={(value) => onChange?.(toNumber(value) || undefined)}
      {...resetProps}
    >
      <Select.Option value={0}>{defaultOptionName}</Select.Option>
      {options.map((user) => (
        <Select.Option key={user.id} value={user.id}>
          {user.name}
        </Select.Option>
      ))}
    </Select>
  );
};

const toNumber = (value: unknown) => (isNaN(Number(value)) ? 0 : Number(value));
