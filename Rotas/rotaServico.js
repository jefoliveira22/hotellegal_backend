import { Router } from "express";
import ServicoCTRL from "../Controle/servicoCTRL.js";

const rotaServico = new Router();
const servicoCtrl = new ServicoCTRL();
rotaServico.post('/', servicoCtrl.gravar)
.put('/', servicoCtrl.atualizar)
.delete('/', servicoCtrl.excluir)
.get('/', servicoCtrl.consultar)
.get('/:nome_serv', servicoCtrl.consultarPeloNome);

export default rotaServico;