import{ NextApiRequest, NextApiResponse } from 'next'

export default (request: NextApiRequest, response: NextApiResponse) => {
  const users = [
    {
      id: 1, name: 'Lucas'
    },
    
    {
      id: 2, name: 'Geisielle'
    },
    
    {
      id: 3, name: 'Wilson'
    },
  ]

  return response.json(users)
}