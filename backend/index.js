import express from 'express'

const app = express()



// MIDDLEWARES
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


//rutas
app.get('/api', (req,res)=>{
    res.json({message:'funciona'})
})



const PORT = 8080

const httpServer = app.listen(PORT, () => {
  console.log('Servidor escuchando en el puerto 8080');
})
