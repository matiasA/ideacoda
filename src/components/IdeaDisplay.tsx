import { Box, Text, VStack } from '@chakra-ui/react'

interface IdeaDisplayProps {
  idea: string
}

export default function IdeaDisplay({ idea }: IdeaDisplayProps) {
  return (
    <VStack mt={8} spacing={4} align="stretch">
      <Text fontSize="xl" fontWeight="bold">Tu idea de negocio:</Text>
      <Box bg="gray.100" p={4} borderRadius="md">
        <Text fontSize="lg">{idea}</Text>
      </Box>
    </VStack>
  )
}