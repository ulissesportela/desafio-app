import React from 'react'

import Card from '../components/card'
import FormGroup from '../components/form-group'
import { withRouter } from 'react-router-dom'

import ClienteService from '../app/service/clienteService'
import * as messages from '../components/toastr'
import { Mascaras } from '../util/mask'
class VisualizarCliente extends React.Component{
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

    cancelar = () => {
        this.props.history.push('/consulta-clientes')
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
                    this.setState( {...response.data } )
                })
                .catch(erros => {
                    messages.mensagemErro('Erro ao tentar recuperar os dados do cliente')
                })
        }
    }

    render(){

        return (
            <Card title="Visualizar de Cliente">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="bs-component">
                            <FormGroup label="Nome: *" htmlFor="inputNome">
                            <input type="hidden" 
                                       name="id"
                                       value={this.state.id}
                                       onChange={this.handleChange} />
                                <input type="text"
                                        disabled={true}
                                       id="inputNome" 
                                       className="form-control"
                                       name="nome"
                                       value={this.state.nome} />
                            </FormGroup>
                            <FormGroup label="CPF: *" htmlFor="inputCPF">
                                <input type="text" 
                                        disabled={true}
                                       id="inputCPF" 
                                       className="form-control"
                                       name="cpf"
                                       value={Mascaras.CPF(this.state.cpf)} />
                                       
                            </FormGroup>
                            <FormGroup label="CEP: *" htmlFor="inputCEP">
                                <input type="text" 
                                       disabled={true}
                                       id="inputCEP" 
                                       className="form-control"
                                       name="cep"
                                       value={Mascaras.CEP(this.state.cep)} />
                            </FormGroup>
                            <FormGroup label="Logradouro: *" htmlFor="inputLogradouro">
                                <input type="text" 
                                       disabled={true}
                                       id="inputLogradouro" 
                                       className="form-control"
                                       name="logradouro"
                                       value={this.state.logradouro}/>
                            </FormGroup>
                            <FormGroup label="Complemento:" htmlFor="inputComplemento">
                                <input type="text" 
                                       disabled={true}
                                       id="inputComplemento" 
                                       className="form-control"
                                       name="complemento"
                                       value={this.state.complemento}/>
                            </FormGroup>
                            <FormGroup label="Bairro: *" htmlFor="inputBairro">
                                <input type="text" 
                                       disabled={true}
                                       id="inputBairro" 
                                       className="form-control"
                                       name="bairro"
                                       value={this.state.bairro}/>
                            </FormGroup>
                            <FormGroup label="Cidade: *" htmlFor="inputCidade">
                                <input type="text" 
                                       disabled={true}
                                       id="inputCidade" 
                                       className="form-control"
                                       name="cidade"
                                       value={this.state.cidade}/>
                            </FormGroup>
                            <FormGroup label="UF: *" htmlFor="inputUF">
                                <input type="text" 
                                       disabled={true}
                                       id="inputUF" 
                                       className="form-control"
                                       name="uf"
                                       value={this.state.uf}/>
                            </FormGroup>
                            <FormGroup label="Telefone: *" htmlFor="inputTelefone">
                                <div className="row" style={{padding: '2rem'}}>
                                    {this.state.telefonesDTO.map((item, index) => {
                                        const telefoneFormatado = Mascaras.TELEFONE(item.telefone)
                                        return (
                                            <div key={index}>
                                                    <div style={{padding: '1rem'}}>
                                                        <label >{telefoneFormatado} </label>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </FormGroup>
                            <FormGroup label="Email: *" htmlFor="inputEmail">
                                <div className="row" style={{padding: '2rem'}}>
                                    {this.state.emailsDTO.map((item, index) => {
                                        return (
                                            <div key={index}>
                                                    <div style={{padding: '1rem'}}>
                                                        <label >{item.email} </label>
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
                            <button onClick={this.cancelar} type="button" className="btn btn-danger">
                                <i className="pi pi-times"></i> Cancelar
                            </button>
                    </div>
                </div>
            </Card>
            )
        }
    }
    
    export default withRouter( VisualizarCliente )