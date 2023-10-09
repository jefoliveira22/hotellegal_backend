import { Router } from "express";
import ClienteCTRL from "../Controle/clienteCTRL.js";

const rotaCliente = new Router();
const clienteCtrl = new ClienteCTRL();
rotaCliente
.post('/', clienteCtrl.gravar)
.delete('/', clienteCtrl.excluir)
.get('/', clienteCtrl.consultar)
// .put('/', reservaCtrl.atualizar)
// .put('/baixar', reservaCtrl.baixarumaReserva)
// .get('/ultimo/', reservaCtrl.consultarPeloUltimoID)
// .get('/:id_reserva', reservaCtrl.consultarPeloID);

export default rotaCliente;