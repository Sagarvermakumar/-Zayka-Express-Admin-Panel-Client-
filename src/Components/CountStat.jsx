import { HStack, Stat, StatHelpText, StatLabel, StatNumber, Text } from '@chakra-ui/react'
import React from 'react'
import PropTypes from "prop-types";
const CountStat = ({ count, label, growth }) => {
    return (
        <Stat p={4}  
        // bg={'rgba(0, 0, 0, 0.25)'}
            borderRadius="lg"
            shadow="lg"
            border="1px solid rgba(239, 232, 235, 0.44)"
          

        >
            <HStack justify={'space-between'} >
                <StatLabel  >{label}</StatLabel>
                <Text fontSize={'12px'} color={'gray'} fontFamily={'monospace'}>Updated Today</Text>
            </HStack>
            <StatNumber fontSize={'4xl'} >{count || 0}</StatNumber>
            <StatHelpText color={'gray.500'} > {growth}</StatHelpText>
        </Stat>
    )
}


CountStat.propTypes = {
    count: PropTypes.number.isRequired,
    label:PropTypes.string.isRequired,
    growth:PropTypes.string.isRequired
};
export default CountStat