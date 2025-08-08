import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import Loader from "../Components/Loader.jsx";

const ProtectedRoute = ({ children, allowedRole }) => {
  const { isAuthenticated, loading, user } = useSelector((state) => state.auth);

  // If loading, show a loader
  if (loading) {
    return <Loader />;
  }

  if (!isAuthenticated) return <Navigate to="/login" />;

  if (isAuthenticated && allowedRole && user?.role !== allowedRole) return <Navigate to="/unauthorized" />;


  return children

};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  allowedRole:PropTypes.string.isRequired
};




export default ProtectedRoute;