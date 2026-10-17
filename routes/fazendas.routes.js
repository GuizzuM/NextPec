import { Router } from 'express';
import {
    listar,
    exibirFormCadastro,
    cadastrarFazenda,
    exibirFormEdicao,
    atualizarFazendaHandler,
    deletarFazendaHandler
} from '../controllers/fazendas.controller.js';

const router = Router();

router.get('/listaFazendas',     listar);
router.get('/novo',              exibirFormCadastro);
router.post('/cadastrarFazenda', cadastrarFazenda);
router.get('/editar/:id',        exibirFormEdicao);
router.post('/atualizar/:id',    atualizarFazendaHandler);
router.post('/excluir/:id',      deletarFazendaHandler);

export default router;