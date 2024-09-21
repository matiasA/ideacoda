import { useState } from 'react'
import { generateIdeas } from '../services/aiService'
import IdeaDisplay from './IdeaDisplay'
import SavedIdeas from './SavedIdeas'
import { Box, Button, FormControl, FormLabel, Input, VStack, useToast, Heading, Select, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper } from '@chakra-ui/react'

const industries = [
  "Tecnología", "Salud", "Educación", "Finanzas", "Alimentación", "Moda", "Turismo", "Deportes", "Arte y Cultura", "Medio Ambiente"
]

export default function IdeaGenerator() {
  const [skills, setSkills] = useState('')
  const [industry, setIndustry] = useState('')
  const [numberOfIdeas, setNumberOfIdeas] = useState(1)
  const [ideas, setIdeas] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const toast = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const generatedIdeas = await generateIdeas(skills, industry, numberOfIdeas)
      setIdeas(generatedIdeas)
    } catch (error) {
      console.error('Error al generar las ideas:', error)
      toast({
        title: 'Error',
        description: 'No se pudieron generar las ideas. Por favor, intenta de nuevo.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box bg="gray.800" borderRadius="2xl" shadow="xl" p={8} borderWidth="1px" borderColor="gray.700">
      <Heading as="h2" size="xl" mb={8} textAlign="center" color="brand.300" fontWeight="100">
        Genera tus ideas de negocio
      </Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={8}>
          <FormControl>
            <FormLabel htmlFor="skills" color="gray.400" fontWeight="300">Tus habilidades:</FormLabel>
            <Input
              id="skills"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              placeholder="Ej: programación, diseño, marketing"
              required
              size="lg"
              bg="gray.700"
              borderColor="gray.600"
              _hover={{ borderColor: 'brand.400' }}
              _focus={{ borderColor: 'brand.500', boxShadow: '0 0 0 1px #00a3ff' }}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="industry" color="gray.400" fontWeight="300">Industria:</FormLabel>
            <Select
              id="industry"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              placeholder="Selecciona una industria"
              size="lg"
              bg="gray.700"
              borderColor="gray.600"
              _hover={{ borderColor: 'brand.400' }}
              _focus={{ borderColor: 'brand.500', boxShadow: '0 0 0 1px #00a3ff' }}
            >
              {industries.map((ind) => (
                <option key={ind} value={ind}>{ind}</option>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="numberOfIdeas" color="gray.400" fontWeight="300">Número de ideas:</FormLabel>
            <NumberInput
              id="numberOfIdeas"
              value={numberOfIdeas}
              onChange={(_, value) => setNumberOfIdeas(value)}
              min={1}
              max={5}
              size="lg"
            >
              <NumberInputField 
                bg="gray.700"
                borderColor="gray.600"
                _hover={{ borderColor: 'brand.400' }}
                _focus={{ borderColor: 'brand.500', boxShadow: '0 0 0 1px #00a3ff' }}
              />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
          <Button
            type="submit"
            colorScheme="brand"
            size="lg"
            width="full"
            isLoading={loading}
            loadingText="Generando..."
            fontWeight="300"
            letterSpacing="wide"
          >
            Generar Ideas de Negocio
          </Button>
        </VStack>
      </form>
      {ideas.map((idea, index) => (
        <IdeaDisplay key={index} idea={idea} />
      ))}
      <SavedIdeas />
    </Box>
  )
}