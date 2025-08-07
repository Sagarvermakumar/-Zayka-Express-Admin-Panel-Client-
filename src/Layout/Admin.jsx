import React from 'react';
import Sidebar from '../Components/Global/Sidebar.jsx';
import { Outlet } from 'react-router-dom';
import GlassLayout from './Glass.jsx';
import { Box, Flex } from '@chakra-ui/react';

const Admin = () => {
  return (
    <Flex height="100vh" overflow="hidden">
      {/* Sidebar fixed on the left */}
      <Box width="320px" height="100vh" overflow="hidden">
        <Sidebar />
      </Box>

      {/* Main Content Area */}
      <Box flex="1" height="100vh" overflowY="auto"  >
        <GlassLayout>
          <Outlet />
        </GlassLayout>
      </Box>
    </Flex>
  );
};

export default Admin;
