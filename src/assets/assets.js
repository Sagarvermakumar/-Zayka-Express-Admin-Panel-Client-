import { FiHome } from "react-icons/fi";
import logo from "./logo.png";

import { FaClipboardList, FaPlusCircle, FaUserCircle, FaUsers, FaUtensils } from "react-icons/fa";

const adminLinkItems = [
  { name: "Dashboard", icon: FiHome, path: "/" },                // Overview first
  { name: "Orders", icon: FaClipboardList, path: "/orders" },    // Orders second (most frequent)
  { name: "Menus", icon: FaUtensils, path: "/menus" },           // All menus
  { name: "Add Menu", icon: FaPlusCircle, path: "/add-item" },   // Add new menu
  { name: "Users", icon: FaUsers, path: "/users" },              // User management
  { name: "Profile", icon: FaUserCircle, path: "/profile" },     // Profile last
];



export { adminLinkItems, logo };

