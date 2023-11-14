import { Router } from "express";
import ReservaCTRL from "../Controle/reservaCTRL.js";

const rotaReserva = new Router();
const reservaCtrl = new ReservaCTRL();
rotaReserva.post('/', reservaCtrl.gravar)
.put('/', reservaCtrl.atualizar)
.put('/baixar', reservaCtrl.baixarumaReserva)
.delete('/', reservaCtrl.excluir)
.get('/', reservaCtrl.consultar)
.get('/:id_reserva', reservaCtrl.consultarPeloID)
.get('/ultimo/', reservaCtrl.consultarPeloUltimoID)
.post('/periodo', reservaCtrl.consultarPeloPeriodo)
.get('/cpf/:cpf_hosp', reservaCtrl.consultarPeloHospede)
.get('/status/:ativo', reservaCtrl.consultarPeloStatus);

export default rotaReserva;