import express from 'express'
import healthControllers from '../handlers/health.handler'

const router = express.Router()

router.get('/', healthControllers.getHealth)

export default router
