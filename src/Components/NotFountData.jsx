import React from 'react';
import { Box, Button, Heading, Text, VStack } from '@chakra-ui/react';
import { FileX } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const NotFoundData = ({ label = "Page", redirectUrl = "/", subLabel, btnLabel="Go Back" }) => {
  const navigate = useNavigate();

  return (
     <Box
      minH="full"
      height={'75vh'}
      p={6}
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDir={"column"}
      overflow={'hidden'}
      pos={'relative'}




    >
        <Box

          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDir={"column"}
          p={8}
          bg={'transparent'}
          // mx={4}
          bgGradient={'linear(145deg, #13131333, #10101029)'}
          boxShadow={" 5px 5px 9px #0a0a0a,      -5px -5px 9px #1a1a1a"}
          borderRadius={"8px"}

        >
        <VStack spacing={6}>
          <FileX size={48} color="white" />
          <Heading fontSize="2xl" color="whiteAlpha.900">
            {label} Not Found
          </Heading>
          {subLabel && (
            <Text fontSize="sm" color="gray.400">
              {subLabel}
            </Text>
          )}
          <Button
            colorScheme="red"
            variant="outline"
            onClick={() => navigate(redirectUrl)}
          >
           {btnLabel}
          </Button>
        </VStack>
      </Box>
    </Box>
  );
};

export default NotFoundData;
