import type { BaseOptionType } from 'antd/es/select';

export default function useFilterVendorTypes(
  input: string,
  option?: BaseOptionType
) {
  // search by label (case-insensitive)
  return (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
}
