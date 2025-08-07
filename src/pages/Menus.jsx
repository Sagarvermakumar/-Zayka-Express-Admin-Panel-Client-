import { Input, Stack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MenuList from '../Components/AdminFoodItems';
import Header from '../Components/Heading';
import NotFoundData from '../Components/NotFountData';
import { getAllMenuItems } from '../features/Menu/menuSlice';
import LayoutWrapper from '../Layout/LayoutWrapper';
const Menus = () => {
   
  const dispatch = useDispatch();
  const [query, setQuery] = useState("")
  const { menusItem } = useSelector(state => state.menuItems);

  const handleChange = (e) => {
    const { value } = e.target;
    setQuery(value);
  };
  // console.log(menusItem)
  useEffect(() => {
    dispatch(getAllMenuItems(query))
  }, [dispatch,query])
  
  return (
      <LayoutWrapper>
    <Stack height={'160px'} justify={{ sm: "start", md: "start", lg: "space-between" }} alignItems={{ base: "start", md: "start", lg: "center" }} flexDir={{ base: 'column', md: 'column', lg: "row" }} >
<Header title={"All Menu Items"} subtitle={"Browse and manage all available food items"} />
  
          <Input
            isRequired
            placeholder="Search By name, price or Category.."
            type={'text'}
            value={query}
            onChange={handleChange}
            bg="gray.700"
            color="white"
            mb={4}
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
      {
        menusItem?.length > 0 ? (
          <MenuList items={menusItem} query={query} handleChange={handleChange} />
        ) : (
          <NotFoundData
            label="Menu Item"
            redirectUrl="/add-item"
            subLabel="Maybe the item was deleted or does not exist."
            btnLabel="Add Item"
          />
        )
      }
      
    </LayoutWrapper>
  )
}

export default Menus