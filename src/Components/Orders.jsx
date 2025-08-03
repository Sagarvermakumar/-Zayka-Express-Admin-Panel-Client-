import { Badge, Box, Divider, Flex, Image, SimpleGrid, Text } from "@chakra-ui/react";
import LayoutWrapper from "../Layout/LayoutWrapper";

const Orders = ({ orders }) => {
  return (
    <LayoutWrapper>
  <Header title={"Customer Orders"} subtitle={"Track, manage, and update all food orders"} />

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
        {orders.map((order) => (
          <Box key={order._id} borderWidth="1px" borderRadius="lg" p={5} boxShadow="lg" bg="whiteAlpha.100">
            {/* User Info */}
            <Text fontSize="lg" fontWeight="bold">👤 {order.userID?.name}</Text>
            <Text fontSize="sm" color="gray.300">📞 {order.userID?.phoneNumber}</Text>

            {/* Address */}
            <Box mt={2}>
              <Text fontWeight="bold">📍 Address:</Text>
              <Text fontSize="sm">{order.deliveryAddressID?.label} - {order.deliveryAddressID?.addressLine}</Text>
              <Text fontSize="sm">{order.deliveryAddressID?.city}, {order.deliveryAddressID?.state}, {order.deliveryAddressID?.pinCode}</Text>
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
                  <Image src={itemWrap?.item?.image} alt={itemWrap?.item?.name} boxSize="60px" objectFit="cover" borderRadius="md" />
                  <Box>
                    <Text fontWeight="semibold">{itemWrap.item?.name}</Text>
                    <Text fontSize="sm" color="gray.400">Qty: {itemWrap?.quantity} | ₹{itemWrap.item?.price}</Text>
                  </Box>
                </Flex>
              ))}
            </Box>

            <Divider mt={3} />
            <Text mt={2} fontWeight="bold">Total: ₹{order.totalPrice}</Text>
          </Box>
        ))}
      </SimpleGrid>
      </LayoutWrapper>
  );
};



export default Orders