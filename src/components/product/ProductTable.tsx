import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IProduct } from "@/types";
import { PiTrash } from "react-icons/pi";
import { MdOutlineModeEditOutline } from "react-icons/md";

interface IProps {
  products: IProduct[];
  editProductIdHandler: (id: string) => void;
  deleteProductIdHandler: (id: string) => void;
}
const ProductTable = ({
  products,
  editProductIdHandler,
  deleteProductIdHandler,
}: IProps) => {
  const editProductIdChangeHandler = (id: string) => editProductIdHandler(id);
  const deleteProductIdChangeHandler = (id: string) => {
    deleteProductIdHandler(id);
  };

  const tableHeading = [
    "Name",
    "Unit Amount",
    "Unit",
    "Sale Price",
    "Purchase Price",
    "Stock",
    "Category",
    "Actions",
  ];
  return (
    <div className="w-full overflow-x-auto my-5 border-[1px] border-[#eee] rounded-lg ">
      <Table className="min-w-[900px] font-primary">
        <TableHeader className="bg-gray-light">
          <TableRow>
            {tableHeading.map((item, index) => {
              return (
                <TableHead
                  key={index}
                  className="font-primary py-4 text-left font-semibold"
                >
                  {item}
                </TableHead>
              );
            })}
          </TableRow>
        </TableHeader>
        <TableBody>
          {products?.map((product: IProduct) => {
            return (
              <TableRow key={product?._id}>
                <TableCell className="font-medium py-3 max-w-[300px]">
                  {product?.name}
                </TableCell>
                <TableCell className="py-3">{product?.quantity}</TableCell>
                <TableCell className="py-3">{product?.unit?.name}</TableCell>
                <TableCell className="py-3">{product?.salePrice}</TableCell>
                <TableCell className="py-3">{product?.purchasePrice}</TableCell>
                <TableCell className={`py-3  `}>
                  <span
                    className={`px-3 py-1 rounded-md ${
                      product?.stock === "out-of-stock"
                        ? "bg-red-100 text-red-500"
                        : "text-green-500 bg-green-100"
                    }`}
                  >
                    {" "}
                    {product?.stock}
                  </span>
                </TableCell>
                <TableCell className="py-3">
                  {product?.category?.name}
                </TableCell>
                <TableCell className="py-3 flex items-center space-x-2">
                  <button
                    onClick={() => editProductIdChangeHandler(product?._id)}
                    className="bg-blue-100 text-blue-500  py-1 rounded-md hover:bg-blue-200 trasition-all duration-300 px-2"
                  >
                    <MdOutlineModeEditOutline />
                  </button>
                  <button
                    onClick={() => deleteProductIdChangeHandler(product?._id)}
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

export default ProductTable;
