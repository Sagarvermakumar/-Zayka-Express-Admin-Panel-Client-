import {
  FaHeadSideMask,
  FaJediOrder,
  FaRegUser,
  FaWallet,
} from "react-icons/fa";
import { FaAsterisk, FaUserGroup } from "react-icons/fa6";
import { FiHome } from "react-icons/fi";
import logo from "./logo.png";
import { MdAddReaction } from "react-icons/md";

const adminLinkItems = [
  { name: "Dashboard", icon: FiHome, path: "/" },
  { name: "Users", icon: FaUserGroup, path: "/users" },
  { name: "All Menus", icon: FaHeadSideMask, path: "/menus" },
  { name: "Add Menu", icon: MdAddReaction, path: "/add-item" },
  { name: "Orders", icon: FaJediOrder, path: "/orders" },
  { name: "Profile", icon: FaRegUser, path: "/profile" },
];


export { adminLinkItems,  logo };
