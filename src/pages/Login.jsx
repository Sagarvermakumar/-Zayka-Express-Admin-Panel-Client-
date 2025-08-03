import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightAddon,
  Stack,
  Text,
  VStack
} from "@chakra-ui/react";
import { Eye, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaUserLock } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Header from "../Components/Heading";
import { loginAdmin } from "../features/auth/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secretKey, setSecretKey] = useState("")

  const [showPassword, setShowPassword] = useState(false)
  const [showSecretKey, setShowSecretKey] = useState(false)

  const handleLogin = async () => {
    if (!email || !password) {
      return toast.error(`Email or Password is required`)
    }



    dispatch(loginAdmin({ email, password, secretKey }));

    if (isAuthenticated) {
      toast.success("Login successful");
      navigate('/')
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);



  return (

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

        >
          <Stack display={'flex'} >

            <Header
              align={'center'}
              title={`Login As Admin`}
              subtitle="Welcome back! Please login to your account."
              Icon={
                <FaUserLock
                  size={45}
                  color="red"
                  style={{
                    paddingLeft: "15px"
                  }} />}
            />

          </Stack>
          <VStack spacing="4"
            minW={'400px'}
            maxW={'550px'}
          // w={'full'}
          >
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                isRequired
                autoComplete="email"

                placeholder="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                bg="gray.700"
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
            <FormControl>

              <FormLabel  >Password</FormLabel>
              <InputGroup>
                <Input
                  isRequired
                  placeholder="Password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  bg="gray.700"
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
                <InputRightAddon onClick={() => setShowPassword(showPassword => !showPassword)} bg={'gray.900'} _hover={{
                  bg: "gray.800"
                }}
                  _active={{
                    bg: "gray.800"
                  }}

                >
                  {
                    showPassword ? <Eye /> : <EyeOff />
                  }
                </InputRightAddon>
              </InputGroup>
            </FormControl>
        
              <FormControl>
                <FormLabel>Admin Secret Key </FormLabel>
                <InputGroup>

                  <Input
                    isRequired
                    placeholder="Enter Admin Secret Key"
                    type={showSecretKey ? "text" : "password"}
                    value={secretKey}
                    onChange={(e) => setSecretKey(e.target.value)}
                    bg="gray.700"
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
                    <InputRightAddon onClick={() => setShowSecretKey(showSecretKey => !showSecretKey)} bg={'gray.900'} _hover={{
                  bg: "gray.800"
                }}
                  _active={{
                    bg: "gray.800"
                  }}

                >
                  {
                    showPassword ? <Eye /> : <EyeOff />
                  }
                </InputRightAddon>
                </InputGroup>
              </FormControl>
            

            <Button
              colorScheme="red"
              width="full"
              isLoading={loading}
              onClick={handleLogin}
              boxShadow="md"
              border={'none'}
              outline={'none'}
              mt={4}
              bg={'rgba(234, 2, 2, 0.57)'}
              _hover={{
                bg: "rgba(234, 2, 2, 0.67)",
                boxShadow: "0 0 0 1px red.500",
              }}
            >
              Login
            </Button>
            {error && <Text color="red.300">{error}</Text>}
          </VStack>

          <Box mt="4" textAlign="center">
            <Text color="gray.200">or</Text>
          </Box>
          <Box />
          <Text mt="4" color="gray.600" fontWeight={'bold'} textAlign="center">
            Don't have an account?{" "}
            <Button as={Link} to="/register" variant="link">
              Register
            </Button>

          </Text>
        </Box>
    
    </Box>
  );
};

export default Login;
