import express from 'express'
import cors from 'cors'
import restockRouter from './src/routes/restockRouter.js'

const app = express()

app.use(express.json())
app.use(cors())

app.use('/restocks', restockRouter)


const port = 3030

app.listen(port, "::", () => {
    console.log(`server running on port ${port}`);
});