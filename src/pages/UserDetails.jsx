import { Box, Button, Container, Stack, Text } from '@chakra-ui/react';
import { Undo } from 'lucide-react';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { FaMapMarkedAlt } from 'react-icons/fa';
import { FaUserXmark } from 'react-icons/fa6';
import { MdBlockFlipped } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import UserDetailsCard from '../Components/UserDetailsCard';
import { blockUser, deleteUserProfile, getUserById, unblockUser } from '../features/users/userSlice';

const UserDetails = () => {

    const dispatch = useDispatch();
    const { id } = useParams();
    const { userDetails } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(getUserById(id))
    }, [dispatch, id])
    const openInGoogleMaps = () => {
        if (userDetails.address && userDetails.address.length > 0) {
            const { latitude, longitude } = userDetails.address[0].geo;
            const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
            window.open(url, '_blank');
        } else {
            toast.error("No address found for this user.");
        }
    };


    const handdleBlockUser = () => {
        if (userDetails.status === 'active') {
            // Call block user API
            dispatch(blockUser(userDetails._id));
        } else {
            // Call unblock user API
            dispatch(unblockUser(userDetails._id));
        }

    };

    const handleDeleteProfile = () => {

        dispatch(deleteUserProfile(userDetails._id)); // Assuming deleteUser is an action creator
        // Call delete user API
        toast.success("User Profile Deleted Successfully");
    };
    return (
        <Box p={4} bg={'transparent'} >
            {userDetails ? (
                <>
                    <UserDetailsCard user={userDetails} />
                    <Container maxW="5xl" p={0}
                    >

                        <Box
                            maxW="5xl"
                            mx="auto"
                            boxShadow="0 8px 32px 0 rgba(31, 38, 135, 0.18)"
                            border={'1px solid'}
                            borderColor={'rgba(31, 38, 135, 0.18)'}
                            p={{ base: 2, lg: 4 }}
                            bg="rgba(22, 8, 8, 0.25)"
                        >
                            <Stack spacing={3} flexDir={{ base: "column", lg: "row" }} >

                                <Button
                                    leftIcon={<FaMapMarkedAlt />}
                                    colorScheme="blue"
                                    size="sm"
                                    mt={3}
                                    onClick={openInGoogleMaps}
                                >
                                    Open in Maps
                                </Button>
                                <Button
                                    leftIcon={userDetails.status === 'active' ? <MdBlockFlipped /> : <Undo />}
                                    size="sm"
                                    mt={3}
                                    onClick={handdleBlockUser}
                                >
                                    {userDetails.status === 'active' ? 'Block' : 'Unblock'} User
                                </Button>
                                <Button
                                    leftIcon={<FaUserXmark />}
                                    size="sm"
                                    mt={3}
                                    onClick={handleDeleteProfile}
                                >
                                    Delete Profile
                                </Button>
                            </Stack>
                        </Box>
                    </Container>

                </>
            ) : (
                <Box textAlign="center" p={4}>
                    <Text fontSize="xl" color="gray.500">Loading User Details...</Text>
                </Box>
            )}
        </Box>
    );
}

export default UserDetails