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
import UserDetailsCard from "../Components/UserDetailsCard.jsx";
import { logoutUser } from "../features/auth/authSlice";
import Header from "../Components/Heading.jsx";
import {useNavigate} from 'react-router-dom'
import LayoutWrapper from "../Layout/LayoutWrapper.jsx";


const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const user = useSelector((state) => state.auth.user);

  // Function to handle logout
  const handleLogout = () => {

    dispatch(logoutUser());

  }
  return (
    <LayoutWrapper>
      {user ? (
        <>
        <Header title="Administrator Panel" 
       subtitle="Control menu items, monitor orders, and manage user preferences."
         />

          <UserDetailsCard user={user} />
          <Container maxW="5xl" p={0}

          >

            <Box
              maxW="5xl"
              mx="auto"

              boxShadow="0 8px 32px 0 rgba(31, 38, 135, 0.18)"
              border={'1px solid'}
              borderColor={'rgba(31, 38, 135, 0.18)'}
              p={{ base: 2, lg: 4 }}
              bg="rgba(22, 8, 8, 0.25)"
            >

              <Stack spacing={3} flexDir={{ base: "column", lg: "row" }} mb={{ sm: 4, md: 0 }} >


                <Button
                  leftIcon={<MdAddHome />}
                  size="sm"
                  mt={3}
                onClick={()=> navigate('/add-item')}
                >
                  Create Menu
                </Button>
                <Button
                  leftIcon={<FaList />}
                  size="sm"
                  mt={3}
                onClick={()=> navigate('/orders')}
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
          </Container>

        </>
      ) : (
        <Box textAlign="center" p={4}>
          <Text fontSize="xl" color="gray.500">Loading User Details...</Text>
        </Box>
      )}
  </LayoutWrapper>
  );
};





export default Profile;
