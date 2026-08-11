


export const auth = (req,res,next)=> {

    if(!req.session.usuario){
        
        
        return res.redirect('/auth/login');
    }

    next();
}

export const soloValidador = (req, res, next) => {
  if (!req.session.usuario) {
    return res.redirect('/auth/login');
  }

  if (req.session.usuario.rol_id !== 1) {
    return res.status(403).send('Acceso denegado');
  }

  next();
};