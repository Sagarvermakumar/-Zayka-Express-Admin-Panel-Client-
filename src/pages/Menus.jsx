import React, { useEffect } from 'react'
import { FaAdjust } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux'
import { getAllMenuItems } from '../features/Menu/menuSlice';
import { Avatar, Badge, Box, ButtonGroup, Center, CloseButton, Heading, HStack, IconButton, Stack, Table, TableCaption, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';
import Header from '../Components/Heading';
import LayoutWrapper from '../Layout/LayoutWrapper';
import AdminFoodItems from '../Components/AdminFoodItems';
import NotFoundData from '../Components/NotFountData';

const Menus = () => {
  const dispatch = useDispatch();
  const { menusItem } = useSelector(state => state.menuItems);

  console.log(menusItem)

  // console.log(menusItem)
  useEffect(() => {
    dispatch(getAllMenuItems())
  }, [dispatch])
  return (
    <>
      {
        menusItem?.length > 0 ? (
          <AdminFoodItems items={menusItem} />
        ) : (
          <NotFoundData
          label="Menu Item"
          redirectUrl="/add-item"
          subLabel="Maybe the item was deleted or does not exist."
          btnLabel="Add Item"
          />
        )
      }
    </>
  )
}

export default Menus