// src/components/HeadingSection.jsx
import { Flex, Heading, Text } from "@chakra-ui/react";
import PropTypes from "prop-types";

const Header = ({ title, subtitle, align }) => {
  return (
    <Flex flexDir={'column'}  my={8} >
        <Heading size="md" fontSize={{ base: "2xl", md: "3xl" }}
          fontWeight="500"
          color="#ffff"
          letterSpacing="wider"
          lineHeight="shorter"
          textAlign="left"

          textShadow={`
    0 1px 1px rgba(56, 7, 7, 0.74),
    0 2px 4px rgba(0, 0, 0, 0.3),
    1px 1px 0 rgba(255, 255, 255, 0.2)
  `} >{title}</Heading>

      {
        subtitle && <Text>{subtitle}</Text>
      }

    </Flex>
  );
};
Header.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  align: PropTypes.string,
};

export default Header;
