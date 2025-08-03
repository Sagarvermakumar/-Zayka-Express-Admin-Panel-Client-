import { Box, Heading } from "@chakra-ui/react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend
} from "recharts";

import PropTypes from 'prop-types';

const GrowthChart = ({ title, data, dataKey }) => (
  <Box mt={10}>
    <Heading size="md" mb={4}>{title}</Heading>
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey={dataKey} fill="#e00b6bff" />
      </BarChart>
    </ResponsiveContainer>
  </Box>
);

GrowthChart.propTypes = {
  title: PropTypes.string.isRequired,
    data: PropTypes.arrayOf(
        PropTypes.shape({
        month: PropTypes.string.isRequired,
        [PropTypes.string]: PropTypes.number.isRequired,
        })
    ).isRequired,
  dataKey: PropTypes.string.isRequired,
};

export default GrowthChart;