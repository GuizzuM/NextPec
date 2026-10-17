import {
    listarFazendas,
    obterFazendaPorId,
    criarFazenda,
    atualizarFazenda,
    deletarFazenda
} from '../models/fazendasModel.js';


export async function listar(req, res) {
    try {
        const fazendas = await listarFazendas();
        res.render('fazendas/listaFazendas', { fazendas });
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao buscar fazendas no banco');
    }
}

export async function exibirFormCadastro(req, res) {
    try {
        res.render('fazendas/cadastroFazendas');
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao carregar formulário');
    }
}

export async function cadastrarFazenda(req, res) {
    const { fazenda } = req.body;

    if (!fazenda) {
        req.flash('req_status',  'fail');
        req.flash('req_message', 'O nome da fazenda é obrigatório!');
        return res.redirect('/fazendas/novo');
    }

    try {
        await criarFazenda({ fazenda });

        req.flash('req_status',  'success');
        req.flash('req_message', `Fazenda "${fazenda}" cadastrada com sucesso!`);
        res.redirect('/fazendas/listaFazendas');

    } catch (err) {
        console.error("Erro ao cadastrar fazenda:", err);
        req.flash('req_status',  'fail');
        req.flash('req_message', 'Erro ao cadastrar! Código: ' + (err.code || 'Desconhecido'));
        res.redirect('/fazendas/novo');
    }
}

export async function exibirFormEdicao(req, res) {
    try {
        const fazenda = await obterFazendaPorId(req.params.id);

        if (!fazenda) {
            req.flash('req_status',  'fail');
            req.flash('req_message', 'Fazenda não encontrada!');
            return res.redirect('/fazendas/listaFazendas');
        }

        res.render('fazendas/editarFazendas', { fazenda });

    } catch (err) {
        console.error("Erro ao buscar fazenda:", err);
        req.flash('req_status',  'fail');
        req.flash('req_message', 'Erro ao buscar fazenda!');
        res.redirect('/fazendas/listaFazendas');
    }
}

export async function atualizarFazendaHandler(req, res) {
    const id = req.params.id;
    const { fazenda } = req.body;

    if (!fazenda) {
        req.flash('req_status',  'fail');
        req.flash('req_message', 'O nome da fazenda é obrigatório!');
        return res.redirect(`/fazendas/editar/${id}`);
    }

    try {
        const linhas = await atualizarFazenda(id, { fazenda });

        if (linhas === 0) {
            req.flash('req_status',  'fail');
            req.flash('req_message', 'Fazenda não encontrada!');
            return res.redirect('/fazendas/listaFazendas');
        }

        req.flash('req_status',  'success');
        req.flash('req_message', `Fazenda "${fazenda}" atualizada com sucesso!`);
        res.redirect('/fazendas/listaFazendas');

    } catch (err) {
        console.error("Erro ao atualizar fazenda:", err);
        req.flash('req_status',  'fail');
        req.flash('req_message', 'Erro ao atualizar! Código: ' + (err.code || 'Desconhecido'));
        res.redirect(`/fazendas/editar/${id}`);
    }
}

export async function deletarFazendaHandler(req, res) {
    const id = req.params.id;

    try {
        const fazenda = await obterFazendaPorId(id);

        if (!fazenda) {
            req.flash('req_status',  'fail');
            req.flash('req_message', 'Fazenda não encontrada!');
            return res.redirect('/fazendas/listaFazendas');
        }

        await deletarFazenda(id);

        req.flash('req_status',  'success');
        req.flash('req_message', `Fazenda "${fazenda.fazenda}" excluída com sucesso!`);
        res.redirect('/fazendas/listaFazendas');

    } catch (err) {
        console.error("Erro ao deletar fazenda:", err);
        req.flash('req_status',  'fail');
        req.flash('req_message', 'Erro ao deletar! Código: ' + (err.code || 'Desconhecido'));
        res.redirect('/fazendas/listaFazendas');
    }
}