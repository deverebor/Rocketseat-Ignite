import{ NextApiRequest, NextApiResponse } from 'next'

export default (request: NextApiRequest, response: NextApiResponse) => {
  const users = [
    {
      id: 1, name: 'Lucas'
    },
    
    {
      id: 2, name: 'Souza'
    },
    
    {
      id: 3, name: 'Pereira'
    },
  ]

  return response.json(users)
}