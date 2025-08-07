// src/components/LayoutWrapper.jsx
import { Box, Flex } from "@chakra-ui/react";
import PropTypes from "prop-types";

const LayoutWrapper = ({ children }) => {
  return (
    <Flex
      minHeight="100vh"
      width="100%"
      justify="center"
      align="center"
      
        
      p={{sm:4,md:8}}   
    >
      <Box width="100%" maxW="8xl"    mb={8}>
        {children}
      </Box>
    </Flex>
  );
};

LayoutWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LayoutWrapper;
