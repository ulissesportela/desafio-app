import React from 'react';

import Navbar from '../components/navbar'

import 'bootswatch/dist/flatly/bootstrap.css'
import '../custom.css'

class Teste extends React.Component {
    state = {
        emails: ['email@email.com', 'ae@ae.com', 'cliente1@cemail.com']
    }

  render() {

    console.log(this.state.emails);

    return(
      <>
        <Navbar />
        <div className="container">    
            <label>Teste:</label>
        </div>
      </>
    )
  }
}

export default Teste;
