import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Answers from '../answers';

class ResumePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            session: {
                currentQuestion: 0,
                questions: [{
                    text: ''
                }],
                answers: []
            },
        };
    }

    getSession() {
        fetch(`http://localhost:8888/api/brave/${this.props.match.params.id}/session`)
            .then(response => response.json())
            .then(session => {
                console.log('entrou')
                this.setState({ session });
            });
    }

    componentDidMount() {
        this.getSession();
    }

    render() {
        return (
            <div className="container center-align">
                <h1>Resumo</h1>
                <div className="row">
                    <div className="col s12">
                        <Answers session={this.state.session} />
                    </div>
                </div>               
            </div>
        );
    }
}

export default withRouter(ResumePage);