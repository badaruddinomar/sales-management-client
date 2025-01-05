"use client";
import LoadingSpinner from "@/components/reusable/LoadingSpinner";
import { useGetSaleQuery } from "@/redux/apiClient/salesApi";
import { formatDate } from "@/utils";
import { useParams } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { useReactToPrint } from "react-to-print";
import { IoPrintOutline } from "react-icons/io5";
import { useRef } from "react";

interface IProduct {
  _id: string;
  product: { _id: string; name: string };
  unitAmount: number;
  unit: { _id: string; name: string };
  salePrice: number;
}
const SalesDetailsPage = () => {
  const { id } = useParams();
  const { data: sale, isLoading } = useGetSaleQuery({ saleId: id });
  const printableRef = useRef(null);
  const handlePrint = useReactToPrint({
    contentRef: printableRef,
    documentTitle: "Sale Details",
  });

  if (isLoading) {
    return (
      <LoadingSpinner size={40} color="#000" borderWidth="5px" height="50vh" />
    );
  }
  const tableHeading = ["Product", "Unit Amount", "Unit", "Sale Price"];

  return (
    <div className="w-full px-3 py-6">
      <div className="w-full max-w-[800px] mx-auto">
        <div className="flex items-center justify-between">
          <h3 className="text-center text-2xl font-primary font-semibold">
            Sale Details
          </h3>
          <button
            onClick={() => handlePrint()}
            className="flex items-center font-primary cursor-pointer bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md space-x-1"
          >
            <IoPrintOutline /> <span>Print</span>
          </button>
        </div>
        <div
          ref={printableRef}
          className="print-container w-full border-[1px]  border-[#eee] p-5 rounded-lg my-5"
        >
          <div className="flex items-center justify-end space-x-2">
            <Image src={"/logo.svg"} alt="logo" width={30} height={30} />
            <p className="font-primary font-semibold">Weno</p>
          </div>
          <p className="capitalize font-primary my-2">
            <span className="font-semibold">Name:</span>{" "}
            {sale?.data?.customerName}
          </p>
          <p className="capitalize font-primary my-2">
            <span className="font-semibold">Phone:</span>{" "}
            {sale?.data?.customerPhone}
          </p>
          <p className="capitalize font-primary my-2">
            <span className="font-semibold">Date:</span>{" "}
            {formatDate(sale?.data?.saleDate)}
          </p>
          <p className="capitalize font-primary my-2">
            <span className="font-semibold">Paid:</span>{" "}
            {sale?.data?.paymentMethod}
          </p>
          {/* products table-- */}
          <div className="w-full overflow-x-auto my-5 border-[1px] border-[#eee] rounded-lg ">
            <Table className="font-primary min-w-[500px]">
              <TableHeader className="bg-gray-light">
                <TableRow>
                  {tableHeading.map((item, index) => {
                    return (
                      <TableHead
                        key={index}
                        className="font-primary py-4 font-semibold"
                      >
                        {item}
                      </TableHead>
                    );
                  })}
                </TableRow>
              </TableHeader>
              <TableBody>
                {sale?.data?.products?.map((product: IProduct) => {
                  return (
                    <TableRow key={product?._id}>
                      <TableCell className="font-medium  py-3 ">
                        {product?.product?.name}
                      </TableCell>
                      <TableCell className="font-medium  py-3 ">
                        {product?.unitAmount}
                      </TableCell>
                      <TableCell className="font-medium   py-3 ">
                        {product?.unit?.name}
                      </TableCell>
                      <TableCell className="font-medium   py-3 ">
                        {product?.salePrice}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell className="font-semibold py-3 ">Total</TableCell>
                  <TableCell className="font-medium py-3 "></TableCell>
                  <TableCell className="font-medium py-3 "></TableCell>
                  <TableCell className="font-semibold py-3">
                    {sale?.data?.totalAmount}
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesDetailsPage;
