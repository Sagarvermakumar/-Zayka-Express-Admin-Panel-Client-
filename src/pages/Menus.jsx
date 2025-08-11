import { Input, Stack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EmptyState from '../Components/common/EmptyState';
import Header from '../Components/common/Heading';
import MenuList from '../Components/Lists/MenuList';
import MenuSkeleton from '../Components/Skeletons/MenuSkeleton'; // 👈 new skeleton import
import { getAllMenuItems } from '../features/Menu/menuSlice';

const Menus = () => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const { menusItem, isGettingItemLoader } = useSelector(state => state.menuItems); // 👈 loading state for fetching menus

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    dispatch(getAllMenuItems(query));
  }, [dispatch, query]);

  return (
    <>
      {/* Header + Search Input */}
      <Stack
        justify={{ sm: "start", md: "start", lg: "space-between" }}
        alignItems={{ base: "start", md: "start", lg: "center" }}
        flexDir={{ base: 'column', md: 'column', lg: "row" }}
      >
        <Header title={"All Menu Items"} subtitle={"Browse and manage all available food items"} />
        <Input
          isRequired
          placeholder="Search by name, price or category..."
          type="text"
          value={query}
          onChange={handleChange}
          bg="gray.700"
          color="white"
      
          py={4}
          w={{ base: 'full', md: "full", lg: "220px" }}
          _focus={{
            borderColor: "red.500",
            borderWidth: "2px",
            boxShadow: "0 0 0 1px red",
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

      {/* Menu List / Skeleton / No Data */}
      {isGettingItemLoader ? (
        <MenuSkeleton />
      ) : menusItem?.length > 0 ? (
        <MenuList items={menusItem} query={query} handleChange={handleChange} />
      ) : (
        <EmptyState
          label="Menu Item"
          redirectUrl="/add-item"
          subLabel="Maybe the item was deleted or does not exist."
          btnLabel="Add Item"
        />
      )}
    </>
  );
};

export default Menus;
