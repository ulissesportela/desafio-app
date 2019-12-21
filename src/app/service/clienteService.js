import ApiService from '../apiService'

import ErroValidacao from '../exception/ErroValidacao'
import { mensagemErro } from '../../components/toastr';

class ClienteService extends ApiService {

    constructor(){
        super('/api/clientes')
    }

    salvar(cliente){
        const errosValidacao = this.validar(cliente)
        if (errosValidacao && errosValidacao.length >0) {
            errosValidacao.forEach((erroMsg, ingex) => {
                mensagemErro(erroMsg)
            });
            return false
        } else return this.post('/', cliente)
    }

    atualizar(cliente){
        return this.put(`/${cliente.id}`, cliente);
    }

    consultar(clienteFiltro){
        let params = ''

        if(clienteFiltro.nome){
            params = `?nome=${clienteFiltro.nome}`
        }

        return this.get(params);
    }

    obterPorId(id){
        return this.get(`/${id}`);
    }

    validar(cliente) {
        const erros = [];

        if(!cliente.nome){
            erros.push('O campo Nome é obrigatório.')
        }
        
        if(!cliente.cpf){
            erros.push('O campo CPF é obrigatório.')
        }

        if(!cliente.cep){
            erros.push('O campo CEP é obrigatório.')
        }

        if(!cliente.logradouro){
            erros.push('O campo Logradouro é obrigatório.')
        }

        if(!cliente.bairro){
            erros.push('O campo Bairro é obrigatório.')
        }

        if(!cliente.cidade){
            erros.push('O campo Cidade é obrigatório.')
        }

        if(!cliente.uf){
            erros.push('O campo UF é obrigatório.')
        }

        if(!cliente.telefone){
            erros.push('O campo Telefone é obrigatório.')
        }

        if(!cliente.email){
            erros.push('O campo Email é obrigatório.')
        }else if( !cliente.email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/) ){
            erros.push('Informe um Email válido.')
        }

        if(erros && erros.length > 0){
            throw new ErroValidacao(erros);
        }
        
    }

    deletar(id){
        return this.delete(`/${id}`)
    }
}

export default ClienteService;