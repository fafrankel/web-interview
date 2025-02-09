import { RequestHandler } from 'express'

const getHealth: RequestHandler = (req, res) => {
  res.send('ok!')
}

export default { getHealth }
