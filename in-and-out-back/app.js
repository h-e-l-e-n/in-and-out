import express from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client';

const app = express()
const prisma = new PrismaClient()

app.use(express.json())
app.use(cors())

// app.use('/restocks', restockRouter)

app.get('/api/restock', async (req, res) => {
    try {
        const products = await prisma.restocks.findMany();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: '無法取得資料' });
    }
});

app.post('/api/addstock', async(req, res, next) => {
    try {
        const { product_name, amount, purchase_cost, expire_date, product_source, purchase_order_number } = req.body;
        
        if (!product_name || !amount || !purchase_cost || !expire_date || !product_source || !purchase_order_number) {
            return res.status(400).json({ error: "請提供完整的商品資訊" });
        }

        const response = await prisma.restocks.create({
          data: {
            product_name,
            amount: Number(amount), 
            purchase_cost: Number(purchase_cost),
            expire_date: new Date(expire_date),
            product_source,
            purchase_order_number,
            build_time: new Date(),
        }
        })
        res.status(201).json({
            message: "資料建立成功",
            status: 201,
            data: response,
        });
        
    } catch(err){
        console.error(err)
    }
})
const port = 3030

app.listen(port, "::", () => {
    console.log(`server running on port ${port}`);
});