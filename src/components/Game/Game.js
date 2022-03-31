import React, { Component } from 'react';
import './Game.css';

class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            number: "",
            message: "",
            random: generateRandomNumber(100)
        }

    }
    
    handleOnChange = e => {
        const {target: {value}} = e;

        console.log(value);
        if(e.keyCode === 13) {
            e.preventDefault();
        }

        if(value.trim() > 0) {
            this.setState({
                number: value
            });
        }

        /* Message vuelve a su estado inicial para dejar
         de mostrar el mensaje en pantalla al meter un nuevo */ 
        this.setState({
            message: "",
        });
        
    }

    handleOnClick = () => {
        const number = parseInt(this.state.number);
        const random = parseInt(this.state.random);
        const text = calculateText(number, random);
        console.log(random);

        /* Actualiza el mensaje a mostrar y number 
        vuelve a su estado inicial para que el input quede vacío 
        y podamos meter otro número */
        this.setState({
            number: "",
            message: text,
        });
        
    }

    render() {
        return (
            <div className="Game">
                <input
                    type="number"
                    value={this.state.number}
                    onChange={this.handleOnChange}
                />
                <button onClick={this.handleOnClick}>Probar</button>
                <p className={(this.state.message)&& 'flickering'}>{this.state.message}</p>
                
            </div>
        );
    }
}

export default Game;

function generateRandomNumber(max, min = 1) {
    return Math.floor(Math.random() * (max - min) + min);
}

function calculateText(number, random) {
    const soClose = 5;
    const diff = Math.abs(random - number);
    
    if (number === random) {
        return "Felicidades, lo has adivinado!!";
    }
    
    if (diff < soClose) {
        
        if (number < random) {
            return "Estás muy cerca!! tu número es un poco bajo."
        } else {
            return "Estás muy cerca!! tu número es un poco alto."
        }

    } else {
        if (number < random) {
            return "Tu número es muy bajo!"
        } else {
            return "Tu número es muy alto!"
        }
    }
}

