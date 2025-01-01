"use client";

import AddCategoryDialog from "@/components/category/AddCategoryDialog";
import CategoryTable from "@/components/category/CategoryTable";
import DeleteCategoryDialog from "@/components/category/DeleteCategoryDialog";
import EditCategoryDialog from "@/components/category/EditCategoryDialog";
import LoadingSpinner from "@/components/reusable/LoadingSpinner";
import NoItemFound from "@/components/reusable/NoItemFound";
import PaginatedItems from "@/components/reusable/PaginatedItem";
import { useGetCategoriesQuery } from "@/redux/apiClient/categoryApi";
import { formatedNumber } from "@/utils";
import { useState } from "react";

const CategoriesPage = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { data: categories, isLoading } = useGetCategoriesQuery({
    searchTerm,
    page: currentPage,
    limit: 9,
  });
  const [addDialogOpen, setAddDialogOpen] = useState<boolean>(false);
  const [editDialogOpen, setEditDialogOpen] = useState<boolean>(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  // handler--
  const hideAddDialogHandler = () => setAddDialogOpen(false);
  const hideEditDialogHandler = () => setEditDialogOpen(false);
  const hideDeleteDialogHandler = () => setDeleteDialogOpen(false);
  const editCategoryIdHandler = (id: string) => {
    setSelectedCategoryId(id);
    setEditDialogOpen(true);
  };
  const deleteCategoryIdHandler = (id: string) => {
    setSelectedCategoryId(id);
    setDeleteDialogOpen(true);
  };
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const showPagination =
    categories?.data !== undefined && categories?.meta?.pages > 1;

  return (
    <div className="py-6 w-full">
      {/* header */}
      <div className="flex items-center justify-between">
        <h2 className="font-primary font-semibold text-[26px] mb-6 flex items-center">
          <span>Categories</span>
          <span className="text-base bg-gray-tertiary px-3 py-[2px] rounded-md ml-2">
            {formatedNumber(categories?.meta?.total)}
          </span>
        </h2>
        <button
          onClick={() => setAddDialogOpen(true)}
          className="bg-blue-500 hover:bg-blue-400 text-white px-4 py-2 rounded-md font-primary cursor-pointer transition-all duration-300 "
        >
          Add Category
        </button>
      </div>
      {/* search input-- */}
      <div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search..."
          className="px-4 py-2 border-b-[1px] focus:outline-none font-primary  border-gray-tertiary "
        />
      </div>
      {/* table container-- */}
      {categories?.data.length === 0 ? (
        <NoItemFound title="Categories" />
      ) : (
        <>
          {isLoading ? (
            <LoadingSpinner
              size={40}
              color="#000"
              borderWidth="5px"
              height="50vh"
            />
          ) : (
            <CategoryTable
              categories={categories?.data}
              editCategoryIdHandler={editCategoryIdHandler}
              deleteCategoryIdHandler={deleteCategoryIdHandler}
            />
          )}
        </>
      )}
      {/* pagination box-- */}
      {showPagination && (
        <PaginatedItems
          totalPages={categories?.meta?.pages}
          onPageChange={handlePageChange}
        />
      )}
      {/* add category dialog-- */}
      <AddCategoryDialog
        isDialogOpen={addDialogOpen}
        hideDialogHandler={hideAddDialogHandler}
      />
      {/* edit category dialog-- */}
      <EditCategoryDialog
        isDialogOpen={editDialogOpen}
        hideDialogHandler={hideEditDialogHandler}
        categoryId={selectedCategoryId}
      />
      {/* delete category dialog-- */}
      <DeleteCategoryDialog
        isDialogOpen={deleteDialogOpen}
        categoryId={selectedCategoryId}
        hideDialogHandler={hideDeleteDialogHandler}
        description="This action will permanently delete the category and also related to its products."
      />
    </div>
  );
};

export default CategoriesPage;
