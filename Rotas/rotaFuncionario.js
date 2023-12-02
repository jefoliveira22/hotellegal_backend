import { Router } from "express";
import FuncionarioCTRL from "../Controle/funcionarioCTRL.js";

const rotaFuncionario = new Router();
const funcionarioCtrl = new FuncionarioCTRL();
rotaFuncionario
.post('/', funcionarioCtrl.gravar)
.get('/', funcionarioCtrl.consultar)
.put('/', funcionarioCtrl.atualizar)
.get('/:nome', funcionarioCtrl.consultarPeloNome)
.get('/login/:email', funcionarioCtrl.consultarPeloEmail);

export default rotaFuncionario;