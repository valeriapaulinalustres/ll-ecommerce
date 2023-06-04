
import { Router } from 'express'
import UsersManager from '../persistencia/DAO/mongoManagers/UsersManager.js'
const router = Router()
const usersManager = new UsersManager()
import passport from 'passport'
import {
  getUsersDataController, 
  forgotPasswordController, 
  createNewPasswordController, 
  changeRolController,
  getUserDataFromMailController, 
  addCartToUserController
} from '../controllers/users.controller.js'
import { generateToken } from '../utils.js'
import logger from '../utils/winston.js'



const CLIENT_URL = "https://localhost:3000/"

//-------Registro sin passport-----
// router.post('/registro', async (req, res) => {
//    if (req.body.password === req.body.repeatPassword) {
//     const newUser = await usersManager.createUser(req.body)
//     if (newUser) {
//       res.redirect('/api/views/login')
//     } else {
//         let mensaje = 'Este usuario ya existe. Vaya a login por favor'
//         res.render('errorLogin', {mensaje})
//     }
//    } else {
//     let mensaje = 'No coinciden las contraseñas'  
//     res.render('errorRegistro', {mensaje})
//    }
   
//   })

//--------registro con passport---------
router.post(
  '/registro',
  passport.authenticate('registro', {
    failureRedirect: '/api/users/registro/error',
    successRedirect: '/api/users/registro/success',
    passReqToCallback: true,
  })
)

router.get("/registro/success", (req,res) => {
  res.json({success: true, message:'Usuario registrado con éxito'})
  });
  
  router.get("/registro/error", (req,res) => {
    res.json({success: false, message:'Registro incorrecto'})
    });

  //-------- login sin passport ----------
  // router.post('/login', async (req, res) => {
  //   const { email, password } = req.body
  //   const user = await usersManager.loginUser(req.body)
  //   if (user) {
  //       req.session.name = user[0].first_name
  //     req.session.email = email
  //     req.session.password = password
  //       // if(email === 'adminCoder@mail.com' && password === '12345'){
  //   //   req.session.isAdmin = true
  //   // } else {
  //   //   req.session.isAdmin = false
  //   // }
  //     res.redirect('/api/products')
  //   } else {
  //       let mensaje = 'Usuario o contraseña inválidos'
  //     res.render('errorLogin',{mensaje})
  //   }
  // })

  //---- login con passport------
 // esta es la que funciona
  router.post(
    '/login',
    passport.authenticate('login', {
      failureRedirect: '/api/users/login/error',
      successRedirect: '/api/users/login/success',
      passReqToCallback: true,
      session: true
     }),
     function (req, res) {
     console.log('aqui', req.user)//no funciona
      res.cookie('cookie-prueba', 'vale').redirect('/api/users/login/success', req.user)  //cookie vale no funciona
    } //le manda a la ruta success el usuario
  )

 

  router.get("/login/success", async (req,res) => {
    console.log('aca',req.user)//funciona
    //----- Autenticación de usuarios ---
const token = generateToken(req.user)
logger.info('token generaldo con éxito', token)//funciona
console.log('token generado con éxito', token)//aparece la cookie en navegador
 res.cookie('token', token, { httpOnly: true }).json({existUser: true, message:'Login realizado con éxito', user:req.user, token }).send(req.session.sessionID)
   // res.json({existUser: true, message:'Login realizado con éxito', user:req.user})
    });
    
    router.get("/login/error", async (req,res) => {
      res.json({existUser: false, message:'Usuario o contraseña incorrectos'})
      });

//***** sacado de google */

// router.get("/logout", (req, res) => {
//    req.logout();
//    res.redirect(CLIENT_URL);
// });

// router.get("/registroGithub", passport.authenticate("github", { scope: ['user:email'] }));

// router.get(
//   "/github/callback",
//   passport.authenticate("github", {
//     successRedirect: CLIENT_URL,
//     failureRedirect: "/login/failed",
//   })
// );


//****/ */



  


router.get('/logout', (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      console.log(error)
      res.json({ success: false, message:'Error en el logout' })
    } else {
      //res.redirect('api/views/login')
      res.json({success: true, message:'Logout realizado con éxito'})
    }
  })
})



//------registro con Github

router.get(
  '/registroGithub',
  passport.authenticate('github', { scope: ['user:email'] })
)


router.get('/github/callback', passport.authenticate('github'),(req,res)=>{
  req.session.email = req.user.email
console.log(req.user)
  res.redirect(`http://localhost:3000`)
})

//--- obtener datos del usuario ---
router.get('/current', getUsersDataController)

router.post('/current', getUserDataFromMailController)

//---recuperar contraseña ---
router.post('/forgot-password', forgotPasswordController)

//---Crear nueva contraseña--
router.post('/create-new-password/:userId/:token', createNewPasswordController)

router.put('/premium/:uid', changeRolController)

router.put('/add-cart-to-user', addCartToUserController)

  export default router
