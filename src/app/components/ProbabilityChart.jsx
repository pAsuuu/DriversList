// components/ProbabilityChart.jsx

import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { Box, Heading, useColorModeValue } from '@chakra-ui/react';
import PropTypes from 'prop-types';

/**
 * ProbabilityChart - Un composant pour afficher un graphique des probabilités de victoire
 *
 * @param {Array} data - Les données à afficher dans le graphique.
 * @returns {JSX.Element} - Un graphique interactif.
 */
const ProbabilityChart = ({ data }) => {
  const bgColor = useColorModeValue('white', 'gray.700');
  const strokeColor = useColorModeValue('#3182CE', '#63B3ED');
  const gridColor = useColorModeValue('gray.200', 'gray.600');
  const axisColor = useColorModeValue('gray.500', 'gray.300');

  return (
    <Box bg={bgColor} p={6} rounded="lg" shadow="md" width="100%" height={400}>
      <Heading as="h3" size="lg" mb={4} textAlign="center" color="teal.500">
        Probabilités de Victoire par Pilote
      </Heading>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
          <XAxis
            dataKey="race"
            stroke={axisColor}
            tick={{ fontSize: 12 }}
            tickLine={false}
            axisLine={{ stroke: axisColor }}
          />
          <YAxis
            domain={[0, 100]}
            stroke={axisColor}
            tick={{ fontSize: 12 }}
            tickLine={false}
            axisLine={{ stroke: axisColor }}
            tickFormatter={(value) => `${value}%`}
          />
          <Tooltip
            contentStyle={{ backgroundColor: useColorModeValue('#fff', '#2D3748'), border: 'none' }}
            labelStyle={{ color: useColorModeValue('gray.800', 'white') }}
            formatter={(value) => [`${value}%`, 'Probabilité']}
          />
          <Legend verticalAlign="top" height={36} />
          <Line
            type="monotone"
            dataKey="probability"
            stroke={strokeColor}
            activeDot={{ r: 8 }}
            strokeWidth={2}
            dot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};

ProbabilityChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      race: PropTypes.string.isRequired,
      probability: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default ProbabilityChart;
