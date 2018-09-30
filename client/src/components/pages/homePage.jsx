import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class HomePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            session: null,
        };
    }

    start() {
        fetch('/api/brave/start')
            .then(response => response.json())
            .then(session => {
                this.setState({ session });
                this.props.history.push(`/${session.id}/question`);
            });
    }

    render() {
        return (
            <div className="container center-align">
                <div className="row">
                    <div className="col s12">
                        <img className="circle responsive-img" src={require('../../images/brave2.jpg')} />
                    </div>
                </div>
                <div className="row">
                    <div className="col s12">
                        <h2>Desde 2016 fazendo as perguntas que precisam ser feitas.</h2>
                        <p>Tem certeza que você não está esquecendo de nada? Ahh duvido!</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col s12">
                        <button className="waves-effect waves-light btn-large" onClick={this.start.bind(this)}>Começar</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(HomePage);