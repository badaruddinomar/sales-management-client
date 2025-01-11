"use client";
import { formatedNumber } from "@/utils";
import React, { useState } from "react";
import { useGetProductsQuery } from "@/redux/apiClient/productApi";
import LoadingSpinner from "@/components/reusable/LoadingSpinner";
import NoItemFound from "@/components/reusable/NoItemFound";
import ProductTable from "@/components/product/ProductTable";
import PaginatedItems from "@/components/reusable/PaginatedItem";
import AddProductDrawer from "@/components/product/AddProductDrawer";
import EditProductDrawer from "@/components/product/EditProductDrawer";
import DeleteProductDialog from "@/components/product/DeleteProductDialog";
import { GoPlus } from "react-icons/go";

const ProductsPage = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedProductId, setSelectedProductId] = useState<string>("");

  // API data fetching
  const { data: products, isLoading } = useGetProductsQuery({
    searchTerm,
    page: currentPage,
    limit: 9,
  });

  // Drawer and Dialog states
  const [addDrawerOpen, setAddDrawerOpen] = useState<boolean>(false);
  const [editDrawerOpen, setEditDrawerOpen] = useState<boolean>(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);

  // Handler functions
  const toggleDrawer = (type: "add" | "edit", state: boolean) => {
    if (type === "add") setAddDrawerOpen(state);
    if (type === "edit") setEditDrawerOpen(state);
  };

  const toggleDeleteDialog = (state: boolean) => setDeleteDialogOpen(state);

  const handlePageChange = (page: number) => setCurrentPage(page);

  const handleProductAction = (action: "edit" | "delete", id: string) => {
    setSelectedProductId(id);
    if (action === "edit") setEditDrawerOpen(true);
    if (action === "delete") setDeleteDialogOpen(true);
  };

  const showPagination =
    products?.data !== undefined && products?.meta?.pages > 1;

  return (
    <div className="py-6 w-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="font-primary font-semibold text-[26px]  flex items-center">
          <span>Products</span>
          <span className="text-base bg-gray-tertiary px-3 py-[2px] rounded-md ml-2">
            {formatedNumber(products?.meta?.total)}
          </span>
        </h2>
        <button
          onClick={() => toggleDrawer("add", true)}
          className="bg-blue-500 hover:bg-blue-400 text-white px-4 py-2 rounded-md font-primary cursor-pointer transition-all duration-300"
        >
          <GoPlus className="text-2xl block sm:hidden" />{" "}
          <span className="sm:block hidden">Add Product</span>
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
      {products?.data.length === 0 ? (
        <NoItemFound title="Products" />
      ) : isLoading ? (
        <LoadingSpinner
          size={40}
          color="#000"
          borderWidth="5px"
          height="50vh"
        />
      ) : (
        <ProductTable
          products={products?.data}
          editProductIdHandler={(id) => handleProductAction("edit", id)}
          deleteProductIdHandler={(id) => handleProductAction("delete", id)}
        />
      )}

      {/* Pagination */}
      {showPagination && (
        <PaginatedItems
          totalPages={products?.meta?.pages}
          onPageChange={handlePageChange}
        />
      )}

      {/* Drawer & Dialogs */}
      <AddProductDrawer
        isDrawerOpen={addDrawerOpen}
        hideDrawerHandler={() => toggleDrawer("add", false)}
      />
      <EditProductDrawer
        isDrawerOpen={editDrawerOpen}
        hideDrawerHandler={() => toggleDrawer("edit", false)}
        productId={selectedProductId}
      />
      <DeleteProductDialog
        hideDialogHandler={() => toggleDeleteDialog(false)}
        isDialogOpen={deleteDialogOpen}
        productId={selectedProductId}
        description="This action cannot be undone. This will permanently delete the product and remove its data from our servers."
      />
    </div>
  );
};

export default ProductsPage;
