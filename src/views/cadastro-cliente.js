import React from 'react'

import Card from '../components/card'
import FormGroup from '../components/form-group'
import { withRouter } from 'react-router-dom'

import ClienteService from '../app/service/clienteService'
import * as messages from '../components/toastr'
import { Mascaras } from '../util/mask'
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
        emails: [],
        emailsDTO: [],
        telefone: '',
        tipo: '',
        telefones: [],
        telefonesDTO: [],
        atualizando: false
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
                    
                    this.setState( {...response.data, atualizando: true, telefones: response.data.telefonesDTO, emails: response.data.emailsDTO } )
                    
                })
                .catch(erros => {
                    messages.mensagemErro('Erro ao tentar recuperar os dados do cliente')
                })
        }
    }

    handleChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;
        
        if (name==='cpf') { 
            this.setState({ [name] : Mascaras.CPF(value) })
        } else if (name==='cep') { 
            this.setState({ [name] : Mascaras.CEP(value) })
        } else if (name==='telefone') { 
            this.setState({ [name] : Mascaras.TELEFONE(value) })
        } 
        else this.setState({ [name] : value });
    }

    atualizar = () => {

        var { id, nome, cpf, cep, logradouro, complemento, bairro, cidade, uf, email, emails, telefone, telefones } = this.state 
        cpf = cpf.replace(/[^0-9]+/g,'')
        cep = cep.replace(/[^0-9]+/g,'')
        

        const cliente = { id, nome, cpf, cep, logradouro, complemento, bairro, cidade, uf, email, emails, telefone, telefones  }
        console.log(cliente)
        
        
        try{
            this.service.validar(cliente);
        }catch(erro){
            const msgs = erro.mensagens;
            msgs.forEach(msg =>messages.mensagemErro(msg));
            return false;
        }

        //console.log( cliente.id )
        this.service
            .atualizar(cliente)
            .then(response => {
               // validar(cliente)
                this.props.history.push('/consulta-clientes')
                messages.mensagemSucesso('Cliente atualizado com sucesso!')
            }).catch(erro => {
                messages.mensagemErro('Erro ao atualizar o Cliente')
                //console.log(cliente)
            })
    }

    consultaCep = () => {
        this.service
            .consultaCep(this.state.cep.replace(/[^0-9]+/g,''))
            .then(response => {
                const cepResponse = response.data;
                
                if(cepResponse.length < 1){
                    messages.mensagemAlert("Nenhum resultado encontrado.");
                }

                this.setState({ logradouro: cepResponse.logradouro })
                this.setState({ complemento: cepResponse.complemento })
                this.setState({ bairro: cepResponse.bairro })
                this.setState({ cidade: cepResponse.localidade })
                this.setState({ uf: cepResponse.uf })
                
            }).catch(erro => {
                messages.mensagemErro('Erro ao consultar o CEP')
                //console.log(cliente)
            })
    }

    cadastrar = () => {

        var { nome, cpf, cep, logradouro, complemento, bairro, cidade, uf, email, emails, telefone, telefones } = this.state 
        cpf = cpf.replace(/[^0-9]+/g,'')
        cep = cep.replace(/[^0-9]+/g,'')
        

        const cliente = {nome, cpf, cep, logradouro, complemento, bairro, cidade, uf, email, emails, telefone, telefones  }
        console.log(cliente)
        
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

    handleEmails = (event) => {

        if(!this.state.email) {
            messages.mensagemErro('Favor informe um e-mail.')
        }
        else if( !this.state.email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/) ){
            messages.mensagemErro('Informe um Email válido.')
        }
        else { 

            let toEmail = this.state.emails
            var newArr = {
                    email: this.state.email
                }
            toEmail.push(newArr)
            this.setState({emails: [...toEmail]})
            this.setState({email: ''})
        }
    }

    removeEmail = (index) => {
        let novoArray =  this.state.emails
        novoArray.splice(index, 1)
        this.setState({ emails: novoArray })
    }

    handleTelefones = (event) => {

        if(!this.state.telefone) {
            messages.mensagemErro('Favor informe um telefone.')
        }
        else { 

            let toTelefone = this.state.telefones
            var newArr = {
                    telefone: this.state.telefone.replace(/[^0-9]+/g,''),
                    telefoneFormatado: this.state.telefone,
                    tipo: this.state.tipo,
                }
            toTelefone.push(newArr)
            this.setState({telefones: [...toTelefone]})
            this.setState({telefone: ''})
        }
    }

    removeTelefone = (index) => {
        let novoArray =  this.state.telefones
        novoArray.splice(index, 1)
        this.setState({ telefones: novoArray })
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
                                       value={Mascaras.CPF(this.state.cpf)}
                                       onChange={this.handleChange} />
                            </FormGroup>
                            <FormGroup label="CEP: *" htmlFor="inputCEP">
                                <input type="text" 
                                       id="inputCEP" 
                                       className="form-control"
                                       name="cep"
                                       value={Mascaras.CEP(this.state.cep)}
                                       onChange={this.handleChange} />
                                <button onClick={this.consultaCep} type="button" className="btn btn-secondary">
                                    <i className="pi pi-times"></i> Consulta CEP
                                </button>
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
                                <select  className="form-control inputRound"
                                            name="tipo"
                                            value={this.state.tipo}
                                            onChange={this.handleChange}>
                                            <option value="RE">Residencial</option>
                                            <option value="CO">Comercial</option>
                                            <option value="CE">Celular</option>
                                        </select>
                                <button className="btn btn-secondary"
                                        onClick={this.handleTelefones}
                                        //style={{marginTop: '2.5rem'}}
                                        >ADICIONAR TELEFONE</button>
                                <div className="row" style={{padding: '2rem'}}>
                                    {
                                    this.state.telefones !== null && 
                                    this.state.telefones.map((item, index) => {
                                        const telefoneFormatado = Mascaras.TELEFONE(item.telefone)
                                        return (
                                            <div key={index}>
                                                    <div style={{padding: '1rem'}}>
                                                        <label onClick={() => this.removeTelefone(index)} >{telefoneFormatado} <label style={{color: 'red'}}>x</label></label>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </FormGroup>
                            <FormGroup label="Email: *" htmlFor="inputEmail">
                                <input type="email" 
                                       id="inputEmail"
                                       className="form-control"
                                       name="email"
                                       value={this.state.email}
                                       onChange={this.handleChange} />
                                <button className="btn btn-secondary"
                                        onClick={this.handleEmails}
                                        //style={{marginTop: '2.5rem'}}
                                        >ADICIONAR E-MAIL</button>
                                <div className="row" style={{padding: '2rem'}}>
                                    {
                                    this.state.emails !== null && 
                                    this.state.emails.map((item, index) => {
                                        return (
                                            <div key={index}>
                                                    <div style={{padding: '1rem'}}>
                                                        <label onClick={() => this.removeEmail(index)} >{item.email} <label style={{color: 'red'}}>x</label></label>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
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