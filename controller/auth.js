import { Usuario } from '../models/Usuario.js';


export async function loginForm(req, res) {
    res.render('auth/login');
}

export async function signupForm(req, res) {
    res.render('auth/signup');
}


export async function signup(req, res) {

    
    const { nombre, email, password, confPassword, apellido } = req.body;

    const name = nombre ? nombre.trim() : '';
    const lastname = apellido ? apellido.trim() : '';

    const mail = email ? email.trim() : '';

    const pass = password ? password.trim() : '';
    const confirmPass = confPassword ? confPassword.trim() : '';

   
    if (!name || !lastname || !mail || !pass || !confirmPass) {
        return res.status(400).render('auth/signup', {
            alert: {
                status: "error",
                text: "No deben haber campos vacíos"
            },
            formValues: req.body
        });
    }

   
    if (pass !== confirmPass) {
        return res.status(400).render('auth/signup', {
            alert: {
                status: "error",
                text: "Las contraseñas no coinciden"
            },

            // aca guardamos la info del usuario asi no tiene q tipear todo
            //de nuevo si se equivocoo.
            formValues: req.body
        });
    }

    try {
        
        await Usuario.create({
            nombre: name,
            apellido: lastname,
            email: mail,
            password: pass 
        });

       
        return res.status(201).render('auth/login', {
            alert: {
                status: "success",
                text: "¡Usuario creado con éxito! Ya puede iniciar sesión."
            }
        });

    } catch (error) {
        console.log('Error en signup: ', error);
      
      if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).render('auth/signup', {
                alert: {
                    status: "error",
                    text: "El correo electrónico ya se encuentra registrado. Por favor, usa otro o inicia sesión."
                },
                formValues: req.body
            });
        }



        return res.status(500).render('auth/signup', {
            alert: {
                status: "error",
                text: "Hubo un error al crear el usuario"
            },
            formValues: req.body
        });
    }
}


export async function login(req, res) {

    const { email, password } = req.body;

    
    const mail = email ? email.trim() : '';
    const pass = password ? password.trim() : '';

    if (!mail || !pass) {
        return res.status(400).render('auth/login', {
            alert: {
                status: "error",
                text: "Complete todos los campos"
            },
            formValues: req.body
        });
    }

    try {
     
        const usuario = await Usuario.findOne({
            where: {
                email: mail
            }
        });

       
        if (!usuario) {
            return res.status(400).render('auth/login', {
                alert: {
                    status: "error",

                    text: "Usuario o contraseña incorrecta."
                },
                formValues: req.body
            });
        }

       
        const isValidated = await usuario.validatePassword(pass);
     
      
        if (!isValidated) {

            return res.status(400).render('auth/login', {
                alert: {

                    status: "error",
                    text: "Usuario o contraseña incorrecta."
                },
                formValues: req.body
            });
        }

        
         //requiero solo esa info.. no la instancia completa

        req.session.usuario = {

         id: usuario.id,
         nombre: usuario.nombre,
         apellido: usuario.apellido,
         email: usuario.email

          };






        
    
        return res.redirect('/home');

    } catch (error) {
        console.log('[!] Error en login: ', error);
        return res.status(500).render('auth/login', {
            alert: {
                status: "error",
                text: "Hubo un error al iniciar sesión"
            },
            formValues: req.body
        });
    }
}

export async function logout(req, res) {
    req.session.destroy((error) => {
        if (error) {

            console.log('Error al cerrar sesión: ', error);
            return res.redirect('/home');

        }
      

        return res.redirect('/auth/login');
    });
}