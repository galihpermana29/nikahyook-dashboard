import type { Metadata } from '@/shared/models/generalInterfaces';
import { Pagination, Row } from 'antd';

export default function InspirationPagination({
  metadata,
  onPaginationChanges,
}: {
  metadata: Metadata | undefined;
  onPaginationChanges: React.Dispatch<
    React.SetStateAction<{
      limit: number;
      page: number;
      search?: string;
    }>
  >;
}) {
  const paginationProps = {
    current: metadata ? metadata.current_page : 1,
    total: metadata ? metadata.total_pages : 1,
    onChange(page) {
      onPaginationChanges((state) => ({ ...state, page }));
    },
  };

  if (!metadata)
    return (
      <Row justify="end">
        <Pagination {...paginationProps} />
      </Row>
    );

  const { current_page, limit, total_items } = metadata;
  const numberOfItems = (current_page - 1) * limit + 1;
  const upperNumberofItems =
    current_page * limit < total_items ? current_page * limit : total_items;

  return (
    <div className="flex justify-between items-center mt-7">
      <p>
        Showing {numberOfItems} to {upperNumberofItems} of {total_items} entries
      </p>

      <Pagination className="my-0" {...paginationProps} />
    </div>
  );
}
