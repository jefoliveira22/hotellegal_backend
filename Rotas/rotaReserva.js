import { Router } from "express";
import ReservaCTRL from "../Controle/reservaCTRL.js";

const rotaReserva = new Router();
const reservaCtrl = new ReservaCTRL();
rotaReserva.post('/', reservaCtrl.gravar)
.put('/', reservaCtrl.atualizar)
.put('/baixar', reservaCtrl.baixarumaReserva)
.delete('/', reservaCtrl.excluir)
.get('/', reservaCtrl.consultar)
.get('/ultimo/', reservaCtrl.consultarPeloUltimoID)
.get('/:id_reserva', reservaCtrl.consultarPeloID)
.get('/:checkin', reservaCtrl.consultarPeloPeriodo)
.get('/:cpf_hosp', reservaCtrl.consultarPeloHospede)
.get('/:ativo', reservaCtrl.consultarPeloStatus);

export default rotaReserva;