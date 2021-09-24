const Login = require("../models/LoginModel");

exports.index = (req, res) => {
  if(req.session.user) return res.render("login-logado");
  return res.render("login");
};

exports.register = async (req, res) => {
  try {
    const login = new Login(req.body)
    await login.register();

    if (login.errors.length > 0) {
      req.flash("errors", login.errors);
      req.session.save(function () {
        res.redirect("/login");
      });
      return;
    }
    req.flash("success", "Seu usuário foi criado com sucesso!");
    req.session.save(() => res.redirect("/login"));
    return;
  } catch (error) {
    res.render("404");
    console.log(error);
    return;
  }
};

exports.login = async (req, res) => {
  try {
    const login = new Login(req.body)
    await login.login();

    if (login.errors.length > 0) {
      req.flash("errors", login.errors);
      req.session.save(function () {
        res.redirect("/login");
      });
      return;
    }

    req.flash("success", "Login efetuado com sucesso!");
    req.session.user = login.user;
    req.session.save(function () {
      res.redirect("/login");
    });
  } catch (error) {
    res.render("404");
    console.log(error);
    return;
  }
};

exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect("/");
}