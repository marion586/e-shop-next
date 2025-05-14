import {
  MdDashboard,
  MdDns,
  MdFormatListBulleted,
  MdLibraryAdd,
} from "react-icons/md";

export const AdminItemNav = [
  {
    path: "/admin",
    icon: MdDashboard,
    label: "Summary",
  },
  {
    path: "/admin/add-products",
    icon: MdLibraryAdd,
    label: "AddProducts",
  },
  {
    path: "/admin/manage-products",
    icon: MdDns,
    label: "ManageProducts",
  },
  {
    path: "/admin/manage-orders",
    icon: MdFormatListBulleted,
    label: "ManageOrders",
  },
];
