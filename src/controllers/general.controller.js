const homeController = (req, res) => {
  return res.render('index');
}

const signupController = (req, res) => {
  return res.render('signup');
}

const welcomeController = (req, res) => {
  const userLog = req.user;
  return res.render('welcome', { userLog });
} 

const formAddProductController = (req, res) => {
  const userLog = req.user;
  return res.render('product-admin', { userLog });
}

const errorController = (req, res) => {
  const msgError = req.params.msg;
  return res.render('error-view', { msgError });
}

export {
  homeController,
  signupController,
  welcomeController,
  formAddProductController,
  errorController
};