'use client';

import { Box, Container } from '@chakra-ui/react';

const GlassLayout = ({ children }) => {
  return (
    <Box
      position="relative"
      bgGradient="linear(160deg, #000000ff, #0c0e0fff, #0b0c0cff)" // 🌌 Deep cyberpunk gradient
      overflow="hidden"
      w="100%"
      h="100%"
    >
      {/* 🔮 Neon Glow Shapes */}
      <Box
        position="absolute"
        top="-80px"
        left="15%"
        w="300px"
        h="300px"
        bg="#ff00a6" // Neon Pink
        borderRadius="50%"
        filter="blur(140px)"
        opacity={0.4}
        zIndex={0}
      />

      <Box
        position="absolute"
        bottom="10%"
        right="-50px"
        w="350px"
        h="250px"
        bg="#f80" // Neon Cyan
        borderRadius="full"
        filter="blur(100px)"
        opacity={0.25}
        zIndex={0}
      />

      <Box
        position="absolute"
        top="10%"
        right="60px"
        w="280px"
        h="200px"
        bg="#8a2be2" // Neon Purple
       borderRadius="50%"
        filter="blur(140px)"
        opacity={0.4}
        zIndex={0}
      />

      <Box
        position="absolute"
        bottom="60px"
        left="20%"
        w="180px"
        h="180px"
        bg="blue"  // Neon Orange
   borderRadius="50%"
        filter="blur(140px)"
        opacity={0.4}
        zIndex={0}
      />

      {/* 🌫️ Glass Container */}
      <Container
        p={0}
        m={0}
        zIndex={1}
        maxW="100%"
        h="100%"
        backdropFilter="blur(40px) saturate(200%)" // stronger blur for dark theme
        bg="rgba(21, 14, 14, 0.38)" // subtle frosted white overlay
      >
        {children}
      </Container>
    </Box>
  );
};

export default GlassLayout;
