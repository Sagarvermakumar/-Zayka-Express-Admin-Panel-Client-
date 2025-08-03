import { SimpleGrid, Text } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllStats, getOrderStats } from '../features/stat/statsSlice';
import LayoutWrapper from '../Layout/LayoutWrapper';
import Header from '../Components/Heading';
import CountStat from '../Components/CountStat';
import OrderStatsChart from '../Components/OrderStatsChart';
import GrowthChart from '../Components/GrowthChart';
import NotFoundData from '../Components/NotFountData';

const Dashboard = () => {

  const user = useSelector((state) => state.auth.user);
  const { stats, orderStats } = useSelector(state => state.stats);
  // console.log("orderStats", orderStats);
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllStats())
    dispatch(getOrderStats())

  }, [dispatch])
  return (
    <LayoutWrapper>
      <Header title={`Welcome ${user?.name}`} subtitle={"Overview of your admin panel and insights"} />

     {
      <>
      {
        stats?.length >0 || orderStats.length>0 ?( <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6} mb={6}>
        {/* user stats  */}
        <CountStat count={stats?.users || 0} label={" Total Users"} growth={"19 new user Install app in last week"} />
        {/* Orders stats  */}
        <CountStat count={stats?.orders || 0} label=" Total Orders" growth={'68 orders in last week'} />
        {/* Menu stats  */}
        <CountStat count={stats?.menus || 0} label={" All Menus"} growth={'new Menu Add 2 day before'} />





        {stats?.userGrowth?.length > 0 ? (
          <GrowthChart title="User Growth" data={stats.userGrowth} dataKey="count" />
        ) : (
          <Text>No Growth Data Found</Text> // Or your <NotFoundData /> component
        )}
        {stats?.orderGrowth?.length > 0 ? (
          <GrowthChart title="Order Growth" data={stats.orderGrowth} dataKey="count" />
        ) : (
          <Text>No Growth Data Found</Text> // Or your <NotFoundData /> component
        )}
        {stats?.menuGrowth?.length > 0 ? (
          <GrowthChart title="Menu Growth" data={stats.menuGrowth} dataKey="count" />
        ) : (
          <Text>No Growth Data Found</Text> // Or your <NotFoundData /> component
        )}


        <OrderStatsChart stats={orderStats} title={"Order Statistics"} key={orderStats?._id} data={orderStats} />
      </SimpleGrid>):( <NotFoundData
            label="Stats"
            subLabel="Maybe the Order  was deleted or does not exist."
          />)
      }
      </>
     }
    </LayoutWrapper>
  )
}

export default Dashboard