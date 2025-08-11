import { Box,Stack,Button } from '@chakra-ui/react';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { FaMapMarkedAlt } from 'react-icons/fa';
import { MdBlockFlipped } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import EmptyState from '../Components/common/EmptyState';
import UserDetailsCardSkeleton from '../Components/Skeletons/UserDetailsCardSkeleton';
import UserDetailsCard from '../Components/UserDetailsCard';
import { blockUser, getUserById, unblockUser } from '../features/users/userSlice';
import { Undo } from 'lucide-react';
const UserDetails = () => {
    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        dispatch(getUserById(id));
    }, [dispatch, id]);

    const { userDetails, isLoading, isLoadingChangeUserStatus } = useSelector((state) => state.user);


    const openInGoogleMaps = () => {
        if (userDetails.address && userDetails.address.length > 0) {
            const { latitude, longitude } = userDetails.address[0].geo;
            const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
            window.open(url, '_blank');
        } else {
            toast.error('No address found for this user.');
        }
    };

    const handdleBlockUser = () => {
        if (userDetails.status === 'active') {
            dispatch(blockUser(userDetails._id));
        } else {
            dispatch(unblockUser(userDetails._id));

        }
    };

    return (
        <>
            {isLoading ? (
                <UserDetailsCardSkeleton />
            ) : (
                <>
                    {userDetails ? (
                        <>
                            <Box p={0}>
                                {/* User Details Card */}
                                <UserDetailsCard user={userDetails} />

                                {/* Buttons Box */}
                                <Box
                                    w="100%"
                                    mt={4}
                                    p={{ base: 4, lg: 6 }}
                                    bg="rgba(22, 8, 8, 0.25)"
                                >
                                    <Stack
                                        spacing={3}
                                        direction={{ base: 'column', md: 'row' }}
                                        justify={{ base: 'center', md: 'flex-start' }}
                                        align="center"
                                    >
                                        <Button
                                            leftIcon={<FaMapMarkedAlt />}
                                            colorScheme="blue"
                                            size="sm"
                                            onClick={openInGoogleMaps}
                                        >
                                            Open Location in Map
                                        </Button>
                                        <Button
                                            leftIcon={
                                                userDetails?.status === 'active' ? <MdBlockFlipped /> : <Undo />
                                            }
                                            size="sm"
                                            isLoading={isLoadingChangeUserStatus}
                                            onClick={handdleBlockUser}
                                        >
                                            {userDetails?.status === 'active' ? 'Block' : 'Unblock'} User
                                        </Button>
                                    </Stack>
                                </Box>
                            </Box>

                        </>
                    ) : (
                        <EmptyState
                            label="User"
                            subLabel="Maybe the User was deleted or does not exist."
                        />
                    )}
                </>
            )}
        </>
    );
};

export default UserDetails;
