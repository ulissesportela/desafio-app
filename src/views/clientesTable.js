import React from 'react'

export default props => {

    const rows = props.clientes.map( cliente => {
        return (
            <tr key={cliente.id}>
                <td>{cliente.nome}</td>
                <td>{cliente.cpf}</td>

                <td>
                    <button type="button" title="Visualizar"
                            className="btn btn-info"
                            onClick={e => props.viewAction(cliente.id)}>
                            <i className="pi pi-pencil">Visualizar</i>
                    </button>
                    <button type="button" title="Editar"
                            hidden={props.comun}
                            className="btn btn-primary"
                            onClick={e => props.editAction(cliente.id)}>
                            <i className="pi pi-pencil">Editar</i>
                    </button>
                    <button type="button"  title="Excluir"
                            hidden={props.comun}
                            className="btn btn-danger" 
                            onClick={ e => props.deleteAction(cliente)}>
                            <i className="pi pi-trash">Deletar</i>
                    </button>
                </td>
            </tr>
        )
    } )

    return (
        <table className="table table-hover">
            <thead>
                <tr>
                    <th scope="col">Nome</th>
                    <th scope="col">CPF</th>
                    <th scope="col">Ações</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    )
}

