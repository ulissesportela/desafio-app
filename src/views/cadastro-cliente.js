import React from 'react'

import Card from '../components/card'
import FormGroup from '../components/form-group'
import { withRouter } from 'react-router-dom'

import ClienteService from '../app/service/clienteService'
import * as messages from '../components/toastr'

class CadastroCliente extends React.Component{

    state = {
        id : '',
        nome : '',
        cpf : '',
        cep : '',
        logradouro : '',
        complemento : '',
        bairro : '',
        cidade : '',
        uf : '',
        email: '', 
        telefone: '',
        atualizando: false,
        emails: []
    }
    
    constructor(){
        super();
        this.service = new ClienteService();
    }
    

    componentDidMount(){
 
        let resultado = this.props.location.pathname.split("/");
        const id = resultado[2]
        //console.log(id)
        //const params = this.props.match.params
        if(id){
            this.service
                .obterPorId(id)
                .then(response => {
                    this.setState( {...response.data , atualizando: true} )
                })
                .catch(erros => {
                    messages.mensagemErro(erros.response.data)
                })
        }
    }

    handleChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;

        this.setState({ [name] : value })
    }

    atualizar = () => {
        const {
            id, nome, cpf, cep, logradouro, complemento, bairro, cidade, uf, email, telefone 
        } = this.state        
        const cliente = {
            id, nome, cpf, cep, logradouro, complemento, bairro, cidade, uf, email, telefone  
        }
        
        try{
            this.service.validar(cliente);
        }catch(erro){
            const msgs = erro.mensagens;
            msgs.forEach(msg =>messages.mensagemErro(msg));
            return false;
        }

        console.log( cliente.id )
        this.service
            .atualizar(cliente)
            .then(response => {
               // validar(cliente)
                this.props.history.push('/consulta-clientes')
                messages.mensagemSucesso('Cliente atualizado com sucesso!')
            }).catch(erro => {
                messages.mensagemErro('Erro ao cadastrar o Cliente')
                console.log(cliente)
            })
    }

    cadastrar = () => {
        const {nome, cpf, cep, logradouro, complemento, bairro, cidade, uf, email, telefone } = this.state        
        const cliente = {nome, cpf, cep, logradouro, complemento, bairro, cidade, uf, email, telefone  }

        try{
            this.service.validar(cliente);
        }catch(erro){
            const msgs = erro.mensagens;
            msgs.forEach(msg =>messages.mensagemErro(msg));
            return false;
        }

        this.service.salvar(cliente)
            .then( response => {
                messages.mensagemSucesso('Cliente cadastrado com sucesso!')
                this.props.history.push('/consulta-clientes')
            }).catch(error => {
                messages.mensagemErro(error.response.data)
            })
    }

    cancelar = () => {
        this.props.history.push('/consulta-clientes')
    }

    render(){

        return (
            <Card title="Cadastro de Cliente">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="bs-component">
                            <FormGroup label="Nome: *" htmlFor="inputNome">
                            <input type="hidden" 
                                       name="id"
                                       value={this.state.id}
                                       onChange={this.handleChange} />
                                <input type="text" 
                                       id="inputNome" 
                                       className="form-control"
                                       name="nome"
                                       value={this.state.nome}
                                       onChange={this.handleChange} />
                            </FormGroup>
                            <FormGroup label="CPF: *" htmlFor="inputCPF">
                                <input type="text" 
                                       id="inputCPF" 
                                       className="form-control"
                                       name="cpf"
                                       value={this.state.cpf}
                                       onChange={this.handleChange} />
                            </FormGroup>
                            <FormGroup label="CEP: *" htmlFor="inputCEP">
                                <input type="text" 
                                       id="inputCEP" 
                                       className="form-control"
                                       name="cep"
                                       value={this.state.cep}
                                       onChange={this.handleChange} />
                            </FormGroup>
                            <FormGroup label="Logradouro: *" htmlFor="inputLogradouro">
                                <input type="text" 
                                       id="inputLogradouro" 
                                       className="form-control"
                                       name="logradouro"
                                       value={this.state.logradouro}
                                       onChange={this.handleChange} />
                            </FormGroup>
                            <FormGroup label="Complemento:" htmlFor="inputComplemento">
                                <input type="text" 
                                       id="inputComplemento" 
                                       className="form-control"
                                       name="complemento"
                                       value={this.state.complemento}
                                       onChange={this.handleChange} />
                            </FormGroup>
                            <FormGroup label="Bairro: *" htmlFor="inputBairro">
                                <input type="text" 
                                       id="inputBairro" 
                                       className="form-control"
                                       name="bairro"
                                       value={this.state.bairro}
                                       onChange={this.handleChange} />
                            </FormGroup>
                            <FormGroup label="Cidade: *" htmlFor="inputCidade">
                                <input type="text" 
                                       id="inputCidade" 
                                       className="form-control"
                                       name="cidade"
                                       value={this.state.cidade}
                                       onChange={this.handleChange} />
                            </FormGroup>
                            <FormGroup label="UF: *" htmlFor="inputUF">
                                <input type="text" 
                                       id="inputUF" 
                                       className="form-control"
                                       name="uf"
                                       value={this.state.uf}
                                       onChange={this.handleChange} />
                            </FormGroup>
                            <FormGroup label="Telefone: *" htmlFor="inputTelefone">
                                <input type="text" 
                                       id="inputTelefone"
                                       className="form-control"
                                       name="telefone"
                                       value={this.state.telefone}
                                       onChange={this.handleChange} />
                            </FormGroup>
                            <FormGroup label="Email: *" htmlFor="inputEmail">
                                <input type="email" 
                                       id="inputEmail"
                                       className="form-control"
                                       name="email"
                                       value={this.state.email}
                                       onChange={this.handleChange} />
                                </FormGroup>
                        </div>
                    </div>
                </div>
                <div className="row">
                     <div className="col-md-6" >
                        { this.state.atualizando ? 
                            (
                                <button onClick={this.atualizar} 
                                        className="btn btn-success">
                                        <i className="pi pi-refresh"></i> Atualizar
                                </button>
                            ) : (
                                <button onClick={this.cadastrar} 
                                        className="btn btn-success">
                                        <i className="pi pi-save"></i> Salvar
                                </button>
                            )
                        }
                            <button onClick={this.cancelar} type="button" className="btn btn-danger">
                                <i className="pi pi-times"></i> Cancelar
                            </button>
                    </div>
                </div>
            </Card>
        )
    }
}

export default withRouter( CadastroCliente )