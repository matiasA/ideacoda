import axios from 'axios'

export async function generateIdeas(skills: string, industry: string, numberOfIdeas: number): Promise<string[]> {
  try {
    const response = await axios.post('/api/generate-idea', { skills, industry, numberOfIdeas })
    return response.data.ideas
  } catch (error) {
    console.error('Error en el servicio de IA:', error)
    throw new Error('No se pudieron generar las ideas')
  }
}