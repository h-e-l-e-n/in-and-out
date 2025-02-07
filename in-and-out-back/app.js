import express from 'express'

const app = express()
const port = 3030

app.listen(port, "::", () => {
    console.log(`server running on port ${port}`);
});