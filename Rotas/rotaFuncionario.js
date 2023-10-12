import { Router } from "express";
import FuncionarioCTRL from "../Controle/funcionarioCTRL.js";

const rotaFuncionario = new Router();
const funcionarioCtrl = new FuncionarioCTRL();
rotaFuncionario
.post('/', funcionarioCtrl.gravar)
.delete('/', funcionarioCtrl.excluir)
.get('/', funcionarioCtrl.consultar)
.put('/', funcionarioCtrl.atualizar)
// .put('/baixar', reservaCtrl.baixarumaReserva)
// .get('/ultimo/', reservaCtrl.consultarPeloUltimoID)
// .get('/:id_reserva', reservaCtrl.consultarPeloID);

export default rotaFuncionario;