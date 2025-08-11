import React from 'react';
import Sidebar from '../Components/Global/Sidebar.jsx';
import { Outlet } from 'react-router-dom';
import GlassLayout from './Glass.jsx';
import { Box, Flex } from '@chakra-ui/react';

const Admin = () => {
  return (
    <Flex h="100vh" minW="100vw">
      {/* Main Content Area */}
      <Box flex="1">
        <GlassLayout>
          <Flex h="100%">
            <Sidebar>
              {/* This Box will scroll */}
              <Box
                flex="1"
                overflowY="auto"
                p={4}
                w="full"
              >
                <Outlet />
              </Box>
            </Sidebar>
          </Flex>
        </GlassLayout>
      </Box>
    </Flex>
  );
};

export default Admin;
