import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Question from '../question';
import Answers from '../answers';

class QuestionPage extends Component {
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

    answer(answer) {
        const question = this.state.session.questions[this.state.session.currentQuestion];
        question.answer = answer;
        question.updatedAt = new Date();

        fetch(`http://localhost:8888/api/brave/${this.props.match.params.id}/answer`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(question)
        })
            .then(response => response.json())
            .then(session => {
                this.setState({ session });
            })
    }

    answerYes = () => {
        this.answer(true);
    }

    answerNo = () => {
        this.answer(false);
    }

    componentDidMount() {
        this.getSession();
    }

    render() {
        return (
            <div className="container center-align">
                <Question session={this.state.session} answerYes={this.answerYes} answerNo={this.answerNo} />
                <div className="row">
                    <div className="col s12">
                        <hr/>
                    </div>
                </div>
                <div className="row">
                    <div className="col s12">
                        <Answers session={this.state.session} />
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(QuestionPage);