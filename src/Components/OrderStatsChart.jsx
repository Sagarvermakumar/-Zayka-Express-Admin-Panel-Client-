import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Box, Heading } from "@chakra-ui/react";
import PropTypes from 'prop-types';


const OrderStatsChart = ({ stats, title }) => {
  return (
    <Box mt={8}>
      <Heading size="md" mb={4}>{title}</Heading>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={stats}>
          <XAxis dataKey="status" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="totalPrice" fill="#e00b6bff" name="Revenue (₹)" />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default OrderStatsChart;

OrderStatsChart.propTypes = {
  stats: PropTypes.arrayOf(
    PropTypes.shape({
      status: PropTypes.string.isRequired,
      totalPrice: PropTypes.number.isRequired,
    })
  ).isRequired,
  title: PropTypes.string.isRequired,
};
