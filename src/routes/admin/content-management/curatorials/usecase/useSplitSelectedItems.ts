type Params<T> = {
  data: T[];
  selectedId: number[];
};

export default function useSplitSelectedItems<T extends { id: number }>({
  data,
  selectedId,
}: Params<T>) {
  return {
    not_selected: (data.filter((item: T) => !selectedId.includes(item.id)) ??
      []) as T[],
    selected: (data.filter((item: T) => selectedId.includes(item.id)) ??
      []) as T[],
  };
}
