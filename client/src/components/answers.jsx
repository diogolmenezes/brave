import React, { Component } from 'react';

class Answers extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        if (this.props.session.answers.length == 0)
            return null;

        return (
            <div>
                <h6>Média: {this.props.session.average}</h6>
                <table className="striped">
                    <thead>
                        <tr>
                            <th>Pergunta</th>
                            <th>Resposta</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.session.answers.map((answer) =>
                                <tr key={window.btoa(answer.text)}>
                                    <td>{answer.text}</td>
                                    <td>{answer.answer ? "Sim" : "Não"}</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Answers;