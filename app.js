const express = require('express')

const app = express()

const {sequelize,Customer,cart} = require('./models')
app.use(express.json())

app.post('/customer',async (req,res)=>{
    const {name,email,bill} = req.body
    try{
const user = await Customer.create({name,email,bill})
return res.json(user)
    }
    catch(err){
        console.error(err.message)
        res.status(500).send('Server error')
    }
})

app.get('/customer',async(req,res)=>{   //to get all customers
    try{
        const customers = await Customer.findAll() 

       return res.json(customers)
    }
    catch(err){console.error(err.message)}
})





app.get('/customer/:id',async(req,res)=>{  //to get particular customers
    const id =req.params.id
    try{
       
        const customers = await Customer.findOne({
            where:{uuid : id},
            include:'cart',
        })  

       return res.json(customers)
    }
    catch(err){console.error(err.message)}
})


app.post('/cart',async(req,res)=>{
    const {useruuid,product_name} =req.body
    try{
        const user = await Customer.findOne({where:{uuid : useruuid}})
        if(!user){
            return res.status(404).send('User not found')
        }
        const cartItem = await cart.create({product_name,userId:user.id})
        return res.json(cartItem)
    }
    catch(err){
        console.error(err.message)
        res.status(500).send('Server error')
    }
})

app.get('/cart',async(req,res)=>{

    try{
        
        const cart_details = await cart.findAll({include:['customer']})
        return res.json(cart_details)
    }
    catch(err){
        console.error(err.message)
        res.status(500).send('Server error')
    }
})


app.delete('/customer/:id',async(req,res)=>{  
    const id =req.params.id
    try{
       
        const customers = await Customer.findOne({where:{uuid : id}})  
        await customers.destroy()
       return res.json({message: 'Customer deleted'})
    }
    catch(err){console.error(err.message)}
})


app.put('/customer/:id',async(req,res)=>{  
    const id =req.params.id
    const {name,email,bill} = req.body
    try{
       
        const customers = await Customer.findOne({ where:{uuid : id}})  
        customers.name = name,
        customers.email = email,
        customers.bill = bill,
        await customers.save()
       return res.json(customers)
    }
    catch(err){console.error(err.message)}
})





app.listen('3000',async()=>{
    //await sequelize.sync({force:true}) //we cen use {alter:true} instead of {force:true}
    await sequelize.authenticate()
    console.log('Server is running on port 3000') 
})

