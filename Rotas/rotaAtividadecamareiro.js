import { Router } from "express";
import AtividadecamareiroCTRL from "../Controle/atividadecamareiroCTRL.js";

const rotaAtividadecamareiro = new Router();
const atividadecamareiroCtrl = new AtividadecamareiroCTRL();
rotaAtividadecamareiro.post('/', atividadecamareiroCtrl.gravar)
.put('/', atividadecamareiroCtrl.atualizar)
.delete('/', atividadecamareiroCtrl.excluir)
.get('/', atividadecamareiroCtrl.consultar)
.get('/:nis_cam', atividadecamareiroCtrl.consultarPeloCPF);

export default rotaAtividadecamareiro;