const express = require("express");
const app = express();
const PORT = 4000;

const { v4: uuid } = require("uuid");

const usuarios = [
  {
    id: 1,
    nombre: "Jesus",
    apellido: "Fernandez",
    username: "jfernandez",
  },
  {
    id: 2,
    nombre: "Maria",
    apellido: "Perez",
    username: "mperez",
  },
];

app.use(express.json());

app.get("/", (req, res) => {
  return res.json({
    msg: "Lista de usuarios obtenida",
    data: usuarios,
  });
});

app.get("/:id", (req, res) => {
  const { id } = req.params;

  const usuarioEncontrado = usuarios.find((usuario) => {
    return usuario.id === id;
  });

  return res.json({
    msg: "Usuario encontrado",
    data: usuarioEncontrado,
  });
});

app.post("/", (req, res) => {
  const { nombre, apellido, username } = req.body;

  const usuario = {
    id: uuid(),
    nombre: nombre,
    apellido: apellido,
    username: username,
  };

  usuarios.push(usuario);

  return res.json({
    msg: "Usuario creado",
    data: usuario,
  });
});

app.put("/:id", (req, res) => {
  const { id } = req.params;
  const { nombre, apellido, username } = req.body;

  const usuarioEncontrado = usuarios.find((usuario) => {
    return usuario.id === id;
  });

  usuarioEncontrado.nombre = nombre;
  usuarioEncontrado.apellido = apellido;
  usuarioEncontrado.username = username;

  return res.json({
    msg: "Usuario actualizado",
    data: usuarioEncontrado,
  });
});

app.delete("/:id", (req, res) => {
  const { id } = req.params;

  const usuarioEncontrado = usuarios.find((usuario) => {
    return usuario.id === id;
  });

  usuarios.splice(usuarios.indexOf(usuarioEncontrado), 1);

  return res.json({
    msg: "Usuario eliminado",
    data: usuarioEncontrado,
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
