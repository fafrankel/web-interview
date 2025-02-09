import express from 'express'
import healthRoutes from './health.routes'
import v1Routes from './v1'

const router = express.Router()

router.use('/health', healthRoutes)
router.use('/v1', v1Routes)

export default router
