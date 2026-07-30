interface PaginationProps {
  page: number;
  totalCount: number;
  perPage: number;
  onChange: (page: number) => void;
}

function Pagination({ page, totalCount, perPage, onChange }: PaginationProps) {
  const lastPage = Math.max(1, Math.ceil(totalCount / perPage));

  return (
    <div className="pagination">
      <button type="button" disabled={page <= 1} onClick={() => onChange(page - 1)}>
        Prev
      </button>
      <span>
        Page #{page} of {lastPage}
      </span>
      <button type="button" disabled={page >= lastPage} onClick={() => onChange(page + 1)}>
        Next
      </button>
    </div>
  );
}

export default Pagination;