import type { Request, Response } from 'express';
import express from 'express';

const app = express()
const port = 3000

app.use(express.json())

app.get('/', (req: Request, res: Response) => {
  res.send('NORIS BE is Active')
})

app.post('/login', (req: Request, res: Response) => {
    const {email, password} = req.body
    if(email == "harry@gmail.com" && password == "123456") {
        res.send("Welcome back, Harry")
    } else {
        res.send("You are not allowed to access this page")
    }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})