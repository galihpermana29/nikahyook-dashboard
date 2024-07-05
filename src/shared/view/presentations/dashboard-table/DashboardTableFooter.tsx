import type { Metadata } from "@/shared/models/generalInterfaces"
import { Pagination, Row, type PaginationProps } from "antd";

export default function DashboardTableFooter({ metadata, paginationProps }: { metadata: Metadata | undefined, paginationProps: PaginationProps }) {
    if (!metadata) return (
        <Row justify="end">
            <Pagination {...paginationProps} />
        </Row>
    );

    const { current_page, limit, total_items } = metadata;

    return (
        <div className={`flex ${metadata.total_pages > 1 ? 'flex-col-reverse sm:flex-row' : 'flex-row'} items-center justify-between gap-2 sm:gap-0`}>
            <span className={`${metadata.total_pages > 1 ? 'mt-2 sm:mt-0' : ''}`}>
                Showing {(current_page - 1) * limit + 1} to {current_page * limit < total_items ? current_page * limit : total_items} of {total_items} entries
            </span>
            <Pagination {...paginationProps} />
        </div>
    );
}