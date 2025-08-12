import { Flex, Heading, Text } from "@chakra-ui/react";
import PropTypes from "prop-types";

const Header = ({ title, subtitle }) => {
  return (
    <Flex flexDir="column" my={4}>
      <Heading
        size="md"
        fontSize={{ base: "2xl", md: "3xl" }}
        fontWeight="600"
        color="whiteAlpha.900"
        letterSpacing="wider"
        lineHeight="shorter"
        bgGradient="linear(to-r, #ffffffff, rgba(255, 255, 255, 1))" 
        bgClip="text"
        textShadow={`
          0 1px 1px rgba(0, 0, 0, 0.3),
          0 2px 4px rgba(0, 0, 0, 0.4)
        `}
      >
        {title}
      </Heading>

      {subtitle && (
        <Text
          color="gray.300"
          fontSize={{ base: "sm", md: "md" }}
          mt={1}
        >
          {subtitle}
        </Text>
      )}
    </Flex>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
};

export default Header;
