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
import { useNavigate } from "react-router-dom";
import Header from "../Components/common/Heading";
import { loginAdmin } from "../features/auth/authSlice";
import GlassLayout from "../Layout/Glass";

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
<GlassLayout>
  <Box
    w="100%"
    minH="100vh"
    display="flex"
    justifyContent="center"
    alignItems="center"
    p={{ base: 4, md: 8 }}
  >
    <Stack
      w="100%"
      maxW="550px"
      borderRadius="md"
      boxShadow="dark-lg"
      p={{ base: 6, md: 8 }}
      spacing={6}
      bg="blackAlpha.500"
    >
      <Header
        title="Login As Admin"
        subtitle="Welcome back! Please login to your account."
      />

      <VStack spacing={6} w="100%">
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
              <FormLabel> Secret Key </FormLabel>
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
        </Stack>
      </Box>
    </GlassLayout>

  );
};

export default Login;
