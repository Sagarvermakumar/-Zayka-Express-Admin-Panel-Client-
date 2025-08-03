'use client';
import {

    Badge,
    Box,
    Divider,
    Flex,
    Stack,
    Text,
    Container
} from '@chakra-ui/react';
import ProfilePictureUpdater from './ProfilePictureUpdater';

const UserDetailsCard = ({ user }) => {

console.log(user)


    return (
        <Container maxW="5xl" p={0}
        >

            <Box
                maxW="5xl"
                mx="auto"
                boxShadow="0 8px 32px 0 rgba(31, 38, 135, 0.18)"
                border={'1px solid'}
                borderColor={'rgba(31, 38, 135, 0.18)'}
                p={{ base: 6, lg: 8 }}
                bg="rgba(22, 8, 8, 0.25)"
            >
                <Flex direction={["column", "row"]} alignItems="center" mb={6} gap={4}>
                    <ProfilePictureUpdater name={user?.name} avatar={user?.avatar?.url} />
                    <Box>
                        <Text fontSize="2xl" fontWeight="bold">{user.name}</Text>
                        <Text color="gray.500" fontSize="sm">{user.email}</Text>
                        <Text fontSize="sm">📱 {user.phoneNumber}</Text>
                    </Box>
                </Flex>

                <Stack direction="row" spacing={3} mb={4}>
                    <Badge px={4} py={1} colorScheme={user.role === 'Admin' ? 'purple' : 'blue'}>
                        {user.role}
                    </Badge>
                    <Badge colorScheme={user.status === 'active' ? 'green' : 'red'}>
                        {user.status}
                    </Badge>
                    <Badge colorScheme={user.isVerified ? 'green' : 'yellow'}>
                        {user.isVerified ? 'Verified' : 'Not Verified'}
                    </Badge>
                </Stack>

                <Divider my={3} />

                <Stack spacing={1} mb={3}>
                    <Text><b>Referral Code:</b> {user.referralCode}</Text>
                    <Text><b>Referred By:</b> {user.referredBy || 'N/A'}</Text>
                    <Text><b>Wallet Balance:</b> ₹{user.walletBalance}</Text>
                    <Text><b>Created At:</b> {new Date(user.createdAt).toLocaleString()}</Text>
                </Stack>

                <Divider my={3} />

                <Box>
                    <Text fontWeight="bold" mb={2}>📍 Address Details</Text>

                    {user.address && user.address.length > 0 ? (
                        user.address.map((addr, index) => (
                            <Box key={index} fontSize="md" p={3} mb={3} bg="transparent" borderRadius="md" boxShadow="md">
                                <Text fontWeight="bold">🏷️ Label: {addr.label}</Text>
                                <Text><b>Address:</b> {addr.addressLine}</Text>
                                <Text><b>Landmark:</b> {addr.landmark?.join(', ') || 'N/A'}</Text>
                                <Text><b>City:</b> {addr.city}</Text>
                                <Text><b>State:</b> {addr.state}</Text>
                                <Text><b>Country:</b> {addr.country}</Text>
                                <Text><b>Pin Code:</b> {addr.pinCode}</Text>
                                <Text><b>Geo:</b> {addr.geo?.latitude || 'N/A'}, {addr.geo?.longitude || 'N/A'}</Text>
                            </Box>
                        ))
                    ) : (
                        <Box fontSize="md" p={3} >
                            <Text fontWeight="bold">🏷️ Label: No Address Found</Text>
                        </Box>
                    )}
                </Box>



            </Box>
        </Container>
    );
};

export default UserDetailsCard;
