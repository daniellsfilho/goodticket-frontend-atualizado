export enum URI {

    // ATUALIZAÇÕES DE USUÁRIOS
    UPDATE_CHAMADOS = '/chamado/atualizar',

    // ROTAS DE CHAMADOS
    CHAMADOS = 'https://goodticket-backend.herokuapp.com/chamados',
    DELETAR_CHAMADOS = 'https://goodticket-backend.herokuapp.com/chamado/deletar',
    INSERT_CHAMADOS = 'https://goodticket-backend.herokuapp.com/chamado/inserir',
    CHAMADOS_FECHADOS = 'https://goodticket-backend.herokuapp.com/chamados/fechados',
    CHAMADOS_ABERTOS = 'https://goodticket-backend.herokuapp.com/chamados/abertos',
    CHAMADOS_EM_ANDAMENTO = 'https://goodticket-backend.herokuapp.com/chamados/em-andamento',
    CHAMADOS_ABERTOS_EM_ANDAMENTO = 'https://goodticket-backend.herokuapp.com/chamados/abertos-em-andamento',
    SOLUCOES_CHAMADOS = 'http://localhost:8080/chamado/solucoes',


    // ROTAS DE USUÁRIOS
    USUARIOS = 'https://goodticket-backend.herokuapp.com/usuarios',
    LOGIN_USUARIOS = '/usuario/autenticar',
    INSERT_USUARIOS = 'https://goodticket-backend.herokuapp.com/cadastro',
    SENHA_REDEFINIR = '/redefinirSenha'
}
