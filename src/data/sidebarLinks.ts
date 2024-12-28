import { MdOutlineSpaceDashboard } from "react-icons/md";
import { CiBoxes } from "react-icons/ci";
import { LiaCoinsSolid } from "react-icons/lia";
import { MdOutlineCategory } from "react-icons/md";
import { MdOutlineAdUnits } from "react-icons/md";
export const sidebarLinks = [
  {
    title: "Dashboard",
    path: "/",
    icon: MdOutlineSpaceDashboard,
    isActive: true,
  },
  {
    title: "Products",
    path: "/products",
    icon: CiBoxes,
  },
  {
    title: "Sales",
    path: "/sales",
    icon: LiaCoinsSolid,
  },
  {
    title: "Categories",
    path: "/categories",
    icon: MdOutlineCategory,
  },
  {
    title: "Units",
    path: "/units",
    icon: MdOutlineAdUnits,
  },
];
