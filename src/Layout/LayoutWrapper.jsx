// src/components/LayoutWrapper.jsx
import { Box, Container } from "@chakra-ui/react";
import PropTypes from "prop-types";

const LayoutWrapper = ({ children }) => {
  return (
    <Box
      minH="95vh"
      
    >
      <Container maxW="container.xl">
        {children}
      </Container>
    </Box>
  );
};



LayoutWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LayoutWrapper;
