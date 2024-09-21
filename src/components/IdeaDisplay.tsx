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
    <VStack mt={12} spacing={8} align="stretch">
      <Heading as="h3" size="2xl" textAlign="center" color="brand.300" fontWeight="100" letterSpacing="wider">
        Tu Idea de Negocio Innovadora
      </Heading>
      <HStack justifyContent="center" spacing={4}>
        <Button leftIcon={<FaShare />} colorScheme="blue" onClick={handleShare} fontWeight="300">
          Compartir
        </Button>
        <Button leftIcon={<FaSave />} colorScheme="green" onClick={handleSave} fontWeight="300">
          Guardar
        </Button>
      </HStack>
      {sections.map((section, index) => {
        const [title, ...content] = section.split('\n')
        return (
          <Box 
            key={index} 
            className="idea-box"
            borderRadius="xl" 
            boxShadow="lg"
            transition="all 0.3s ease-in-out"
            _hover={{ transform: 'translateY(-5px)', boxShadow: '2xl' }}
            overflow="hidden"
          >
            <Box className="idea-box-content" p={8}>
              <Flex align="center" mb={4}>
                <Badge colorScheme="brand" fontSize="0.8em" mr={2} fontWeight="300">
                  {index + 1}
                </Badge>
                <Heading as="h4" size="lg" color="brand.300" fontWeight="100">
                  {title}
                </Heading>
              </Flex>
              {content.length > 1 ? (
                <UnorderedList spacing={2}>
                  {content.map((item, i) => (
                    <ListItem key={i} fontSize="md" color="gray.300" fontWeight="300">
                      {item.replace('- ', '')}
                    </ListItem>
                  ))}
                </UnorderedList>
              ) : (
                <Text fontSize="lg" fontStyle="italic" color="gray.300" fontWeight="300">
                  {content[0]}
                </Text>
              )}
            </Box>
          </Box>
        )
      })}
      <Box>
        <Heading as="h5" size="md" mb={2} color="brand.300" fontWeight="100">
          Etiquetas:
        </Heading>
        <Flex wrap="wrap" gap={2}>
          {sections[sections.length - 1].split('\n')[1].split(', ').map((tag, index) => (
            <Badge key={index} colorScheme="blue" fontWeight="300">
              {tag}
            </Badge>
          ))}
        </Flex>
      </Box>
    </VStack>
  )
}