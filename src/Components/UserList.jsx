import { SimpleGrid, Badge,
  Flex,
  IconButton,
  Text,
  Tooltip ,
  Box,
  
} from '@chakra-ui/react'
import React from 'react'
import { MdOpenInNew } from 'react-icons/md'
import { Link } from 'react-router-dom'

const UserList = ({usersList}) => {
  return (
       <SimpleGrid columns={[1, 1, 3]} spacing={{ base: 8, md: 6 }} mb={8}>
            {usersList.map((user) => (
              <Link to={`/users/${user._id}`} key={user._id}>
                <Box
                  key={user._id}
                  bg={'#0101017d'}
                  p={4}
                  borderLeft="4px solid"
                  borderTopLeftRadius={'base'}
                  borderBottomLeftRadius={'base'}
                  borderColor={user.role === 'Admin' ? '#f80' : '#ff0080'}
                >
                  <Flex justify="space-between" align="center" mb={2}>
                    <Text fontWeight="bold" fontSize="lg">
                      {user.name}
                    </Text>
                    <Flex gap={2}>
                      <Tooltip label="View Details" fontSize="md">
                        <IconButton
                          icon={<MdOpenInNew />}
                          size="sm"
                          colorScheme="yellow"
                          aria-label="Edit"
                        />
                      </Tooltip>
                    </Flex>
                  </Flex>

                  <Text fontSize="sm" color="gray.400" mb={1}>
                    {user.email}
                  </Text>
                  <Text fontSize="sm" mb={3}>
                    📞 {user.phoneNumber}
                  </Text>

                  <Flex gap={2} wrap="wrap">
                    <Badge colorScheme={user.role === 'Admin' ? 'purple' : 'blue'}>
                      {user.role}
                    </Badge>
                    <Badge colorScheme={user.status === 'active' ? 'green' : 'red'}>
                      {user.status}
                    </Badge>
                    <Badge colorScheme={user.isVerified ? 'green' : 'yellow'}>
                      {user.isVerified ? 'Verified' : 'Not Verified'}
                    </Badge>
                  </Flex>
                </Box>
              </Link>
            ))}
          </SimpleGrid>
  )
}

export default UserList