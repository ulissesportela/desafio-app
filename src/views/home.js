import React from 'react'
import LocalStorageService from '../app/service/localstorageService'

class Home extends React.Component{

    state = {
        login: ''
    }

    componentDidMount(){
        const usuarioLogado = LocalStorageService.obterItem('_usuario_logado')
        this.setState({login: usuarioLogado.login})
    }

    render(){
        return (
            <div className="jumbotron">
                <h1 className="display-3">Bem vindo! {this.state.login}</h1>
                <p className="lead">Esse é seu sistema de Cadastro de Clientes.</p>
                <hr className="my-4" />
                <p>E essa é sua área administrativa, utilize um dos menus ou botões abaixo para navegar pelo sistema.</p>
                <p className="lead">
                    <a className="btn btn-primary btn-lg" 
                    href="#/consulta-clientes" 
                    role="button"><i className="pi pi-users"></i>  
                     Clientes
                    </a>
                </p>
            </div>
        )
    }
}

export default Home