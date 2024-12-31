"use client";
import ReactPaginate from "react-paginate";

interface PaginatedItemsProps {
  totalPages: number;
  onPageChange: (page: number) => void;
}

const PaginatedItems: React.FC<PaginatedItemsProps> = ({
  totalPages,
  onPageChange,
}) => {
  const pageChangeHandler = (selectedItem: { selected: number }) => {
    onPageChange(selectedItem.selected + 1);
  };

  return (
    <div className="my-[20px]">
      <ReactPaginate
        previousLabel={"<"}
        nextLabel={">"}
        breakLabel={null}
        pageCount={totalPages}
        marginPagesDisplayed={1}
        pageRangeDisplayed={2}
        onPageChange={pageChangeHandler}
        containerClassName={"flex justify-center font-primary space-x-2 mt-4"}
        pageClassName={"px-3 py-1 border rounded"}
        activeClassName={"bg-purple-500 text-white "}
        previousClassName={"px-3 py-1 border rounded"}
        nextClassName={"px-3 py-1 border rounded"}
        breakClassName={"px-3 py-1 border rounded"}
        disabledClassName={"opacity-50 cursor-not-allowed"}
      />
    </div>
  );
};

export default PaginatedItems;
