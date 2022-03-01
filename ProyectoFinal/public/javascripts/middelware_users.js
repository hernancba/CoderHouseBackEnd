const checkAdmin = (req, res, next) => {
    if (req.user.type!= undefined && req.user.type === "admin") {
        next();
    }else{
      res.json({error:"Debe tener permisos de Administrador."});
    }
  }

module.exports = {checkAdmin};