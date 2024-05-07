import { UIRadio, UIRadioProps } from "../UIRadio";
import UIRadioGroup, { UIRadioGroupConfig } from "../UIRadioGroup";

type Props = {
  childrenProps: UIRadioProps[];
} & UIRadioGroupConfig;

export function buildUIRadioGroup<ValueT>({
  name,
  label,
  childrenProps,
  onChange,
  gap,
  fontSize,
  grow,
  direction,
  variant,
  isMulti,
  isRequired,
}: Props) {
  const children: JSX.Element[] = [];
  for (const childrenProp of childrenProps)
    children.push(
      <UIRadio
        key={childrenProp.name}
        name={childrenProp.name}
        label={childrenProp.label}
        onClick={childrenProp.onClick}
      />
    );

  return (
    <UIRadioGroup
      key={name}
      name={name}
      label={label}
      children={children}
      onChange={onChange}
      gap={gap}
      fontSize={fontSize}
      grow={grow}
      direction={direction}
      variant={variant}
      isMulti={isMulti}
      isRequired={isRequired}
    />
  );
}
