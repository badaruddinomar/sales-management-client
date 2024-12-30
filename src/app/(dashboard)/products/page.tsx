import { formatedNumber } from "@/utils";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const ProductsPage = () => {
  const tableHeading = [
    "Name",
    "Qty",
    "Unit",
    "Sale Price",
    "Purchase Price",
    "Stock",
    "Category",
    "Actions",
  ];
  return (
    <div className="py-6 w-full">
      {/* header */}
      <div className="flex items-center justify-between">
        <h2 className="font-primary font-semibold text-[26px] mb-6 flex items-center">
          <span>Products</span>
          <span className="text-base bg-gray-tertiary px-3 py-1 rounded-md ml-2">
            {formatedNumber(100)}
          </span>
        </h2>
        <button className="bg-blue-primary text-white px-4 py-2 rounded-md font-primary cursor-pointer transition-all duration-300 hover:opacity-[.5]">
          Add Product
        </button>
      </div>
      {/* table container-- */}
      <div className="w-full overflow-x-auto my-5 border-[1px] border-[#eee] rounded-lg ">
        <Table className="min-w-[700px]">
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader className="bg-gray-light">
            <TableRow>
              {tableHeading.map((item, index) => {
                return (
                  <TableHead key={index} className="font-primary font-semibold">
                    {item}
                  </TableHead>
                );
              })}
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">INV001</TableCell>
              <TableCell>Paid</TableCell>
              <TableCell>Credit Card</TableCell>
              <TableCell className="text-right">$250.00</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ProductsPage;
