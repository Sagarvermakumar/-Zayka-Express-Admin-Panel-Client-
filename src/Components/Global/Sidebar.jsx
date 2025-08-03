'use client'

import {
  Avatar,
  Box,
  CloseButton,
  Drawer,
  DrawerContent,
  Flex,
  Icon,
  IconButton,
  useDisclosure,
} from '@chakra-ui/react'
import { FiMenu, FiChevronDown, FiChevronRight } from 'react-icons/fi'
import { Link, Outlet, useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useState } from 'react'
import { adminLinkItems } from '../../assets/assets'
import { useSelector } from 'react-redux'

// ✅ Sidebar Main Component
export default function Sidebar({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Box minH="100vh" bg="transparent"
    >
      <SidebarContent onClose={onClose} display={{ base: 'none', md: 'block' }} />

      <Drawer isOpen={isOpen} placement="left" onClose={onClose} size="full">
        <DrawerContent bg={'rgba(0,0,0,0.6)'} pb={4}
          backdropFilter='blur(8px) hue-rotate(10deg)'  >
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>

      <MobileNav onOpen={onOpen} display={{ base: 'flex', md: 'none' }} />

      <Box ml={{ base: 0, md: 60 }} p={{ base: 0, md: 4 }} >
        {children || <Outlet />}
      </Box>
    </Box>
  )
}

Sidebar.propTypes = {
  children: PropTypes.node,
}

// ✅ SidebarContent with Nested Menus
const SidebarContent = ({ onClose, ...rest }) => {
  const location = useLocation()
  const [openMenu, setOpenMenu] = useState(null)

  const handleToggle = (menuName) => {
    setOpenMenu((prev) => (prev === menuName ? null : menuName))
  }

  return (
    <Box
      bg="#09090965"
      overflow="hidden"
      borderRight="1px"
      borderRightColor="gray.700"
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="100vh"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} bg={'red'} boxShadow={'1px 1px 20px 10px rgba(246, 237, 237, 0.1)'} />
      </Flex>

      {adminLinkItems.map((link) => (
        <Box key={link.name}>
          {link.children ? (
            <>
              <Flex
                align="center"
                p="3"
                pl="4"
                mx="4"
                borderRadius="md"
                color={location.pathname.startsWith(link.path) ? 'red.400' : 'gray.400'}
                _hover={{ color: '#fff', bg: 'rgba(0,0,0,0.2)' }}
                cursor="pointer"
                onClick={() => handleToggle(link.name)}
              >
                {link.icon && <Icon mr="3" fontSize="16" as={link.icon} />}
                {link.name}
                <Icon
                  ml="auto"
                  as={openMenu === link.name ? FiChevronDown : FiChevronRight}
                />
              </Flex>

              {openMenu === link.name &&
                link.children.map((child) => (
                  <NavItem
                    key={child.name}
                    icon={child.icon}
                    path={child.path}
                    isActive={location.pathname === child.path}
                    onClick={onClose}
                    pl="8"
                  >
                    {child.name}
                  </NavItem>
                ))}
            </>
          ) : (
            <NavItem
              icon={link.icon}
              path={link.path}
              isActive={location.pathname === link.path}
              onClick={onClose}
            >
              {link.name}
            </NavItem>
          )}
        </Box>
      ))}
    </Box>
  )
}

SidebarContent.propTypes = {
  onClose: PropTypes.func.isRequired,
}

// ✅ NavItem for Sidebar Links
const NavItem = ({ icon, children, path, isActive, pl = "4", ...rest }) => {
  return (
    <Link to={path} style={{ textDecoration: 'none' }}>
      <Flex
        align="center"
        p="3"
        pl={pl}
        mx="4"
        fontFamily={'monospace'}
        fontSize={'2xl'}
        borderRadius="md"
        color={isActive ? '#f80' : 'gray.100'}
        bg={isActive ? 'rgba(0,0,0,0.4)' : 'transparent'}
        _hover={{ color: '#ffffff', bg: 'rgba(0,0,0,0.4)', fontWeight: 700, }}
        cursor="pointer"
        {...rest}
      >
        {icon && <Icon mr="3" fontSize="16" as={icon} />}
        {children}
      </Flex>
    </Link>
  )
}

NavItem.propTypes = {
  icon: PropTypes.any,
  children: PropTypes.node.isRequired,
  path: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
  pl: PropTypes.any,
}

// ✅ Mobile Navigation Bar
const MobileNav = ({ onOpen, ...rest }) => {
  const { user } = useSelector((state) => state.auth);
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 6 }}
      height="20"
      alignItems="center"
      bg="gray.900"
      borderBottomWidth="1px"
      borderBottomColor="gray.700"
      justifyContent="space-between"
      w="100%"
      {...rest}
    >
      <IconButton
        variant="ghost"
        onClick={onOpen}
        aria-label="open menu"
        icon={<FiMenu />}
        _hover={{ bg: 'rgba(0,0,0,0.2)' }}
      />
      <Avatar src={user?.avatar || ''} name={user?.name || ''} />
    </Flex>
  )
}

MobileNav.propTypes = {
  onOpen: PropTypes.func.isRequired,
}
