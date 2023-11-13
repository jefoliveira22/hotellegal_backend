import { Router } from "express";
import HospedagemCTRL from "../Controle/hospedagemCTRL.js";

const rotaHospedagem = new Router();
const hospedagemCtrl = new HospedagemCTRL();
rotaHospedagem.post('/', hospedagemCtrl.gravar)
.put('/', hospedagemCtrl.atualizar)
.delete('/', hospedagemCtrl.excluir)
.get('/', hospedagemCtrl.consultar)
.get('/:id', hospedagemCtrl.consultarPeloID)
.get('/:data_ini', hospedagemCtrl.consultarPeloPeriodo)
.get('/:h_ativo', hospedagemCtrl.consultarPeloStatus);

export default rotaHospedagem;