'use client';
import {
    Box,
    Container,
    Divider,
    Flex,
    Skeleton,
    SkeletonCircle,
    Stack
} from '@chakra-ui/react';

const UserDetailsCardSkeleton = () => {




    return (
        <Container maxW="5xl" p={0}>
            <Box
                maxW="5xl"
                mx="auto"
                boxShadow="0 8px 32px 0 rgba(31, 38, 135, 0.18)"
                border="1px solid"
                borderColor="rgba(31, 38, 135, 0.18)"
                p={{ base: 6, lg: 8 }}
                bg="rgba(22, 8, 8, 0.25)"
            >
                {/* Profile Skeleton */}
                <Flex direction={["column", "row"]} alignItems="center" mb={6} gap={4}>
                    <SkeletonCircle size="20" />
                    <Box>
                        <Skeleton height="20px" width="200px" mb={2} />
                        <Skeleton height="16px" width="250px" mb={1} />
                        <Skeleton height="16px" width="150px" />
                    </Box>
                </Flex>

                {/* Badge Skeletons */}
                <Stack direction="row" spacing={3} mb={4}>
                    <Skeleton height="24px" width="60px" />
                    <Skeleton height="24px" width="80px" />
                    <Skeleton height="24px" width="100px" />
                </Stack>

                <Divider my={3} />

                {/* Info Skeleton */}
                <Stack spacing={2} mb={3}>
                    <Skeleton height="18px" width="300px" />
                    <Skeleton height="18px" width="300px" />
                    <Skeleton height="18px" width="200px" />
                    <Skeleton height="18px" width="250px" />
                </Stack>

                <Divider my={3} />

                {/* Address section */}
                <Box>
                    <Skeleton height="20px" width="200px" mb={4} />
                    {[...Array(2)].map((_, index) => (
                        <Box key={index} p={3} mb={3} borderRadius="md" boxShadow="md">
                            <Skeleton height="18px" width="250px" mb={1} />
                            <Skeleton height="16px" width="90%" mb={1} />
                            <Skeleton height="16px" width="80%" mb={1} />
                            <Skeleton height="16px" width="60%" mb={1} />
                            <Skeleton height="16px" width="70%" mb={1} />
                            <Skeleton height="16px" width="50%" mb={1} />
                            <Skeleton height="16px" width="40%" mb={1} />
                            <Skeleton height="16px" width="60%" />
                        </Box>
                    ))}
                </Box>
            </Box>
        </Container>
    );
};

export default UserDetailsCardSkeleton;
