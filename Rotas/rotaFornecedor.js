import { Router } from "express";
import FornecedorCTRL from "../Controle/fornecedorCTRL.js";

const rotaFornecedor = new Router();
const fornecedorCtrl = new FornecedorCTRL();
rotaFornecedor
.post('/', fornecedorCtrl.gravar)
.delete('/', fornecedorCtrl.excluir)
.get('/', fornecedorCtrl.consultar)
// .put('/', reservaCtrl.atualizar)
// .put('/baixar', reservaCtrl.baixarumaReserva)
// .get('/ultimo/', reservaCtrl.consultarPeloUltimoID)
// .get('/:id_reserva', reservaCtrl.consultarPeloID);

export default rotaFornecedor;