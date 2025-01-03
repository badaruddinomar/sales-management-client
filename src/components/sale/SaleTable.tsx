import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ISale } from "@/types";
import { PiTrash } from "react-icons/pi";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { formatDate } from "@/utils";

interface IProps {
  sales: ISale[];
  editSaleIdHandler: (id: string) => void;
  deleteSaleIdHandler: (id: string) => void;
}
const SaleTable = ({
  sales,
  editSaleIdHandler,
  deleteSaleIdHandler,
}: IProps) => {
  const editSaleIdChangeHandler = (id: string) => editSaleIdHandler(id);
  const deleteSaleIdChangeHandler = (id: string) => deleteSaleIdHandler(id);

  const tableHeading = [
    "Customer",
    "Phone",
    "Products",
    "Total",
    "Payment",
    "Created",
    "Actions",
  ];
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
          {sales?.map((sale: ISale) => {
            return (
              <TableRow key={sale?._id}>
                <TableCell className="font-medium text-center py-3 max-w-[300px]">
                  {sale?.customerName}
                </TableCell>
                <TableCell className="font-medium text-center py-3 max-w-[300px]">
                  {sale?.customerPhone}
                </TableCell>
                <TableCell className="font-medium text-center py-3 max-w-[300px]">
                  {sale?.products?.length}
                </TableCell>
                <TableCell className="font-medium text-center py-3 max-w-[300px]">
                  {sale?.totalAmount}
                </TableCell>
                <TableCell className="font-medium text-center py-3 max-w-[300px]">
                  {sale?.paymentMethod}
                </TableCell>
                <TableCell className="font-medium text-center py-3 max-w-[300px]">
                  {formatDate(sale?.saleDate)}
                </TableCell>
                <TableCell className="py-3 flex items-center justify-center  space-x-2">
                  <button
                    onClick={() => editSaleIdChangeHandler(sale?._id)}
                    className="bg-blue-100 text-blue-500  py-1 rounded-md hover:bg-blue-200 trasition-all duration-300 px-2"
                  >
                    <MdOutlineModeEditOutline />
                  </button>
                  <button
                    onClick={() => deleteSaleIdChangeHandler(sale?._id)}
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

export default SaleTable;
