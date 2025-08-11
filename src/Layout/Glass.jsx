'use client';

import { Box, Container } from '@chakra-ui/react';

const GlassLayout = ({ children }) => {
  return (
    <Box
      position="relative"
      bg="transparent"
      overflow="hidden"
      w="100%"
      h="100%"
    
    >
      {/* Blurred colored shapes */}
      <Box
        position="absolute"
        top="-100px"
        left="20%"
        w="250px"
        h="250px"
        bg="indigo"
        borderRadius="50%"
        filter="blur(120px)"
        zIndex={0}
        opacity={0.5}
      />

      <Box
        position="absolute"
        bottom="10%"
        right="-80px"
        w="280px"
        h="200px"
        bg="#f80"
        borderRadius="30px"
        filter="blur(100px)"
        zIndex={0}
        opacity={0.4}
      />

      <Box
        position="absolute"
        top="15%"
        right="-60px"
        w="250px"
        h="200px"
        bg="#00f0ff"
        borderRadius="30px"
        filter="blur(100px)"
        zIndex={0}
        opacity={0.3}
      />

      <Box
        position="absolute"
        top="20%"
        right="30%"
        w="200px"
        h="200px"
        bg="blue"
        borderRadius="50%"
        filter="blur(110px)"
        zIndex={0}
        opacity={0.5}
      />

      <Box
        position="absolute"
        bottom="-60px"
        left="0%"
        w="200px"
        h="250px"
        bg="#ff6b6b"
        borderRadius="50%"
        filter="blur(100px)"
        zIndex={0}
        opacity={0.35}
      />

      {/* Glass container */}
      <Container
        p={0}
        m={0}
        zIndex={1}
        maxW="100%"
        h="100%"
        backdropFilter="blur(25px)"
        bg={'transparent'}
        
    
      >
        {children}
      </Container>
    </Box>
  );
};

export default GlassLayout;
