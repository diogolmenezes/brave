import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class Question extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        let hasQuestion = this.props.session.currentQuestion < this.props.session.questions.length;

        if (!hasQuestion) {
            this.props.history.push(`/${this.props.match.params.id}/resume`); 
            return null;   
        }
        
        return (
            <div className="container center-align">
                <p>{this.props.session.currentQuestion + 1} de {this.props.session.questions.length}</p>
                <div className="row">
                    <div className="col s12">
                        <h4>{this.props.session.questions[this.props.session.currentQuestion].text}</h4>
                    </div>
                </div>
                <div className="row">
                    <div className="col s4"></div>
                    <div className="col s1">
                        <button className="waves-effect waves-light btn-small" onClick={this.props.answerYes}>
                            <i className="large material-icons">thumb_up</i>
                        </button>
                    </div>
                    <div className="col s2"></div>
                    <div className="col s1">
                        <button className="waves-effect waves-light btn-small no" onClick={this.props.answerNo}>
                            <i className="large material-icons ">thumb_down</i>
                        </button>
                    </div>
                    <div className="col s4"></div>
                </div>
            </div>
        );
    }
}

export default withRouter(Question);