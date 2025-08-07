import {
  Box,
  Input,
  SimpleGrid,
  Stack
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../Components/Heading';
import NotFoundData from '../Components/NotFountData';
import UserCardSkeleton from '../Components/Skeletons/UserCardSkeleton';
import UserList from '../Components/UserList';
import { getAllUsers } from '../features/users/userSlice';
import LayoutWrapper from '../Layout/LayoutWrapper';



const Users = () => {

  const dispatch = useDispatch()
  const { usersList, isLoadingUsers } = useSelector((state) => state.user);
  const [query, setQuery] = useState("")

  useEffect(() => {
    dispatch(getAllUsers(query))
  }, [dispatch, query]);

  const handleChange = (e) => {
    const { value } = e.target;
    setQuery(value);
  };


  return (
    <LayoutWrapper>
      <Stack height={'160px'} justify={{ sm: "start", md: "start", lg: "space-between" }} alignItems={{ base: "start", md: "start", lg: "center" }} flexDir={{ base: 'column', md: 'column', lg: "row" }} >

        <Header title={"User Management"} subtitle={"View, block, or manage all registered users"} />
        <Input
          isRequired
          placeholder="Search By name, Email or Number.."
          type={'text'}
          value={query}
          onChange={handleChange}
          bg="gray.700"
          color="white"
          w={{ base: 'full', md: "full", lg: "220px" }}
          _focus={{
            borderColor: "red.500",
            borderWidth: "2px",
            boxShadow: "0 0 0 1px red,",
            bg: "gray.900",
          }}
          _active={{
            borderColor: "red.500",
            boxShadow: "0 0 0 1px red.500",
          }}
          _focusVisible={{
            borderColor: "red.500",
            boxShadow: "0 0 0 1px red.500",
          }}
        />


      </Stack>

      {/* 🟡 Check loading FIRST */}
      <Box flex="1" overflowY="auto">
        {
          isLoadingUsers ? (
            <SimpleGrid columns={[1, 1, 2, 3]} spacing={{ base: 8, md: 6 }} mb={8}>
              {Array(12)
                .fill(0)
                .map((_, i) => (
                  <UserCardSkeleton key={i} />
                ))}
            </SimpleGrid>
          ) : usersList ? (
            <UserList usersList={usersList} />
          ) : (
            <NotFoundData
              label="User"
              subLabel="Maybe the User was deleted or does not exist."
            />
          )
        }
      </Box>
    </LayoutWrapper >
  );
}

export default Users