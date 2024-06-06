interface IToggleSelectProps<T> {
  item: T;
  itemsSelected: T[];
  setItemsSelected: React.Dispatch<React.SetStateAction<T[]>>;
}

export default function useToggleSelect<T>(props: IToggleSelectProps<T>) {
  if (props.itemsSelected.includes(props.item)) {
    return props.setItemsSelected(
      props.itemsSelected.filter((item) => item !== props.item)
    );
  } else {
    return props.setItemsSelected(
      Array.from(new Set([...props.itemsSelected, props.item]))
    );
  }
}
