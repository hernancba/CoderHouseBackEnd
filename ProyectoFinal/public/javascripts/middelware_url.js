const rutaInvalida=(req,res,next)=>{
    res.json({
        error:-2,
        descripcion:`Ruta ${req.method} ${rutaInvalida} es inexistente`
    })
}
module.exports = {rutaInvalida};