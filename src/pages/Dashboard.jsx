import { SimpleGrid, Text } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EmptyState from '../Components/common/EmptyState';
import Header from '../Components/common/Heading';
import CountStat from '../Components/CountStat';
import GrowthChart from '../Components/GrowthChart';
import OrderStatsChart from '../Components/OrderStatsChart';
import { getAllStats, getOrderStats } from '../features/stat/statsSlice';

const Dashboard = () => {

  const user = useSelector((state) => state.auth.user);
  const { stats, orderStats } = useSelector(state => state.stats);
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllStats())
    dispatch(getOrderStats())

  }, [dispatch])
  return (
    <>
      <Header title={`Welcome ${user?.name}`} subtitle={"Overview of your admin panel and insights"} />

      {
        <>
          {
            (stats?.length > 0 || orderStats.length > 0) ? (
              <>
                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6} mb={6}>
                  {/* user stats  */}
                  <CountStat count={stats?.users || 0} label={" Total Users"} growth={`${stats.users} new users joined the platform in the last month`} />

                  {/* Orders stats  */}
                  <CountStat count={stats?.orders || 0} label=" Total Orders" growth={`${stats.orders} orders placed in the last week`} />
                  {/* Menu stats  */}
                  <CountStat count={stats?.menus || 0} label={" All Menus"} growth={`${stats.menus} items added to the menu recently`} />
                </SimpleGrid>

                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} mb={6}>

                  {stats?.userGrowth?.length > 0 ? (
                    <GrowthChart title="User Growth" data={stats.userGrowth} dataKey="count" />
                  ) : (
                    <Text>No Growth Data Found</Text>
                  )}
                  {stats?.orderGrowth?.length > 0 ? (
                    <GrowthChart title="Order Growth" data={stats.orderGrowth} dataKey="count" />
                  ) : (
                    <Text>No Growth Data Found</Text>
                  )}
                  {stats?.menuGrowth?.length > 0 ? (
                    <GrowthChart title="Menu Growth" data={stats.menuGrowth} dataKey="count" />
                  ) : (
                    <Text>No Growth Data Found</Text>
                  )}
                  <OrderStatsChart stats={orderStats} title={"Order Statistics"} key={orderStats?._id} data={orderStats} />
                </SimpleGrid>

              </>
            ) : (
              <EmptyState
                label="Stats"
                subLabel="Maybe the Order  was deleted or does not exist."
              />
            )
          }
        </>
      }
    </>
  )
}

export default Dashboard