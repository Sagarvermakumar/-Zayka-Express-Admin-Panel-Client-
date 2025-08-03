'use client';

import { Box, Container } from '@chakra-ui/react';

const GlassLayout = ({ children }) => {
  return (
    <Box
      position="relative"
      minH="100vh"
      bg="transparent"
      overflowX="hidden"


    >
      {/* Blurred colored shapes */}
      <Box
        position="absolute"
        top="-50px"
        left="-50px"
        w="300px"
        h="300px"
        bg="#ff0080"
        borderRadius="50%"
        filter="blur(120px)"
        zIndex={0}
        opacity={0.6}
      />
      <Box
        position="absolute"
        bottom="100px"
        right="-60px"
        w="300px"
        h="200px"
        bg="#f80"
        borderRadius="30px"
        filter="blur(100px)"
        zIndex={0}
        opacity={0.5}
      />
      <Box
        position="absolute"
        top="100px"
        right="-60px"
        w="300px"
        h="200px"
        bg="#311832"
        borderRadius="30px"
        filter="blur(100px)"
        zIndex={0}
        opacity={0.5}
      />
      <Box
        position="absolute"
        top="20%"
        right="30%"
        w="200px"
        h="200px"
        bg="blue"
        borderRadius="50%"
        filter="blur(100px)"
        zIndex={0}
        opacity={0.5}
      />

      {/* Glass container */}
      <Container
        p={0}
        zIndex={1}
        maxW="100vw"
        h={'100vh'}
        backdropFilter="blur(25px)"
      >
        {children}
      </Container>
    </Box>
  );
};

export default GlassLayout;
