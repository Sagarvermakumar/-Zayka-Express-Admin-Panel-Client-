import { Badge, Box, Button, Divider, Flex, Image, SimpleGrid, Text, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteCancelledOrder, updateOrderStatus } from "../../features/orders/orderSlice";
import UpdateOrderStatusDialog from "../Modals/UpdateOrderStatusDialog";
import UserContact from "../UserContact";


const OrderList = ({ items }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch()
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [updatingOrderId, setUpdatingOrderId] = useState(null);
  const handleUpdateStatus = (order) => {
    setSelectedOrder(order);
    onOpen()
  }
  const [deletingOrderId, setDeletingOrderId] = useState(null);

  const handleDeleteOrder = async (id) => {
    setDeletingOrderId(id);
    try {
      await dispatch(deleteCancelledOrder(id)).unwrap();
    } catch (error) {
      console.error("Failed to delete order:", error);
    } finally {
      setDeletingOrderId(null);
    }
  };

  const handleStatusUpdate = async (newStatus) => {
    try {
      setUpdatingOrderId(selectedOrder._id)
      await dispatch(updateOrderStatus({ id: selectedOrder._id, status: newStatus })).unwrap()
    } catch (error) {
      console.error("Failed to update order:", error);
    } finally {
      setUpdatingOrderId(null); // update complete → loader stop
    }

  };
  return (

    <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
      {items.map((order) => (
        <Box
          key={order._id}
          borderWidth="1px"
          borderRadius="lg"
          p={5}
          boxShadow="lg"
          bg="whiteAlpha.100"
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          minHeight="550px"
        >
          {/* User Info */}
          <Text fontSize="lg" fontWeight="bold">👤 {order.userID?.name}</Text>
          {/* <Text fontSize="sm" color="gray.300">📞 {order.userID?.phoneNumber}</Text> */}
          <UserContact phoneNumber={order.userID?.phoneNumber} />

          {/* Address */}
          <Box mt={2}>
            <Text fontWeight="bold">📍 Address:</Text>
            <Text fontSize="sm">
              {order.deliveryAddressID?.label} - {order.deliveryAddressID?.addressLine}
            </Text>
            <Text fontSize="sm">
              {order.deliveryAddressID?.city}, {order.deliveryAddressID?.state}, {order.deliveryAddressID?.pinCode}
            </Text>
          </Box>

          {/* Status & Payment */}
          <Flex gap={4} mt={3} wrap="wrap">
            <Badge colorScheme={order.status === "confirmed" ? "green" : "orange"}>
              {order.status.toUpperCase()}
            </Badge>
            <Badge colorScheme="blue">{order.paymentMethod}</Badge>
            <Badge colorScheme="purple">₹{order.totalPrice}</Badge>
          </Flex>

          <Text mt={2} fontSize="sm" color="gray.400">
            Ordered at: {new Date(order.createdAt).toLocaleString()}
          </Text>
          <Text fontSize="sm" color="gray.400">
            Delivery by: {new Date(order.deliveryTime).toLocaleString()}
          </Text>

          {/* Items */}
          <Box mt={4}>
            <Text fontWeight="bold" mb={2}>🧾 Items:</Text>
            {order.items.map((itemWrap) => (
              <Flex key={itemWrap._id} gap={3} mb={3} align="center">
                <Image
                  src={itemWrap?.item?.image}
                  alt={itemWrap?.item?.name}
                  boxSize="60px"
                  objectFit="cover"
                  borderRadius="md"
                />
                <Box>
                  <Text fontWeight="semibold">{itemWrap.item?.name}</Text>
                  <Text fontSize="sm" color="gray.400">
                    Qty: {itemWrap?.quantity} | ₹{itemWrap.item?.price}
                  </Text>
                </Box>
              </Flex>
            ))}
          </Box>

          <Divider mt={3} />

          <Text mt={2} fontWeight="bold">Total: ₹{order.totalPrice}</Text>

          {/* Action Buttons */}
          <Flex mt={4} justify="space-between" wrap="wrap" gap={3}>
            <Button
              size="sm"
              colorScheme="teal"
              isLoading={updatingOrderId === order._id}
              loadingText="Updating..."
              onClick={() => handleUpdateStatus(order)}
            >
              Update Status
            </Button>
            <Button
              size="sm"
              colorScheme="red"
              onClick={() => handleDeleteOrder(order._id)}
              isLoading={deletingOrderId === order._id}
              loadingText="Deleting..."
            >
              Delete Order
            </Button>
          </Flex>
        </Box>
      ))}

      {selectedOrder && (
        <UpdateOrderStatusDialog
          isOpen={isOpen}
          onClose={onClose}
          currentStatus={selectedOrder.status}
          onUpdate={handleStatusUpdate}
        />
      )}
    </SimpleGrid>


  );
};




export default OrderList