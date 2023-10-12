import { Router } from "express";
import UsuarioCTRL from "../Controle/usuarioCTRL.js";

const rotaUsuario = new Router();
const usuarioCtrl = new UsuarioCTRL();
rotaUsuario.post('/', usuarioCtrl.gravar)
.delete('/', usuarioCtrl.excluir)
.get('/', usuarioCtrl.consultar)

export default rotaUsuario;