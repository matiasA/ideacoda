import { Box, Text, VStack, Heading, UnorderedList, ListItem, Flex, Badge, Button, HStack, useToast } from '@chakra-ui/react'
import { FaShare, FaSave } from 'react-icons/fa'

interface IdeaDisplayProps {
  idea: string
}

export default function IdeaDisplay({ idea }: IdeaDisplayProps) {
  const sections = idea.split('\n\n')
  const toast = useToast()

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Mi idea de negocio generada por IA',
        text: idea,
        url: window.location.href,
      })
        .then(() => console.log('Idea compartida con éxito'))
        .catch((error) => console.log('Error al compartir', error))
    } else {
      toast({
        title: 'Compartir no disponible',
        description: 'Tu navegador no soporta la función de compartir.',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  const handleSave = () => {
    const savedIdeas = JSON.parse(localStorage.getItem('savedIdeas') || '[]')
    savedIdeas.push(idea)
    localStorage.setItem('savedIdeas', JSON.stringify(savedIdeas))
    toast({
      title: 'Idea guardada',
      description: 'La idea ha sido guardada en tus favoritos.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    })
  }

  return (
    <VStack mt={8} spacing={8} align="stretch">
      <Heading as="h3" size="xl" textAlign="center" color="brand.300">
        Tu Idea de Negocio Innovadora
      </Heading>
      <HStack justifyContent="center" spacing={4}>
        <Button leftIcon={<FaShare />} colorScheme="blue" onClick={handleShare}>
          Compartir
        </Button>
        <Button leftIcon={<FaSave />} colorScheme="green" onClick={handleSave}>
          Guardar
        </Button>
      </HStack>
      {sections.map((section, index) => {
        const [title, ...content] = section.split('\n')
        return (
          <Box 
            key={index} 
            bg="gray.700" 
            p={6} 
            borderRadius="lg" 
            boxShadow="xl"
            borderLeft="8px solid" 
            borderColor="brand.500"
            transition="all 0.3s"
            _hover={{ transform: 'translateY(-5px)', boxShadow: '2xl' }}
          >
            <Flex align="center" mb={4}>
              <Badge colorScheme="brand" fontSize="0.8em" mr={2}>
                {index + 1}
              </Badge>
              <Heading as="h4" size="md" color="brand.300">
                {title}
              </Heading>
            </Flex>
            {content.length > 1 ? (
              <UnorderedList spacing={2}>
                {content.map((item, i) => (
                  <ListItem key={i} fontSize="md" color="gray.300">
                    {item.replace('- ', '')}
                  </ListItem>
                ))}
              </UnorderedList>
            ) : (
              <Text fontSize="lg" fontStyle="italic" color="gray.300">
                {content[0]}
              </Text>
            )}
          </Box>
        )
      })}
    </VStack>
  )
}