import { Router } from "express";
import FornecedorCTRL from "../Controle/fornecedorCTRL.js";

const rotaFornecedor = new Router();
const fornecedorCtrl = new FornecedorCTRL();
rotaFornecedor
.post('/', fornecedorCtrl.gravar)
.put('/', fornecedorCtrl.atualizar)
.delete('/', fornecedorCtrl.excluir)
.get('/', fornecedorCtrl.consultar)
.get('/:nome', fornecedorCtrl.consultarPeloNome);

export default rotaFornecedor;