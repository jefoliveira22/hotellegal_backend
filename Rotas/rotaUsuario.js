import { Router } from "express";
import UsuarioCTRL from "../Controle/usuarioCTRL.js";

const rotaUsuario = new Router();
const usuarioCtrl = new UsuarioCTRL();
rotaUsuario.post('/', usuarioCtrl.gravar)
// .put('/', usuarioCtrl.atualizar)
// .delete('/', usuarioCtrl.excluir)
.get('/', usuarioCtrl.consultar)
// .get('/:usuario_id', usuarioCtrl.consultarID);

export default rotaUsuario;