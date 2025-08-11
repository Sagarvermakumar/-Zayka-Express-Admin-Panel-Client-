import { Badge, Box, Button, Flex, Image, SimpleGrid, Text, useDisclosure } from "@chakra-ui/react";
import { FileEdit, LucideDelete, ToggleLeft, ToggleRight } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteMenuItem, toggleMenuItemAvailability } from "../../features/Menu/menuSlice";
import ToggleMenuItemAvailabilityModal from "../Modals/ToggleMenuItemAvailabilityModal";

const MenuList = ({ items }) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();


  const [menuitemId, setMenuitemId] = useState('');
  const [currentAvailability, setCurrentAvailability] = useState(false)


const [deletingMenuItemId, setDeletingMenuItemId] = useState(null);

const handleDeleteMenuItem = async (id) => {
  setDeletingMenuItemId(id);
  try {
    await dispatch(deleteMenuItem(id)).unwrap();
  } catch (error) {
    console.error("Failed to delete menu item:", error);
  } finally {
    setDeletingMenuItemId(null);
  }
};

  const [togglingItemId, setTogglingItemId] = useState(null);

  const handleOpenToggleModal = (item) => {
    setMenuitemId(item._id);
    setCurrentAvailability(item.isAvailable);
    onOpen();
  };

  const handleToggleMenuItemAvailability = async () => {
    setTogglingItemId(menuitemId);
    try {
      await dispatch(toggleMenuItemAvailability(menuitemId, currentAvailability)).unwrap();
    } catch (error) {
      console.error("Failed to toggle item availability:", error);
    } finally {
      setTogglingItemId(null);
    }
  };



  return (


    <SimpleGrid columns={{ base: 1, sm: 1, md: 2, lg: 3 }} columnGap={8} rowGap={8}  >
      {items.map((item) => (
        <Box
          key={item._id}
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          boxShadow="lg"
          bg="blackAlpha.300"
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

          <Flex justify="start" gap={3} mt={4} flexDirection={{ sm: "column", md: "column", lg: "row" }} >
            <Button
              size="sm"
              px={4}
              leftIcon={<FileEdit size={'20px'} />}
              bg="gray.700"
              color="white"
              _hover={{ bg: "gray.600" }}
              onClick={() => navigate(`/menu/edit/${item._id}`)}
            >
              Edit
            </Button>

            <Button
              onClick={() => handleDeleteMenuItem(item._id)}
              leftIcon={<LucideDelete size={'20px'} />}
              size="sm"
              px={4}
              bg="red.700"
              color="white"
              isLoading={deletingMenuItemId === item._id}
              loadingText="Deleting..."
              _hover={{ bg: "red.600" }}
            >
              Delete
            </Button>

            <Button
              leftIcon={item.isAvailable ? <ToggleRight size={'22px'} /> : <ToggleLeft size={'22px'} />}
              size="sm"
              px={4}

              color="#fff"
              bg={ item.isAvailable ? "red.500" : "green"}
              border="1px solid"
              borderColor={item.isAvailable ? "red.400" : "darkgreen"}
              isLoading={togglingItemId === item._id}
              loadingText={item.isAvailable ? "Disabling..." : "Enabling..."}
              _hover={{
                bg: item.isAvailable ? "red.600" : "darkgreen",
                color: "white",
              }}
              onClick={() => handleOpenToggleModal(item)}
            >
            {  item.isAvailable ? "Available":"Unavailable"}
            </Button>
          </Flex>


        </Box>

      ))}

      {items && (
        <ToggleMenuItemAvailabilityModal
          isOpen={isOpen}
          onClose={onClose}
          currentAvailability={currentAvailability ? "available" : "unavailable"}
          onUpdate={handleToggleMenuItemAvailability}
        />
      )}

    </SimpleGrid>

  );
};


export default MenuList