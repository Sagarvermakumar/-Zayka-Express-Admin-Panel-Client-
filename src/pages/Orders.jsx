import { Badge, Box, ButtonGroup, Center, CloseButton, Heading, IconButton, Stack, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { useEffect } from 'react';
import { FaAdjust } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../Components/Heading';
import { getAllOrders } from '../features/orders/orderSlice';
import LayoutWrapper from '../Layout/LayoutWrapper';
import OrderList from '../Components/Orders'
import NotFoundData from '../Components/NotFountData';
const Orders = () => {

  const dispatch = useDispatch()
  const { orders } = useSelector((state) => state.orders);

  console.log("orders : ", orders)
  useEffect(() => {
    dispatch(getAllOrders())
  }, [dispatch])
  return (
    <>
      {
        orders?.length > 0 ? (
          <OrderList items={orders} />
        ) : (
          <NotFoundData
            label="Order"
            subLabel="Maybe the Order  was deleted or does not exist."
          />
        )
      }
    </>
  )
}

export default Orders