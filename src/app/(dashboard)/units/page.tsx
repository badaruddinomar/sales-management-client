"use client";

import { useState } from "react";
import AddUnitDialog from "@/components/unit/AddUnitDialog";
import UnitTable from "@/components/unit/UnitTable";
import DeleteUnitDialog from "@/components/unit/DeleteUnitDialog";
import EditUnitDialog from "@/components/unit/EditUnitDialog";
import LoadingSpinner from "@/components/reusable/LoadingSpinner";
import NoItemFound from "@/components/reusable/NoItemFound";
import PaginatedItems from "@/components/reusable/PaginatedItem";
import { useGetUnitsQuery } from "@/redux/apiClient/unitApi";
import { formatedNumber } from "@/utils";

const UnitsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUnitId, setSelectedUnitId] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [dialogState, setDialogState] = useState({
    add: false,
    edit: false,
    delete: false,
  });

  const { data: units, isLoading } = useGetUnitsQuery({
    searchTerm,
    page: currentPage,
    limit: 9,
  });

  const toggleDialog = (type: string, state: boolean) => {
    setDialogState((prev) => ({ ...prev, [type]: state }));
  };

  const handlePageChange = (page: number) => setCurrentPage(page);
  const handleEditUnit = (id: string) => {
    setSelectedUnitId(id);
    toggleDialog("edit", true);
  };
  const handleDeleteUnit = (id: string) => {
    setSelectedUnitId(id);
    toggleDialog("delete", true);
  };

  const showPagination = units?.data && units?.meta?.pages > 1;

  return (
    <div className="py-6 w-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="font-primary font-semibold text-[26px] mb-6 flex items-center">
          <span>Units</span>
          <span className="text-base bg-gray-tertiary px-3 py-[2px] rounded-md ml-2">
            {formatedNumber(units?.meta?.total)}
          </span>
        </h2>
        <button
          onClick={() => toggleDialog("add", true)}
          className="bg-blue-500 hover:bg-blue-400 text-white px-4 py-2 rounded-md font-primary cursor-pointer transition-all duration-300"
        >
          Add Unit
        </button>
      </div>

      {/* Search Input */}
      <div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search..."
          className="px-4 py-2 border-b-[1px] focus:outline-none font-primary border-gray-tertiary"
        />
      </div>

      {/* Content */}
      {units?.data?.length === 0 ? (
        <NoItemFound title="Units" />
      ) : isLoading ? (
        <LoadingSpinner
          size={40}
          color="#000"
          borderWidth="5px"
          height="50vh"
        />
      ) : (
        <UnitTable
          units={units?.data}
          editUnitIdHandler={handleEditUnit}
          deleteUnitIdHandler={handleDeleteUnit}
        />
      )}

      {/* Pagination */}
      {showPagination && (
        <PaginatedItems
          totalPages={units?.meta?.pages}
          onPageChange={handlePageChange}
        />
      )}

      {/* Dialogs */}
      <AddUnitDialog
        isDialogOpen={dialogState.add}
        hideDialogHandler={() => toggleDialog("add", false)}
      />
      <EditUnitDialog
        isDialogOpen={dialogState.edit}
        hideDialogHandler={() => toggleDialog("edit", false)}
        unitId={selectedUnitId}
      />
      <DeleteUnitDialog
        isDialogOpen={dialogState.delete}
        hideDialogHandler={() => toggleDialog("delete", false)}
        unitId={selectedUnitId}
      />
    </div>
  );
};

export default UnitsPage;
