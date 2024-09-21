import type { NextApiRequest, NextApiResponse } from 'next'
import { OpenAI } from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { skills } = req.body

    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini", // Cambiado a "gpt-4" ya que "gpt-4o-mini" no es un modelo oficial de OpenAI
        messages: [
          {
            role: "system",
            content: "Eres un experto en generación de ideas de negocio innovadoras y planificación estratégica."
          },
          {
            role: "user",
            content: `Genera una idea de negocio innovadora basada en las siguientes habilidades: ${skills}. 
            Proporciona una respuesta estructurada que incluya:
            
            1. Nombre del negocio
            2. Descripción breve (máximo 2 frases)
            3. Propuesta de valor única
            4. Público objetivo
            5. Productos o servicios principales
            6. Modelo de negocio básico
            7. Estrategia de marketing inicial:
               - Canales de marketing principales
               - Estrategias de adquisición de clientes
               - Propuesta de contenido para redes sociales
            8. Próximos pasos para iniciar el negocio (3-5 puntos)
            
            La respuesta debe ser concisa pero informativa, proporcionando una visión clara y accionable de la idea de negocio.`
          }
        ],
        max_tokens: 2000, // Aumentamos el número de tokens para permitir una respuesta más detallada
      })

      const idea = completion.choices[0]?.message?.content?.trim() || 'No se pudo generar una idea.'
      res.status(200).json({ idea })
    } catch (error) {
      console.error('Error al generar la idea:', error)
      res.status(500).json({ error: 'Error al generar la idea' })
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}