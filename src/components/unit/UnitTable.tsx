import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IUnit } from "@/types";
import { PiTrash } from "react-icons/pi";
import { MdOutlineModeEditOutline } from "react-icons/md";

interface IProps {
  units: IUnit[];
  editUnitIdHandler: (id: string) => void;
  deleteUnitIdHandler: (id: string) => void;
}
const UnitTable = ({
  units,
  editUnitIdHandler,
  deleteUnitIdHandler,
}: IProps) => {
  const editUnitIdChangeHandler = (id: string) => editUnitIdHandler(id);
  const deleteUnitIdChangeHandler = (id: string) => deleteUnitIdHandler(id);

  const tableHeading = ["Name", "Actions"];
  return (
    <div className="w-full overflow-x-auto my-5 border-[1px] border-[#eee] rounded-lg ">
      <Table className="font-primary ">
        <TableHeader className="bg-gray-light">
          <TableRow>
            {tableHeading.map((item, index) => {
              return (
                <TableHead
                  key={index}
                  className="font-primary py-4 text-center font-semibold"
                >
                  {item}
                </TableHead>
              );
            })}
          </TableRow>
        </TableHeader>
        <TableBody>
          {units?.map((unit: IUnit) => {
            return (
              <TableRow key={unit?._id}>
                <TableCell className="font-medium text-center py-3 max-w-[300px]">
                  {unit?.name}
                </TableCell>
                <TableCell className="py-3 flex items-center justify-center  space-x-2">
                  <button
                    onClick={() => editUnitIdChangeHandler(unit?._id)}
                    className="bg-blue-100 text-blue-500  py-1 rounded-md hover:bg-blue-200 trasition-all duration-300 px-2"
                  >
                    <MdOutlineModeEditOutline />
                  </button>
                  <button
                    onClick={() => deleteUnitIdChangeHandler(unit?._id)}
                    className="bg-red-100 text-red-500 hover:bg-red-200 transition-all duration-300 py-1 rounded-md px-2"
                  >
                    <PiTrash />
                  </button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default UnitTable;
