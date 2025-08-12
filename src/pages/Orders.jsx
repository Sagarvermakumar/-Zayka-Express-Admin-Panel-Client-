import { Box, Input, Stack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EmptyState from '../Components/common/EmptyState';
import Header from '../Components/common/Heading';
import OrderList from '../Components/Lists/OrderList';
import OrdersSkeleton from '../Components/Skeletons/OrdersSkeleton';
import { getAllOrders } from '../features/orders/orderSlice';

const Orders = () => {
  const dispatch = useDispatch();
  const { orders, isLoadingAllOrders } = useSelector((state) => state.orders);

  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });

  useEffect(() => {
    dispatch(getAllOrders(selectedDate));
  }, [dispatch, selectedDate]);

  return (
    <Box >
      {/* Header + Date Picker */}
      <Stack
        justify={{ sm: "start", md: "start", lg: "space-between" }}
        alignItems={{ base: "start", md: "start", lg: "center" }}
        flexDir={{ base: 'column', md: 'column', lg: "row" }}
      >
        <Header title={"Customer Orders"} subtitle={"Track, manage, and update all food orders"} />
        <Input
          w={{ sm: "full", base: "full", md: '220px' }}
          isRequired
          autoComplete="date"
          mb={8}
          py={2}
          placeholder="Select Date"
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          bg="gray.700"
          color="white"
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

      {/* Orders List or Skeleton */}
      {isLoadingAllOrders ? (
        <OrdersSkeleton />
      ) : orders && orders.length > 0 ? (
        <OrderList items={orders} />
      ) : (
        <EmptyState
          label="Order"
          subLabel={`No orders found for ${selectedDate}. Please try a different date or check back later.`}
        />
      )}
    </Box>
  );
};

export default Orders;
