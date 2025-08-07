import { Box, Text, Link, Icon } from "@chakra-ui/react";
import { FiPhoneCall } from "react-icons/fi";

const UserContact = ({ phoneNumber }) => {
  return (
    <Box mt={1} >
      {/* <Text fontWeight="bold" mb={1}>Contact Number:</Text> */}
      <Link href={`tel:${phoneNumber}`} color="red.400" fontWeight="medium" display="flex" alignItems="center" gap={2}>
        <Icon as={FiPhoneCall} />
        {phoneNumber}
      </Link>
    </Box>
  );
};

export default UserContact;
