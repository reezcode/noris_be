import type { Request, Response } from 'express';
import express from 'express';
import authRoutes from './routes/auth_routes';

const app = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/api/v1/auth', authRoutes)

// if access other route, send 404
app.use((req: Request, res: Response) => {
    res.status(404).send('Route not found')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

export default app;