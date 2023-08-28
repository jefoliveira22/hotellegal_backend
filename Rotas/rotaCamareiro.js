import { Router } from "express";
import CamareiroCTRL from "../Controle/camareiroCTRL.js";

const rotaCamareiro = new Router();
const camareiroCtrl = new CamareiroCTRL();
rotaCamareiro.post('/', camareiroCtrl.gravar)
.put('/', camareiroCtrl.atualizar)
.delete('/', camareiroCtrl.excluir)
.get('/', camareiroCtrl.consultar)
.get('/:cpf_cam', camareiroCtrl.consultarPeloCPF);

export default rotaCamareiro;