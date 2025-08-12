import React from 'react';
import Sidebar from '../Components/Global/Sidebar.jsx';
import { Outlet } from 'react-router-dom';
import GlassLayout from './Glass.jsx';
import { Box, Flex } from '@chakra-ui/react';

const Admin = () => {
  return (
    <Flex h="100vh" minW="100vw"   >
      <Box flex="1"  >
        <GlassLayout>
          <Flex h="100%"  >
            <Sidebar>
              <Box
                overflowY="auto"              
                h={'100%'}
                px={{sm:4,md:8}}
                pt={4}
                pb={{sm:32, md:16, lg:8}}
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
