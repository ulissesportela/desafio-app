import React from 'react'

export default props => {

    const rows = props.clientes.map( cliente => {
        return (
            <tr key={cliente.id}>
                <td>{cliente.nome}</td>
                <td>{cliente.cpf}</td>
                <td>{cliente.telefone}</td>
                <td>{cliente.email}</td>
                <td>
                    <button type="button" title="Editar"
                            className="btn btn-primary"
                            onClick={e => props.editAction(cliente.id)}>
                            <i className="pi pi-pencil">Editar</i>
                    </button>
                    <button type="button"  title="Excluir"
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
                    <th scope="col">Telefone</th>
                    <th scope="col">E-mail</th>
                    <th scope="col">Ações</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    )
}

