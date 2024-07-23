import type { Metadata, TGeneralFilter } from '@/shared/models/generalInterfaces';
import { Pagination as PaginationAntd, Row } from 'antd';

export default function Pagination({
  metadata,
  onPaginationChanges,
}: {
  metadata: Metadata | undefined;
  onPaginationChanges: React.Dispatch<
    React.SetStateAction<TGeneralFilter>
  >;
}) {
  const paginationProps = {
    total: metadata ? metadata.total_items : 10,
    pageSize: metadata ? metadata.limit : 10,
    onChange(page) {
      onPaginationChanges((state) => ({ ...state, page }));
    },
    current: metadata ? metadata.current_page : 1,
  };

  if (!metadata)
    return null;

  const { current_page, limit, total_items } = metadata;
  const numberOfItems = (current_page - 1) * limit + 1;
  const upperNumberofItems =
    current_page * limit < total_items ? current_page * limit : total_items;

  return (
    <Row
      className={`flex ${metadata ? 'flex-col-reverse sm:flex-row' : 'flex-row'} items-center justify-between gap-2 sm:gap-0`}
    >
      <div className={`${metadata ? 'mt-2 sm:mt-0' : ''}`}>
        Showing {numberOfItems} to {upperNumberofItems} of {total_items} entries
      </div>
      <PaginationAntd {...paginationProps} />
    </Row>
  );
}
