"use client";
import LoadingSpinner from "@/components/reusable/LoadingSpinner";
import NoItemFound from "@/components/reusable/NoItemFound";
import PaginatedItems from "@/components/reusable/PaginatedItem";
import CreateSaleDrawer from "@/components/sale/CreateSaleDrawer";
import DeleteSaleDialog from "@/components/sale/DeleteSaleDialog";
import EditSaleDrawer from "@/components/sale/EditSaleDrawer";
import SaleTable from "@/components/sale/SaleTable";
import StatsCard from "@/components/StatsCard";
import { useGetSalesQuery } from "@/redux/apiClient/salesApi";
import { formatedNumber } from "@/utils";
import { useState } from "react";
import { LiaSellsy } from "react-icons/lia";
import { CiCoins1 } from "react-icons/ci";
import { IoNewspaperOutline } from "react-icons/io5";
import { useGetStatsQuery } from "@/redux/apiClient/statsApi";

const SalesPage = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedSaleId, setSelectedSaleId] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { data: sales, isLoading } = useGetSalesQuery({
    searchTerm,
    limit: 9,
    page: currentPage,
  });
  const { data: stats } = useGetStatsQuery({});
  const [addDrawerOpen, setAddDrawerOpen] = useState<boolean>(false);
  const [editDrawerOpen, setEditDrawerOpen] = useState<boolean>(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  // handler--
  const hideDeleteDialogHandler = () => setDeleteDialogOpen(false);
  const hideAddDrawerHandler = () => setAddDrawerOpen(false);
  const hideEditDrawerHandler = () => setEditDrawerOpen(false);

  const editSaleIdHandler = (id: string) => {
    setSelectedSaleId(id);
    setEditDrawerOpen(true);
  };
  const deleteSaleIdHandler = (id: string) => {
    setSelectedSaleId(id);
    setDeleteDialogOpen(true);
  };
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const showPagination = sales?.data !== undefined && sales?.meta?.pages > 1;
  return (
    <div className="py-6 w-full">
      {/* header */}
      <div className="flex items-center justify-between">
        <h2 className="font-primary font-semibold text-[26px] mb-6 flex items-center">
          <span>Sales</span>
          <span className="text-base bg-gray-tertiary px-3 py-[2px] rounded-md ml-2">
            {formatedNumber(sales?.meta?.total)}
          </span>
        </h2>
        <button
          onClick={() => setAddDrawerOpen(true)}
          className="bg-blue-500 hover:bg-blue-400 text-white px-4 py-2 rounded-md font-primary cursor-pointer transition-all duration-300 "
        >
          Create Sale
        </button>
      </div>
      <div className="flex flex-wrap gap-4 my-5">
        {/* stats card-- */}
        <div className="w-full sm:w-[calc(50%-16px)] lg:w-[calc(33.33%-16px)] ">
          <StatsCard
            title={"Total Sales"}
            value={stats?.data?.sales?.total}
            icon={LiaSellsy}
          />
        </div>
        <div className="w-full sm:w-[calc(50%-16px)] lg:w-[calc(33.33%-16px)]">
          <StatsCard
            title={"Total Revenue"}
            value={stats?.data?.revenue?.total}
            icon={CiCoins1}
          />
        </div>
        <div className="w-full sm:w-[calc(50%-16px)] lg:w-[calc(33.33%-16px)]">
          <StatsCard
            title={"Total Transactions"}
            value={stats?.data?.transactions?.total}
            icon={IoNewspaperOutline}
          />
        </div>
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
      {sales?.data.length === 0 ? (
        <NoItemFound title="Sales" />
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
            <SaleTable
              sales={sales?.data}
              editSaleIdHandler={editSaleIdHandler}
              deleteSaleIdHandler={deleteSaleIdHandler}
            />
          )}
        </>
      )}
      {/* pagination box-- */}
      {showPagination && (
        <PaginatedItems
          totalPages={sales?.meta?.pages}
          onPageChange={handlePageChange}
        />
      )}
      {/* create sale drawer-- */}
      <CreateSaleDrawer
        isDrawerOpen={addDrawerOpen}
        hideDrawerHandler={hideAddDrawerHandler}
      />
      {/* edit sale drawer-- */}
      <EditSaleDrawer
        hideDrawerHandler={hideEditDrawerHandler}
        isDrawerOpen={editDrawerOpen}
        saleId={selectedSaleId}
      />
      {/* delete sale dialog-- */}
      <DeleteSaleDialog
        isDialogOpen={deleteDialogOpen}
        saleId={selectedSaleId}
        hideDialogHandler={hideDeleteDialogHandler}
        description="This action will permanently delete the sale data."
      />
    </div>
  );
};

export default SalesPage;
