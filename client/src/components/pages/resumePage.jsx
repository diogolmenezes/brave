import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
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
        fetch(`/api/brave/${this.props.match.params.id}/session`)
            .then(response => response.json())
            .then(session => {
                this.setState({ session });
            });
    }

    componentDidMount() {
        this.getSession();
    }

    getImage() {
        if (this.state.session.average >= 10) {
            return <img className="responsive-img" src={require('../../images/brave-happy.gif')} />
        } else if (this.state.session.average >= 7) {
            return <img className="responsive-img" src={require('../../images/brave-ok.gif')} />
        } else if (this.state.session.average >= 5) {
            return <img className="responsive-img" src={require('../../images/brave-disappointed.gif')} />
        } else {
            return <img className="responsive-img" src={require('../../images/brave-sad.gif')} />
        }
    }

    render() {
        return (            
            <div className="container center-align">
                <h1><Link to="/">Resumo</Link></h1>
                {this.getImage()}
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