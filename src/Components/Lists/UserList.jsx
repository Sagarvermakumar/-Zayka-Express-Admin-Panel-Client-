import {
  Badge,
  Box,
  Flex,
  IconButton,
  SimpleGrid,
  Text,
  Tooltip,
  useDisclosure
} from '@chakra-ui/react'
import { useState } from 'react'
import { toast } from "react-hot-toast"
import { MdDeleteForever, MdEditDocument, MdOpenInNew } from 'react-icons/md'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteUserProfile } from '../../features/users/userSlice'
import DeleteUserProfileModal from '../Modals/DeleteUserProfileModal'

const UserList = ({ usersList }) => {

  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const [user, setUser] = useState(null)
  const handleRoleUpdate = () => {
    toast.error("⚠️ Role edit feature is currently unavailable. ")
  }
  const handleOpenDeleteModal = userDetails => {
    setUser(userDetails)
    onOpen()
  }
  const handleDeleteProfile = () => {
    dispatch(deleteUserProfile(user._id))

  }
  return (
    <SimpleGrid  columns={[1, 1, 2, 3]} spacing={{ base: 6, md: 8 }} mb={8}>
      {usersList.map((user) => (

        <Box
          key={user._id}
          bg="blackAlpha.300"
          p={6}

          borderLeft="4px solid"
          borderTopLeftRadius={'base'}
          borderBottomLeftRadius={'base'}
          borderColor={user.role === 'Admin' ? '#f80' : '#ff0080'}
          boxShadow={'dark-lg'}
        >
          <Flex justify="space-between" align="center" mb={1}>
            <Text fontWeight="bold" fontSize="lg">
              {user.name}
            </Text>
            <Flex gap={2}>
              <Tooltip label="Change Role">
                <IconButton
                  icon={<MdEditDocument size={'18px'} />}
                  size="sm"
                  variant="ghost"
                  colorScheme="blue"
                  onClick={handleRoleUpdate}
                  aria-label="Edit Role"
                />
              </Tooltip>
              <Tooltip label={`${user?.name}'s Delete Profile`}>
                <IconButton
                  icon={<MdDeleteForever size={'18px'} />}
                  size="sm"
                  variant="ghost"
                  colorScheme="blue"
                  onClick={() => handleOpenDeleteModal(user)}
                  aria-label="Edit Role"
                />
              </Tooltip>
              <Link to={`/users/${user._id}`} key={user._id}>
                <Tooltip label="View Details" fontSize="md">
                  <IconButton
                    icon={<MdOpenInNew size={'18px'} />}
                    size="sm"
                    colorScheme="yellow"
                    aria-label="Edit"
                  />
                </Tooltip>
              </Link>

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

      ))}
      {user && (
        <DeleteUserProfileModal
          isOpen={isOpen}
          onClose={onClose}
          onDelete={handleDeleteProfile}
          userName={user.name}
        />
      )}
    </SimpleGrid>
  )
}

export default UserList