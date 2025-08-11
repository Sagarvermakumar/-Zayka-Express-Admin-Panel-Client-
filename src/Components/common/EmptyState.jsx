import { Box, Button, Heading, Icon, Text, VStack } from '@chakra-ui/react';
import { FileX } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const EmptyState = ({
  label = "Page",
  redirectUrl = "/",
  subLabel,
  btnLabel = "Go Back",
  icon = FileX
}) => {
  const navigate = useNavigate();

  return (
    <Box
      minH="70vh"
      px={{ base: 4, md: 6 }}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDir="column"
        p={{ base: 6, md: 8 }}
        textAlign="center"
        bgGradient="linear(145deg, #13131333, #10101029)"
        boxShadow="5px 5px 9px #0a0a0a, -5px -5px 9px #1a1a1a"
        borderRadius="md"
        maxW={{ base: "90%", sm: "400px" }}
        w="full"
      >
        <VStack spacing={{ base: 4, md: 6 }}>
          <Icon
            as={icon}
            boxSize={{ base: 10, md: 12 }}
            color="white"
            aria-hidden
          />
          <Heading
            fontSize={{ base: "lg", md: "2xl" }}
            color="whiteAlpha.900"
          >
            {label} Not Found
          </Heading>
          {subLabel && (
            <Text
              fontSize={{ base: "sm", md: "md" }}
              color="gray.400"
              px={{ base: 2, md: 0 }}
            >
              {subLabel}
            </Text>
          )}
          <Button
            colorScheme="red"
            variant="outline"
            size={{ base: "sm", md: "md" }}
            onClick={() => navigate(redirectUrl)}
          >
            {btnLabel}
          </Button>
        </VStack>
      </Box>
    </Box>
  );
};

export default EmptyState;
