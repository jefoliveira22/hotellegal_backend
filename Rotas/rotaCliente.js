import { Router } from "express";
import ClienteCTRL from "../Controle/clienteCTRL.js";

const rotaCliente = new Router();
const clienteCtrl = new ClienteCTRL();
rotaCliente
.post('/', clienteCtrl.gravar)
.put('/', clienteCtrl.atualizar)
.get('/', clienteCtrl.consultar)
.get('/:nome', clienteCtrl.consultarPeloNome)
.get('/login/:email', clienteCtrl.consultarPeloEmail);

export default rotaCliente;