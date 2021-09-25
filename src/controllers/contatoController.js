const Contato = require("../models/ContatoModel");
exports.index = (req, res) => {
  res.render("contato", {
    contato: {},
  });
};

exports.register = async (req, res) => {
  try {
    const contato = new Contato(req.body);
    await contato.register();

    if (contato.errors.length > 0) {
      req.flash("errors", contato.errors);
      req.session.save(() => res.redirect("/contato"));
      return;
    }

    req.flash("success", "Contato registrado com sucesso");
    req.session.save(() => res.redirect(`/contato/${contato.contato._id}`));
    return;
  } catch (error) {
    console.log(error);
    return res.send("404");
  }
};

exports.editIndex = async (req, res) => {
  const contato = new Contato(req.body);
  if (!req.params.id) return res.render("404");

  const user = await contato.buscaPorId(req.params.id);
  if (!user) return res.render("404");

  res.render("contato", {
    contato: user,
  });
};
