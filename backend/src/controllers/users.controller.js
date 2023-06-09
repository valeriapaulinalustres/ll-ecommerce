import {
  createUserService,
  loginUserService,
  getUsersDataService,
  forgotPasswordService,
  createNewPasswordServices,
  changeRolServices,
  getUserDataFromMailService,
  addCartToUserService,
  uploadFilesService
} from "../services/users.services.js";

export const logoutController = (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      console.log(error);
      res.json({ message: error });
    } else {
      res.redirect("/api/views/login");
    }
  });
};

export const getUsersDataController = async (req, res) => {
  try {
    
    const user = req.user;
    console.log('entra', user)
    console.log("mail de usuario", user.email);
    //const userData = await getUsersDataService(user)
    res.json({ usersMail: user.email, userFullname: user.full_name, user, existUser: true });
  } catch (error) {
    console.log("error");
  }
};

export const getUserDataFromMailController = async (req, res) => {
  const email = req.body
  try {
    const response = await getUserDataFromMailService(email)
    res.json({user: response})
  } catch (error) {
    console.log('error');
  }
}

export const forgotPasswordController = async (req, res) => {
  try {
    const mail = req.body.email;
    console.log("mail", mail);
    if (req.body.email == "") {
      res.status(400).send({ message: "Se requiere un mail" });
    } else {
      const user = await forgotPasswordService(mail);
      res.send({ mensaje: "email enviado con éxito", user });
    }
  } catch (error) {
    console.log("error");
  }
};

export const createNewPasswordController = async (req, res) => {
  console.log(req.body.password);
  console.log(req.params.userId, req.params.token);
  let regExPassword =
    /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])([A-Za-z\d@$!%*?&#]){8,16}&/;
  //     if (!regExPassword.test(req.body.password))
  //   {res.send({
  //     message: 'The password must contain at least: between 8 and 16 characters, 1 number, 1 lowercase letter, 1 capital letter and 1 special character.'
  //   })
  // return
  // }
  try {
    const user = await createNewPasswordServices(
      req.body.password,
      req.params.userId,
      req.params.token
    );
    console.log(user);
    res.json({ message: 'Password update successfully', user });
  } catch (error) {
    console.log("error");
  }
};

export const changeRolController = async (req,res) => {
  const userId = req.params.uid
try {
  const user = await changeRolServices(userId)
  console.log(user)
  res.json({ message: 'Role update successfully' });
} catch (error) {
  console.log("error");
}

  
}


export const addCartToUserController = async (req,res) => {
  const userId = req.body.uid
  const cartId = req.body.cid
try {
  const user = await addCartToUserService(userId, cartId)
  console.log(user)
  res.json({ message: 'User update successfully' });
} catch (error) {
  console.log("error");
}

  
}

export const uploadFilesController = async (req,res) => {
  const userId = req.params.uid
  const documents = req.files
console.log(documents)
try {
  const user = await uploadFilesService(userId, documents)
  console.log(user)
  res.json({ message: 'Documents uploaded successfully' });
} catch (error) {
  console.log("error");
}

  
}