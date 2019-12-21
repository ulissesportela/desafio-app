import React from 'react'


import CadastroCliente from '../views/cadastro-cliente'
import ConsultaCliente from '../views/consulta-clientes'
import Login from '../views/login'
import Home from '../views/home'
import Teste from '../views/teste'

import {Route, Switch, HashRouter} from "react-router-dom"

function Rotas(){

    return (
        <HashRouter>
            <Switch>
                <Route path="/home" component={Home} />
                <Route exact path={["/", "/login"]} component={Login}  />
                <Route path="/cadastro-cliente" component={CadastroCliente} />
                <Route path="/consulta-clientes" component={ConsultaCliente} />
                <Route path="/teste" component={Teste} />
            </Switch>
        </HashRouter>
    )
}
export default Rotas