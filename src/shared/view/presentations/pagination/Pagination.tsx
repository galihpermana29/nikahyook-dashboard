import type { Metadata } from '@/shared/models/generalInterfaces';
import { Pagination as PaginationAntd, Row } from 'antd';

export default function Pagination({
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
    total: metadata ? metadata.total_items : 10,
    pageSize: metadata ? metadata.limit : 10,
    onChange(page) {
      onPaginationChanges((state) => ({ ...state, page }));
    },
    current: metadata ? metadata.current_page : 1,
  };

  if (!metadata)
    return (
      <Row justify="end">
        <PaginationAntd {...paginationProps} />
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

      <PaginationAntd className="my-0" {...paginationProps} />
    </div>
  );
}
