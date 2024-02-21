const {Router} = require("express")

const router = Router()
require('dotenv').config()
const mysql = require('mysql2/promise')

//MYSQL
const conexion=mysql.createPool({
    database:process.env.DATABASE,
    user:process.env.USER,
    password:process.env.PASSWORD,
    host:process.env.HOST,
})



router.get("/",async(req,res)=>{
    const [rows]= await conexion.query('select * FROM informacion')
    res.render('showcase',{libros:rows})
})
router.post("/",async(req,res)=>{
    if (req.body.info){
        res.redirect('/info')

    }else if(req.body.eliminar){
        await conexion.query('DELETE FROM informacion WHERE id =?',[req.body.eliminar])
        res.redirect('/')
    }
    
    
})

router.get("/anadir", (req, res) => {
    res.render('anadir');
});


router.post("/anadir",async(req,res)=>{
    await conexion.query('INSERT INTO informacion (titulo, descripcion, imagen) VALUES (?, ?, ?)', [req.body.titulo, req.body.descripcion, req.body.imagen])
    res.redirect("/")
})
router.get("/info/:id",async(req,res)=>{
    console.log("Hola")
})
router.post("/info/:id",async(req,res)=>{
    console.log("Hola")
})
module.exports = router