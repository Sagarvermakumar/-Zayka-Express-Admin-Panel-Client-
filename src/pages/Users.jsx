import {
  Box,
  Stack,
  Select,
  Center,

} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { MdOpenInNew } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../Components/Heading';
import { getAllUsers } from '../features/users/userSlice';
import LayoutWrapper from '../Layout/LayoutWrapper';
import UserList from '../Components/UserList';
import NotFoundData from '../Components/NotFountData';



const Users = () => {

  const dispatch = useDispatch()
  const { usersList } = useSelector((state) => state.user);
  const [lastXDays, setLastXDays] = useState(null)




  useEffect(() => {
    dispatch(getAllUsers(lastXDays))
  }, [dispatch, lastXDays]);

  console.log(lastXDays)
  const handleChange = (e) => {
    const { value } = e.target;
    setLastXDays(value);
  };
  return (
    <>
        {usersList?.length > 0 ? (
         
          <LayoutWrapper>
      <Stack mx={4} justify={'space-between'} alignItems={{ sm: "start", md: "center" }} flexDir={{ sm: 'column', md: 'row' }} >

        <Header title={"User Management"} subtitle={"View, block, or manage all registered users"} />
        <Select

          placeholder="View Added User in Last X Days"
          _placeholder={{ bg: 'rgba(0,0,0,0.3)' }}
          name="category"
          value={lastXDays}
          onChange={handleChange}
          bg="rgba(0,0,0,0.3)"
          width={{ base: 'full', md: 'fit-content' }}
          color="white"
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
        >

          {

            [7, 30, 60, 180, 365].map(lastXDays => (
              <option style={{ background: "rgba(0,0,0,0.3)" }} value={lastXDays} >Last {lastXDays} Days </option>

            ))
          }
        </Select>
      </Stack>
          <UserList usersList={usersList} />
          </LayoutWrapper>
        ) : (
          <NotFoundData
            label="User"
            subLabel="Maybe the User was deleted or does not exist."
          />
        )}
    </>
  )
}

export default Users