import React from 'react'
import Card from '../components/card'
import FormGroup from '../components/form-group'
import { withRouter } from 'react-router-dom'

import UsuarioService from '../app/service/usuarioService'
import { mensagemErro } from '../components/toastr'
import LocalStorageService from '../app/service/localstorageService'

class Login extends React.Component{
    state = {
        login: '',
        senha: '',
        mensagemErro: null
    }

    constructor(props) {
        super(props);
        this.service = new UsuarioService();
      }

    entrar = () => {
        this.service.autenticar({
            login: this.state.login,
            senha: this.state.senha
        }).then( response => {
            LocalStorageService.adicionarItem('_usuario_logado', response.data)
            this.props.history.push('/home')
        }).catch( erro => {
            mensagemErro(erro.response.data)
        })
    }


    prepareCadastrar = () => {
        this.props.history.push('/cadastro-usuarios')
    }

    render(){
        return (

            <div className="row">
                <div className="col-md-6" style={ {position : 'relative', left: '300px'} }>
                    <div className="bs-docs-section">
                    <Card title="Login">
                            <div className="row">
                                <span>{this.state.mensagemErro}</span>
                            </div>
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="bs-component">
                                        <fieldset>
                                            <FormGroup label="Login: *" htmlFor="exampleInputEmail1">
                                            <input type="Login" 
                                                        value={this.state.login}
                                                        onChange={e => this.setState({login: e.target.value})}
                                                        className="form-control" 
                                                        id="exampleInputLogin1" 
                                                        placeholder="Login" />

                                            </FormGroup>
                                            <FormGroup label="Senha: *" htmlFor="exampleInputPassword1">
                                                <input type="password" 
                                                        value={this.state.senha}
                                                        onChange={e => this.setState({senha: e.target.value})}
                                                        className="form-control" 
                                                        id="exampleInputPassword1" 
                                                        placeholder="Password" />
                                            </FormGroup>
                                            <button onClick={this.entrar} className="btn btn-success">
                                                <i className="pi pi-sign-in"></i>Entrar</button>
                                        </fieldset>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>

        )
    }
}


export default withRouter( Login )