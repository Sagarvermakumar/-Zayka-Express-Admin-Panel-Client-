import { Box, Image, Text, Badge, SimpleGrid, Flex, Button } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { deleteMenuItem } from "../features/Menu/menuSlice";
import { useNavigate } from "react-router-dom";
import LayoutWrapper from "../Layout/LayoutWrapper";
import Header from "./Heading";

const AdminFoodItems = ({ items }) => {

  const dispatch = useDispatch();
  const navigate = useNavigate()


  const handleDeleteMenuItem = id => {
    dispatch(deleteMenuItem(id))
  }



  return (

    <LayoutWrapper>
      <Header title={"All Menu Items"} subtitle={"Browse and manage all available food items"} />

      <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={6}>
        {items.map((item) => (
          <Box
            key={item._id}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            boxShadow="lg"
            bg="whiteAlpha.100"
            p={4}
          
          >
            <Image
              src={item.image}
              alt={item.name}
              objectFit="fill"
              width="100%"
              height="250px"
              borderRadius="md"
              mb={3}
            />

            <Flex justify="space-between" align="center" mb={2}>
              <Text fontSize="xl" fontWeight="bold">{item.name}</Text>
              <Badge colorScheme="green">₹{parseInt(item.price)}</Badge>
            </Flex>

            <Text fontSize="sm" color="gray.300" mb={2}>{item.category}</Text>
            <Text fontSize="sm" mb={2}>{item.description}</Text>

            <Flex flexWrap="wrap" gap={2} mb={3}>
              {item.isVegetarian && <Badge colorScheme="green">Vegetarian</Badge>}
              {item.isVegan && <Badge colorScheme="purple">Vegan</Badge>}
              {item.isAvailable ? (
                <Badge colorScheme="green">Available</Badge>
              ) : (
                <Badge colorScheme="red">Unavailable</Badge>
              )}
            </Flex>

            <Flex justify="space-between" mt={3}>
              <Button size="sm" colorScheme="blue" onClick={() => navigate(`/menu/edit/${item._id}`)} >Edit</Button>
              <Button size="sm" colorScheme="red" onClick={() => handleDeleteMenuItem(item._id)} >Delete</Button>
            </Flex>
          </Box>
        ))}
      </SimpleGrid>
    </LayoutWrapper>

  );
};

export default AdminFoodItems;
