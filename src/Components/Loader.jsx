// src/components/Loader.jsx
import { Spinner, Center } from "@chakra-ui/react";

const Loader = () => {
  return (
    <Center minH="100vh">
      <Spinner size="xl" thickness="4px" color="red.500" />
    </Center>
  );
};

export default Loader;
