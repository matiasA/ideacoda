import { useState, useEffect } from 'react'
import { Box, VStack, Heading, Text, Button } from '@chakra-ui/react'

export default function SavedIdeas() {
  const [savedIdeas, setSavedIdeas] = useState<string[]>([])

  useEffect(() => {
    const ideas = JSON.parse(localStorage.getItem('savedIdeas') || '[]')
    setSavedIdeas(ideas)
  }, [])

  const handleDelete = (index: number) => {
    const updatedIdeas = savedIdeas.filter((_, i) => i !== index)
    setSavedIdeas(updatedIdeas)
    localStorage.setItem('savedIdeas', JSON.stringify(updatedIdeas))
  }

  return (
    <Box mt={8}>
      <Heading as="h3" size="lg" mb={4} color="brand.300">
        Ideas Guardadas
      </Heading>
      <VStack spacing={4} align="stretch">
        {savedIdeas.map((idea, index) => (
          <Box key={index} bg="gray.700" p={4} borderRadius="md">
            <Text color="gray.300" noOfLines={3}>{idea}</Text>
            <Button size="sm" colorScheme="red" mt={2} onClick={() => handleDelete(index)}>
              Eliminar
            </Button>
          </Box>
        ))}
      </VStack>
    </Box>
  )
}