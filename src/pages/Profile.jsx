import {
  Box,
  Button,
  Container,
  Stack,
  Text
} from "@chakra-ui/react";
import { FaList } from "react-icons/fa6";
import { MdAddHome, MdLogout } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import Header from "../Components/common/Heading";
import UserDetailsCard from "../Components/UserDetailsCard.jsx";
import { logoutUser } from "../features/auth/authSlice";


const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const user = useSelector((state) => state.auth.user);

  // Function to handle logout
  const handleLogout = () => {

    dispatch(logoutUser());

  }
  return (
    <Box
    >
      {user ? (
        <>
          <Header title="Administrator Panel"
            subtitle="Control menu items, monitor orders, and manage user preferences."
          />

          <UserDetailsCard user={user} />

            <Box
              maxW="full"
              mx="auto"
              mb={8}
              p={{ base: 2, lg: 4 }}
              bg="rgba(22, 8, 8, 0.25)"
              boxShadow={'dark-lg'}
            >

              <Stack spacing={3} flexDir={{ base: "column", lg: "row" }} mb={{ sm: 4, md: 0 }} >


                <Button
                  leftIcon={<MdAddHome />}
                  size="sm"
                  mt={3}
                  onClick={() => navigate('/add-item')}
                >
                  Create Menu
                </Button>
                <Button
                  leftIcon={<FaList />}
                  size="sm"
                  mt={3}
                  onClick={() => navigate('/orders')}
                >
                  View Orders
                </Button>
                <Button
                  leftIcon={<MdLogout />}
                  colorScheme="blue"
                  size="sm"
                  mt={3}
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </Stack>
            </Box>

        </>
      ) : (
        <Box textAlign="center" p={4}>
          <Text fontSize="xl" color="gray.500">Loading User Details...</Text>
        </Box>
      )}
    </Box>
  );
};





export default Profile;
