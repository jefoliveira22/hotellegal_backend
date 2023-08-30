import { Router } from "express";
import UserCTRL from "../Controle/userCTRL.js";

const rotaLogin = new Router();
const userCTRL = new UserCTRL();
rotaLogin.post('/', userCTRL.gravar)
.put('/', userCTRL.atualizar)
.delete('/', userCTRL.excluir)
.get('/', userCTRL.consultar)
.get('/:logincpf', userCTRL.consultarPeloNome);

export default rotaLogin;