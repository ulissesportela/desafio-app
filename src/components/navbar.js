import React from 'react'

import NavbarItem from './navbarItem'

function Navbar(props){
    return (
        <div className="navbar navbar-expand-lg fixed-top navbar-dark bg-primary">
        <div className="container">
          <a href="#/home" className="navbar-brand">Desafio Java</a>
          <button className="navbar-toggler" type="button" 
                  data-toggle="collapse" data-target="#navbarResponsive" 
                  aria-controls="navbarResponsive" aria-expanded="false" 
                  aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav">
                <NavbarItem render={props.isUsuarioAutenticado} href="#/home" label="Home" />
                <NavbarItem render={props.isUsuarioAutenticado} href="#/cadastro-cliente" label="Clientes" />
                <NavbarItem render={props.isUsuarioAutenticado} href="#/consulta-lancamentos" label="Lançamentos" />
                <NavbarItem render={props.isUsuarioAutenticado} onClick={props.deslogar} href="#/login" label="Sair" />
            </ul>
            </div>
        </div>
      </div>
    )
}

export default Navbar;