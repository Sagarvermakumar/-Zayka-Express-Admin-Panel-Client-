import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  IconButton,
  Image,
  Input,
  Select,
  SimpleGrid,
  Stack,
  Text,
  VStack
} from "@chakra-ui/react";
import { useEffect, useState } from 'react';
import { FaPlus, FaRegImage } from "react-icons/fa6";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import Header from '../Components/common/Heading';
import { createMenuItem, editMenuItem, getMenuItemById } from "../features/Menu/menuSlice";
const AddMenuItems = () => {

  const dispatch = useDispatch()
  const { id } = useParams();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Appetizer",
    image: "",
    isVegetarian: false,
    isVegan: false,
  });

  const [previewUrl, setPreviewUrl] = useState("")



  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (e.target.type === "file") {
      const file = files[0];
      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onloadend = () => {
          setFormData((prev) => ({
            ...prev,
            image: file,
          }));

          setPreviewUrl(reader.result); // ✅ Corrected here
        };
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };



  const itemDetails = useSelector(state => state.menuItems.itemDetails)
  const isAddingItemLoader = useSelector(state => state.menuItems.isAddingItemLoader)



  useEffect(() => {
    if (id) {
      dispatch(getMenuItemById(id));
    }
  }, [id, dispatch]);
  useEffect(() => {
    if (itemDetails && Object.keys(itemDetails).length > 0) {
      setFormData({
        name: itemDetails.name || "",
        description: itemDetails.description || "",
        price: itemDetails.price || "",
        category: itemDetails.category || "",
        image: "", // user must re-upload
        isVegetarian: itemDetails.isVegetarian || false,
        isVegan: itemDetails.isVegan || false,
      });
      setPreviewUrl(itemDetails.image);
    }
  }, [itemDetails]);





  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("category", formData.category);
    data.append("image", formData.image); // ✅ File object
    data.append("isVegetarian", formData.isVegetarian);
    data.append("isVegan", formData.isVegan);

    if (id) {
      dispatch(editMenuItem({ id, data }))
    } else {
      dispatch(createMenuItem(formData))
      setFormData({
        name: "",
        description: "",
        price: "",
        category: "",
        image: "",
        isVegetarian: false,
        isVegan: false,
      });

      setPreviewUrl("");
    }
  };

  return (


    <Box
      maxW="6xl"
      p={{ base: 4, lg: 4 }}
      mt={4}
      mx={4}
      overflow={'hidden'}
    >
      <Header title={"Add New Menu"} subtitle={"Create and upload new dishes to your restaurant menu"} />



      <VStack spacing={6} align="stretch" as={'form'} onSubmit={handleSubmit} width={'full'}  >
        {/* Responsive grid: 3 cols on md+ */}

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
          {/* Image Upload */}
          <Box position="relative" w="100%" maxW="220px"  >
            {!formData.image ? (

              <FormLabel
                htmlFor="input"
                bg="rgba(0,0,0,0.2)"
                border="2px dashed #f80"
                borderRadius="md"
                py={8}
                px={4}
                textAlign="center"
                cursor="pointer"
                height={'150px'}
                _hover={{ bg: "rgba(0,0,0,0.4)", color: "white" }}
              >
                <Box w={'full'} h={'full'} display={'flex'} flexDir={'column'} justifyContent={'center'} alignItems={'center'} >
                  <FaRegImage size={'50px'} color="#f80" />
                  <Text mt={4} >Upload Image</Text>

                </Box>
                <Input
                  id="input"
                  name="imageUrl"
                  type="file"
                  accept="image/*"
                  onChange={handleChange}
                  display="none"
                />
              </FormLabel>
            ) : (
              // Show uploaded image with change icon
              <>
                <Image
                  src={previewUrl}
                  alt="Uploaded Preview"
                  objectFit="contain"
                  borderRadius="md"
                  boxShadow="md"
                  w="100%"
                  h="250px"

                />
                <FormLabel
                  htmlFor="input"
                  position="absolute"
                  top="-12px"
                  right="-22px"
                  // bg="whiteAlpha.800"
                  borderRadius="full"
                  p={2}
                  cursor="pointer"
                  boxShadow="sm"
                >
                  <IconButton id="input"
                    name="imageUrl"
                    type="file"
                    accept="image/*"
                    onChange={handleChange} variant={'contained'} borderRadius={'full'} bg={'gray.900'} color={'white'} >
                    <MdOutlineModeEditOutline size={'25px'} />
                  </IconButton>
                  <Input
                    id="input"
                    name="imageUrl"
                    type="file"
                    accept="image/*"
                    onChange={handleChange}
                    display="none"
                  />
                </FormLabel>
              </>
            )}
          </Box>
          {/* Name */}
          <FormControl isRequired>
            <FormLabel color="gray.200">Menu Name</FormLabel>
            <Input
              required
              placeholder="Enter name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              bg="rgba(0,0,0,0.2)"
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
            />
          </FormControl>

          {/* Description */}
          <FormControl isRequired>
            <FormLabel color="gray.200">Description</FormLabel>
            <Input
              required
              placeholder="Enter description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              bg="rgba(0,0,0,0.2)"
              color="white" _focus={{
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
              }} />
          </FormControl>

          {/* Price */}
          <FormControl isRequired>
            <FormLabel color="gray.200">Price (INR)</FormLabel>
            <Input
              required
              placeholder="e.g. 199"
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              bg="rgba(0,0,0,0.2)"
              color="white" _focus={{
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
              }} />
          </FormControl>

          {/* Category */}
          <FormControl isRequired>
            <FormLabel color="gray.200">Category</FormLabel>
            <Select
              required
              name="category"
              value={formData.category}
              onChange={handleChange}
              bg="rgba(0,0,0,0.2)"
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
              }}     >
              {["Appetizer", "Main Course", "Dessert"].map((cat) => (
                <option key={cat} value={cat} style={{ backgroundColor: "CaptionText" }} >
                  {cat}
                </option>
              ))}
            </Select>
          </FormControl>



          {/* Checkboxes */}
          <Box>
            <Text mb={2} fontWeight="bold" color="gray.300">Tags</Text>
            <Stack spacing={3} direction="row" flexWrap="wrap">
              <Checkbox
                colorScheme="green"
                name="isVegetarian"
                isChecked={formData.isVegetarian}
                onChange={(e) =>
                  setFormData({ ...formData, isVegetarian: e.target.checked })
                }
              >
                Vegetarian
              </Checkbox>
              <Checkbox
                colorScheme="teal"
                name="isVegan"
                isChecked={formData.isVegan}
                onChange={(e) =>
                  setFormData({ ...formData, isVegan: e.target.checked })
                }
              >
                Vegan
              </Checkbox>
            </Stack>
          </Box>
        </SimpleGrid>





        {
          id ? (<Button
            leftIcon={<FaPlus />}
            type="submit"
            isLoading={false}
            loadingText="Uploading Menu Item..."
            mb={4}
            ml={{ sm: 0, md: 4 }}
            width={{ sm: 'full', md: "fit-content" }}
          >Update Details
          </Button>) : (<Button
            leftIcon={<FaPlus />}
            type="submit"
            isLoading={isAddingItemLoader}
            loadingText="Adding..."
            mb={4}
            ml={{ sm: 0, md: 4 }}
            width={{ sm: 'full', md: "fit-content" }}
          >Add Item
          </Button>)
        }



      </VStack>






    </Box>

  )
}

export default AddMenuItems