import { Box, Button, Heading, Text } from '@chakra-ui/react';
import { MdOutlineErrorOutline } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import GlassLayout from '../../Layout/Glass';

const Unauthorized = () => {
    const navigate = useNavigate()
    const user = useSelector((state) => state.auth.user);
    const handleBackToHome = () => {

        // Navigate to the home page or any other page
        if (user.role === "Admin") {
            navigate("/admin");
        } else if (user.role === "Vendor") {
            navigate("/vendor");
        }

    };



    return (
        <GlassLayout>
                <Box
                    minH="full"
                    height={'100vh'}
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
                        gap={8}
              
                      >
                        {/* Warning Icon */}
                        {/* <MediaError/> */}
                        <MdOutlineErrorOutline size={65} />
                        {/* Heading */}
                        <Heading size="lg" color="gray.100">
                            Unauthorized Access
                        </Heading>

                        {/* Description */}
                        <Text color="gray.600" fontSize="md">

                            Access Denied! Only Admin Can Access This Route 🙏

                        </Text>

                        {/* Go to Home Button */}
                        <Button
                            colorScheme="red"
                            variant="solid"
                            onClick={handleBackToHome}
                        >
                            Go to Home
                        </Button>
                    </Box>
                </Box>
        </GlassLayout>
    );
};




export default Unauthorized