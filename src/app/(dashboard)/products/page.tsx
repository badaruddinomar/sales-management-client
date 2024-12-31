"use client";
import { formatedNumber } from "@/utils";
import React, { useState } from "react";
import { useGetProductsQuery } from "@/redux/apiClient/productApi";
import LoadingSpinner from "@/components/reusable/LoadingSpinner";
import NoItemFound from "@/components/reusable/NoItemFound";
import ProductTable from "@/components/product/ProductTable";
import PaginatedItems from "@/components/reusable/PaginatedItem";
import AddProductDrawer from "@/components/product/AddProductDrawer";

const ProductsPage = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { data: products, isLoading } = useGetProductsQuery({
    searchTerm,
    page: currentPage,
    limit: 9,
  });
  const [addDrawerOpen, setAddDrawerOpen] = useState<boolean>(false);
  const hideAddDrawerHandler = () => {
    setAddDrawerOpen(false);
  };
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const showPagination =
    products?.data !== undefined && products?.meta?.pages > 1;

  return (
    <div className="py-6 w-full">
      {/* header */}
      <div className="flex items-center justify-between">
        <h2 className="font-primary font-semibold text-[26px] mb-6 flex items-center">
          <span>Products</span>
          <span className="text-base bg-gray-tertiary px-3 py-[2px] rounded-md ml-2">
            {formatedNumber(products?.meta?.total)}
          </span>
        </h2>
        <button
          onClick={() => setAddDrawerOpen(true)}
          className="bg-blue-500 hover:bg-blue-400 text-white px-4 py-2 rounded-md font-primary cursor-pointer transition-all duration-300 "
        >
          Add Product
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
      {products?.data.length === 0 ? (
        <NoItemFound title="Products" />
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
            <ProductTable products={products?.data} />
          )}
        </>
      )}
      {/* pagination box-- */}
      {showPagination && (
        <PaginatedItems
          totalPages={products?.meta?.pages}
          onPageChange={handlePageChange}
        />
      )}
      {/* add product drawer-- */}
      <AddProductDrawer
        isDrawerOpen={addDrawerOpen}
        hideDrawerHandler={hideAddDrawerHandler}
      />
    </div>
  );
};

export default ProductsPage;
