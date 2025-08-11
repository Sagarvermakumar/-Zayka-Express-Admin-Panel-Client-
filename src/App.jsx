import { Suspense, lazy, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Loader from "./Components/common/Loader.jsx";
import PageNotFound from "./Components/common/PageNotFound.jsx";
import Unauthorized from "./Components/common/Unauthorized.jsx";
import { fetchProfile } from "./features/auth/authSlice.js";
import GlassLayout from "./Layout/Glass.jsx";
import AddMenuItems from "./pages/AddMenuItems.jsx";
import UserDetails from "./pages/UserDetails.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";



// public pages 
const Login = lazy(() => import("./pages/Login.jsx"));


//admin pages
const AdminLayout = lazy(() => import('./Layout/Admin.jsx'))
const DashboardAdmin = lazy(() => import("./pages/Dashboard.jsx"));
// Lazy imports

const Profile = lazy(() => import("./pages/Profile.jsx"));
const Users = lazy(() => import("./pages/Users.jsx"));
const Menus = lazy(() => import("./pages/Menus.jsx"));
const AllOrders = lazy(() => import("./pages/Orders.jsx"));


const App = () => {

  const dispatch = useDispatch();
  useEffect(() => {

    dispatch(fetchProfile())
  }, [dispatch]);


  return (
    <Router>
      {/* <Sidebar/> */}
      {/* Wrap the Routes Pin Suspense to handle lazy loading */}
      <Suspense fallback={<Loader />}>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<GlassLayout>
            <Login />
          </GlassLayout>} />

          {/* Protected routes */}
          <Route path="/" element={<ProtectedRoute allowedRole={'Admin'}><AdminLayout /></ProtectedRoute>}>
            <Route index element={<DashboardAdmin />} />
            <Route path="profile" element={<Profile />} />
            <Route path="users" element={<Users />} />
            <Route path="menus" element={<Menus />} />
            <Route path="orders" element={<AllOrders />} />
            <Route path="users/:id" element={<UserDetails />} />
            <Route path="add-item" element={<AddMenuItems />} />
            // App.js or Routes.jsx
            <Route path="menu/edit/:id" element={<AddMenuItems />} />

          </Route>




          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export const server = `http://localhost:4000`;
export default App;
