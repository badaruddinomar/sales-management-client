"use client";

import { useState } from "react";
import AddCategoryDialog from "@/components/category/AddCategoryDialog";
import CategoryTable from "@/components/category/CategoryTable";
import DeleteCategoryDialog from "@/components/category/DeleteCategoryDialog";
import EditCategoryDialog from "@/components/category/EditCategoryDialog";
import LoadingSpinner from "@/components/reusable/LoadingSpinner";
import NoItemFound from "@/components/reusable/NoItemFound";
import PaginatedItems from "@/components/reusable/PaginatedItem";
import { useGetCategoriesQuery } from "@/redux/apiClient/categoryApi";
import { formatedNumber } from "@/utils";
import { GoPlus } from "react-icons/go";

const CategoriesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [dialogState, setDialogState] = useState({
    add: false,
    edit: false,
    delete: false,
  });

  const { data: categories, isLoading } = useGetCategoriesQuery({
    searchTerm,
    page: currentPage,
    limit: 9,
  });

  const toggleDialog = (type: string, state: boolean) => {
    setDialogState((prev) => ({ ...prev, [type]: state }));
  };

  const handlePageChange = (page: number) => setCurrentPage(page);
  const handleEditCategory = (id: string) => {
    setSelectedCategoryId(id);
    toggleDialog("edit", true);
  };
  const handleDeleteCategory = (id: string) => {
    setSelectedCategoryId(id);
    toggleDialog("delete", true);
  };

  const showPagination =
    categories?.data?.length !== 0 && categories?.meta?.pages > 1;

  return (
    <div className="py-6 w-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="font-primary font-semibold text-[20px] sm:text-[26px] flex items-center">
          <span>Categories</span>
          <span className="text-base bg-gray-tertiary px-3 py-[2px] rounded-md ml-2">
            {formatedNumber(categories?.meta?.total)}
          </span>
        </h2>
        <button
          onClick={() => toggleDialog("add", true)}
          className="bg-blue-500 hover:bg-blue-400 text-white px-4 py-2 rounded-md font-primary cursor-pointer transition-all duration-300"
        >
          <GoPlus className="text-2xl block sm:hidden" />{" "}
          <span className="sm:block hidden">Add Category</span>
        </button>
      </div>

      {/* Search Input */}
      <div className="mt-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search..."
          className="px-4 py-2 border-b-[1px] focus:outline-none font-primary border-gray-tertiary"
        />
      </div>

      {/* Content */}
      {categories?.data?.length === 0 ? (
        <NoItemFound title="Categories" />
      ) : isLoading ? (
        <LoadingSpinner
          size={40}
          color="#000"
          borderWidth="5px"
          height="50vh"
        />
      ) : (
        <CategoryTable
          categories={categories?.data}
          editCategoryIdHandler={handleEditCategory}
          deleteCategoryIdHandler={handleDeleteCategory}
        />
      )}

      {/* Pagination */}
      {showPagination && (
        <PaginatedItems
          totalPages={categories?.meta?.pages}
          onPageChange={handlePageChange}
        />
      )}

      {/* Dialogs */}
      <AddCategoryDialog
        isDialogOpen={dialogState.add}
        hideDialogHandler={() => toggleDialog("add", false)}
      />
      <EditCategoryDialog
        isDialogOpen={dialogState.edit}
        hideDialogHandler={() => toggleDialog("edit", false)}
        categoryId={selectedCategoryId}
      />
      <DeleteCategoryDialog
        isDialogOpen={dialogState.delete}
        hideDialogHandler={() => toggleDialog("delete", false)}
        categoryId={selectedCategoryId}
      />
    </div>
  );
};

export default CategoriesPage;
