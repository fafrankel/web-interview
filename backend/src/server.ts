import express from 'express'
import cors from 'cors'
import routes from './routes'
import healthRoutes from './routes/health.routes'

const app = express()

app.use(cors())
app.use(express.json())

const PORT = 3001

app.use('/health', healthRoutes)
app.use('/api', routes)

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
