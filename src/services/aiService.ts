export async function generateIdea(skills: string): Promise<string> {
  const response = await fetch('/api/generate-idea', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ skills }),
  })

  if (!response.ok) {
    throw new Error('Error al generar la idea')
  }

  const data = await response.json()
  return data.idea
}