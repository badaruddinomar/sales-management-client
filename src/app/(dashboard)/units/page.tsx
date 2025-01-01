"use client";

import LoadingSpinner from "@/components/reusable/LoadingSpinner";
import NoItemFound from "@/components/reusable/NoItemFound";
import PaginatedItems from "@/components/reusable/PaginatedItem";
import AddUnitDialog from "@/components/unit/AddUnitDialog";
import EditUnitDialog from "@/components/unit/EditUnitDialog";
import UnitTable from "@/components/unit/UnitTable";
import { useGetUnitsQuery } from "@/redux/apiClient/unitApi";
import { formatedNumber } from "@/utils";
import { useState } from "react";

const UnitsPage = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedUnitId, setSelectedUnitId] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { data: units, isLoading } = useGetUnitsQuery({
    searchTerm,
    page: currentPage,
    limit: 9,
  });
  const [addDialogOpen, setAddDialogOpen] = useState<boolean>(false);
  const [editDialogOpen, setEditDialogOpen] = useState<boolean>(false);
  // handler--
  const hideAddDialogHandler = () => setAddDialogOpen(false);
  const hideEditDialogHandler = () => setEditDialogOpen(false);
  const editUnitIdHandler = (id: string) => {
    setSelectedUnitId(id);
    setEditDialogOpen(true);
  };
  const deleteUnitIdHandler = (id: string) => {
    setSelectedUnitId(id);
    // setEditDialogOpen(true);
  };
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const showPagination = units?.data !== undefined && units?.meta?.pages > 1;

  return (
    <div className="py-6 w-full">
      {/* header */}
      <div className="flex items-center justify-between">
        <h2 className="font-primary font-semibold text-[26px] mb-6 flex items-center">
          <span>Units</span>
          <span className="text-base bg-gray-tertiary px-3 py-[2px] rounded-md ml-2">
            {formatedNumber(units?.meta?.total)}
          </span>
        </h2>
        <button
          onClick={() => setAddDialogOpen(true)}
          className="bg-blue-500 hover:bg-blue-400 text-white px-4 py-2 rounded-md font-primary cursor-pointer transition-all duration-300 "
        >
          Add Unit
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
      {units?.data.length === 0 ? (
        <NoItemFound title="Units" />
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
            <UnitTable
              units={units?.data}
              editUnitIdHandler={editUnitIdHandler}
              deleteUnitIdHandler={deleteUnitIdHandler}
            />
          )}
        </>
      )}
      {/* pagination box-- */}
      {showPagination && (
        <PaginatedItems
          totalPages={units?.meta?.pages}
          onPageChange={handlePageChange}
        />
      )}
      {/* add unit dialog-- */}
      <AddUnitDialog
        isDialogOpen={addDialogOpen}
        hideDialogHandler={hideAddDialogHandler}
      />
      {/* edit unit dialog-- */}
      <EditUnitDialog
        isDialogOpen={editDialogOpen}
        hideDialogHandler={hideEditDialogHandler}
        unitId={selectedUnitId}
      />
      {/* delete unit dialog-- */}
    </div>
  );
};

export default UnitsPage;
