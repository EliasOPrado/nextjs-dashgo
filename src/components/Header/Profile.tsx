import { Flex, Box, Avatar, Text } from "@chakra-ui/react";

interface ProfileProps {
  showProfileData?: boolean;
}

export function Profile({ showProfileData = true }: ProfileProps) {
  return (
    <Flex align="center">
      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>Elias Prado</Text>
          <Text color="gray.300" fontSize="small">
            elias@email.com
          </Text>
        </Box>
      )}
      <Avatar
        size="md"
        name="Elias Prado"
        src="https://github.com/EliasOPrado2.png"
      />
    </Flex>
  );
}
