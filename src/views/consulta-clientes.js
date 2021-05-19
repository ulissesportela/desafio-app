import React from 'react'
import { withRouter } from 'react-router-dom'

import Card from '../components/card'
import FormGroup from '../components/form-group'
import ClientesTable from './clientesTable'
import ClienteService from '../app/service/clienteService'
import * as messages from '../components/toastr'

import LocalStorageService from '../app/service/localstorageService'

class ConsultaClientes extends React.Component {

    state = {
        nome: '',
        showConfirmDialog: false,
        lancamentoDeletar: {},
        clientes : [],
        comun: true
    }

    constructor(){
        super();
        this.service = new ClienteService();
    }

    componentDidMount(){
        const usuarioLogado = LocalStorageService.obterItem('_usuario_logado')
        this.setState({comun: (usuarioLogado.login==='comun'?true:false)})
        this.buscar()
    }
    
    buscar = () => {
 
        const clienteFiltro = {
            nome: this.state.nome
        }

        this.service
            .consultar(clienteFiltro)
            .then( resposta => {
                const lista = resposta.data;
                
                if(lista.length < 1){
                    messages.mensagemAlert("Nenhum resultado encontrado.");
                }
                this.setState({ clientes: lista })
            }).catch( error => {
                console.log(error)
            })
    }

    visualizar = (id) => {
        this.props.history.push(`/visualizar-cliente/${id}`)
    }
    
    editar = (id) => {
        this.props.history.push(`/cadastro-cliente/${id}`)
    }

    deletar = (cliente) => {
        this.service
            .deletar(cliente.id)
            .then(response => {
                const clientes = this.state.clientes;
                const index = clientes.indexOf(this.state.clienteDeletar)
                clientes.splice(index, 1);
                this.setState( { clientes: clientes, showConfirmDialog: false } )
                messages.mensagemSucesso('Cliente deletado com sucesso!')
            }).catch(error => {
                messages.mensagemErro('Ocorreu um erro ao tentar deletar o Cliente')
            })
    }

    preparaFormularioCadastro = () => {
        this.props.history.push('/cadastro-cliente')
    }

    cancelar = () => {
        this.props.history.push('/home')
    }

    render(){

        return (
            <Card title="Consulta Clientes">
                <div className="row">
                    <div className="col-md-6">
                        <div className="bs-component">
                            <FormGroup htmlFor="inputNome" label="Nome:">
                                <input type="text" 
                                       className="form-control" 
                                       id="inputNome" 
                                       value={this.state.nome}
                                       onChange={e => this.setState({nome: e.target.value})}
                                       placeholder="Digite o Nome" />
                            </FormGroup>
                            <button onClick={this.buscar} 
                                    type="button" 
                                    className="btn btn-success">
                                    <i className="pi pi-search"></i> Buscar
                            </button>
                            <button onClick={this.preparaFormularioCadastro}
                                    hidden={this.state.comun}
                                    type="button" 
                                    className="btn btn-primary">
                                    <i className="pi pi-plus"></i> Cadastrar
                            </button>
                            <button onClick={this.cancelar} 
                                    type="button" 
                                    className="btn btn-danger">
                                    <i className="pi pi-plus"></i> Cancelar
                            </button>
                        </div>
                        
                    </div>
                </div>   
                <br/ >
                <div className="row">
                    <div className="col-md-12">
                        <div className="bs-component">
                            <ClientesTable clientes={this.state.clientes} 
                                              deleteAction={this.deletar}
                                              viewAction={this.visualizar}
                                              editAction={this.editar}
                                              alterarStatus={this.alterarStatus}
                                              comun={this.state.comun} />
                        </div>
                    </div>  
                </div> 

        
            </Card>

        )
    }
}

export default withRouter(ConsultaClientes);