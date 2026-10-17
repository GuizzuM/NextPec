import { 
    listarAnimais, 
    criarAnimal, 
    listarFazendas, 
    obterAnimalPorId, 
    atualizarAnimal, 
    deletarAnimal 
} from '../models/animaisModel.js';

//listar animais ##
export async function listar(req, res) {
    try {
        const animais  = await listarAnimais();
        const fazendas = await listarFazendas();
        res.render('animais/listaAnimais', { animais, fazendas });
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao buscar animais no banco');
    }
}

// exibir formulário de cadastro ##
export async function exibirFormCadastro(req, res) {
    try {
        const fazendas = await listarFazendas();
        res.render('animais/cadastroAnimais', { fazendas });
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao carregar formulário');
    }
}

// castrar animal ##
export async function cadastrarAnimal(req, res) {
    const { 
        sisbov, raca, faixa_etaria, 
        id_fazenda, peso_atual, 
        dataEntrega, horaEntrega 
    } = req.body;

    if (!sisbov || !raca || !id_fazenda || !dataEntrega) {
        req.flash('req_status',  'fail');
        req.flash('req_message', 'SISBOV, Raça, Fazenda e Data são obrigatórios!');
        return res.redirect('/animais/listaAnimais');
    }

    try {
        await criarAnimal({ 
            sisbov, raca, faixa_etaria, id_fazenda,
            peso_atual:  peso_atual  || 0,
            dataEntrega,
            horaEntrega: horaEntrega || '00:00:00'
        });

        req.flash('req_status',  'success');
        req.flash('req_message', `Animal ${sisbov} cadastrado com sucesso!`);
        res.redirect('/animais/listaAnimais');

    } catch (err) {
        console.error("Erro ao cadastrar animal:", err);
        req.flash('req_status',  'fail');
        req.flash('req_message', 'Erro ao cadastrar! Código: ' + (err.code || 'Desconhecido'));
        res.redirect('/animais/listaAnimais');
    }
}

// exibir formulário de edição ##
export async function exibirFormEdicao(req, res) {
    try {
        const animal   = await obterAnimalPorId(req.params.id);
        const fazendas = await listarFazendas();

        if (!animal) {
            req.flash('req_status',  'fail');
            req.flash('req_message', 'Animal não encontrado!');
            return res.redirect('/animais/listaAnimais');
        }

        res.render('animais/editarAnimais', { animal, fazendas });

    } catch (err) {
        console.error("Erro ao buscar animal:", err);
        req.flash('req_status',  'fail');
        req.flash('req_message', 'Erro ao buscar animal!');
        res.redirect('/animais/listaAnimais');
    }
}

// atualizar animal ##
export async function atualizarAnimalHandler(req, res) {
    const id = req.params.id;
    const { 
        sisbov, raca, faixa_etaria, 
        id_fazenda, peso_atual, 
        dataEntrega, horaEntrega 
    } = req.body;

    if (!sisbov || !raca || !id_fazenda || !dataEntrega) {
        req.flash('req_status',  'fail');
        req.flash('req_message', 'SISBOV, Raça, Fazenda e Data são obrigatórios!');
        return res.redirect(`/animais/editar/${id}`);
    }

    try {
        await atualizarAnimal(id, { 
            sisbov, raca, faixa_etaria, id_fazenda,
            peso_atual:  peso_atual  || 0,
            dataEntrega,
            horaEntrega: horaEntrega || '00:00:00'
        });

        req.flash('req_status',  'success');
        req.flash('req_message', `Animal ${sisbov} atualizado com sucesso!`);
        res.redirect('/animais/listaAnimais');

    } catch (err) {
        console.error("Erro ao atualizar animal:", err);
        req.flash('req_status',  'fail');
        req.flash('req_message', 'Erro ao atualizar! Código: ' + (err.code || 'Desconhecido'));
        res.redirect(`/animais/editar/${id}`);
    }
}

//deletar animal ##
export async function deletarAnimalHandler(req, res) {
    const id = req.params.id;

    try {
        const animal = await obterAnimalPorId(id);

        if (!animal) {
            req.flash('req_status',  'fail');
            req.flash('req_message', 'Animal não encontrado!');
            return res.redirect('/animais/listaAnimais');
        }

        await deletarAnimal(id);

        req.flash('req_status',  'success');
        req.flash('req_message', `Animal #${id} deletado com sucesso!`);
        res.redirect('/animais/listaAnimais');

    } catch (err) {
        console.error("Erro ao deletar animal:", err);
        req.flash('req_status',  'fail');
        req.flash('req_message', 'Erro ao deletar! Código: ' + (err.code || 'Desconhecido'));
        res.redirect('/animais/listaAnimais');
    }
}

// editar animal (API) ##
export async function editarAnimal(req, res) {
    try {
        const animal = await obterAnimalPorId(req.params.id);
        if (!animal) {
            return res.status(404).json({ status: 'fail', message: 'Animal não encontrado!' });
        }
        res.json({ status: 'success', data: animal });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 'fail', message: 'Erro ao buscar animal!' });
    }
}