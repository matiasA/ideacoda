import { useState } from 'react'
import { generateIdea } from '../services/aiService'
import IdeaDisplay from './IdeaDisplay'
import SavedIdeas from './SavedIdeas'
import { Box, Button, FormControl, FormLabel, Input, VStack, useToast, Heading } from '@chakra-ui/react'

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
    <Box bg="gray.800" borderRadius="xl" shadow="xl" p={8}>
      <Heading as="h2" size="lg" mb={6} textAlign="center" color="brand.300">
        Genera tu idea de negocio
      </Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={6}>
          <FormControl>
            <FormLabel htmlFor="skills" color="gray.300">Tus habilidades:</FormLabel>
            <Input
              id="skills"
              value={skills}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSkills(e.target.value)}
              placeholder="Ej: programación, diseño, marketing"
              required
              size="lg"
              bg="gray.700"
              borderColor="gray.600"
              _hover={{ borderColor: 'brand.400' }}
              _focus={{ borderColor: 'brand.500', boxShadow: '0 0 0 1px #007bff' }}
            />
          </FormControl>
          <Button
            type="submit"
            colorScheme="brand"
            size="lg"
            width="full"
            isLoading={loading}
            loadingText="Generando..."
          >
            Generar Idea de Negocio Completa
          </Button>
        </VStack>
      </form>
      {idea && <IdeaDisplay idea={idea} />}
      <SavedIdeas />
    </Box>
  )
}