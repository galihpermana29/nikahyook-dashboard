import type { BaseOptionType } from 'antd/es/select';

export default function useFilterSelectOptions(
  input: string,
  option: BaseOptionType | undefined
) {
  return (option?.label.toLowerCase() ?? '').includes(input.toLowerCase());
}
