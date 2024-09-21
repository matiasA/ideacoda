import { Box, Text, VStack, Heading } from '@chakra-ui/react'

interface IdeaDisplayProps {
  idea: string
}

export default function IdeaDisplay({ idea }: IdeaDisplayProps) {
  return (
    <VStack mt={8} spacing={4} align="stretch">
      <Heading as="h3" size="md" textAlign="center">
        Tu idea de negocio:
      </Heading>
      <Box bg="brand.50" p={6} borderRadius="md" borderLeft="4px solid" borderColor="brand.500">
        <Text fontSize="lg" fontStyle="italic" color="gray.700">
          "{idea}"
        </Text>
      </Box>
    </VStack>
  )
}