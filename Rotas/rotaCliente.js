import { Router } from "express";
import ClienteCTRL from "../Controle/clienteCTRL.js";

const rotaCliente = new Router();
const clienteCtrl = new ClienteCTRL();
rotaCliente
.post('/', clienteCtrl.gravar)
.put('/', clienteCtrl.atualizar)
.delete('/', clienteCtrl.excluir)
.get('/', clienteCtrl.consultar)
.get('/:nome', clienteCtrl.consultarPeloNome);

export default rotaCliente;