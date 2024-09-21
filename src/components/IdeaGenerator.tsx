import { useState } from 'react'
import { generateIdea } from '../services/aiService'
import IdeaDisplay from './IdeaDisplay'
import { Box, Button, FormControl, FormLabel, Input, VStack, Text, useToast } from '@chakra-ui/react'

export default function IdeaGenerator() {
  const [skills, setSkills] = useState('')
  const [idea, setIdea] = useState('')
  const [loading, setLoading] = useState(false)
  const toast = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const generatedIdea = await generateIdea(skills)
      setIdea(generatedIdea)
    } catch (error) {
      console.error('Error al generar la idea:', error)
      toast({
        title: 'Error',
        description: 'No se pudo generar la idea. Por favor, intenta de nuevo.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box bg="white" borderRadius="xl" shadow="xl" p={8}>
      <form onSubmit={handleSubmit}>
        <VStack spacing={6}>
          <FormControl>
            <FormLabel htmlFor="skills">Tus habilidades:</FormLabel>
            <Input
              id="skills"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              placeholder="Ej: programación, diseño, marketing"
              required
            />
          </FormControl>
          <Button
            type="submit"
            colorScheme="brand"
            size="lg"
            width="full"
            isLoading={loading}
          >
            Generar Idea
          </Button>
        </VStack>
      </form>
      {idea && <IdeaDisplay idea={idea} />}
    </Box>
  )
}