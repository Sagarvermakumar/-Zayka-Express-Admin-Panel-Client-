import { Box, Button, Container, Stack } from '@chakra-ui/react';
import { Undo } from 'lucide-react';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { FaMapMarkedAlt } from 'react-icons/fa';
import { MdBlockFlipped } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import NotFoundData from '../Components/NotFountData';
import UserDetailsCardSkeleton from '../Components/Skeletons/UserDetailsCardSkeleton';
import UserDetailsCard from '../Components/UserDetailsCard';
import { blockUser, getUserById, unblockUser } from '../features/users/userSlice';
import LayoutWrapper from '../Layout/LayoutWrapper';

const UserDetails = () => {

    const dispatch = useDispatch();
    const { id } = useParams();
    const { userDetails, isLoading, isLoadingChangeUserStatus } = useSelector((state) => state.user);

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


    return (
        <LayoutWrapper  >

            {
                isLoading ? <UserDetailsCardSkeleton /> : (<>
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
                                            Open Location in Map
                                        </Button>
                                        <Button
                                            leftIcon={userDetails.status === 'active' ? <MdBlockFlipped /> : <Undo />}
                                            size="sm"
                                            isLoading={isLoadingChangeUserStatus}
                                            // loadingText
                                            mt={3}
                                            onClick={handdleBlockUser}
                                        >
                                            {userDetails.status === 'active' ? 'Block' : 'Unblock'} User
                                        </Button>
                                 
                                    </Stack>
                                </Box>
                            </Container>

                        </>
                    ) : (
                        <NotFoundData
                            label="User"
                            subLabel="Maybe the User was deleted or does not exist."
                        />
                    )}
                </>)
            }
        </LayoutWrapper>
    );
}

export default UserDetails