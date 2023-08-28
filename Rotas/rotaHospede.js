import { Router } from "express";
import HospedeCTRL from "../Controle/hospedeCTRL.js";

const rotaHospede = new Router();
const hospedeCtrl = new HospedeCTRL();
rotaHospede.post('/', hospedeCtrl.gravar)
.put('/', hospedeCtrl.atualizar)
.delete('/', hospedeCtrl.excluir)
.get('/', hospedeCtrl.consultar)
.get('/:nome', hospedeCtrl.consultarPeloNome);

export default rotaHospede;