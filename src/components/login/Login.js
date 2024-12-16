import { Component } from "react";
import axios from "axios";
import withNavigation from "../menu/withNavigation";
import './Login.css';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
          };
        
        this.getToken = this.getToken.bind(this);
        this.setResponseData = this.setResponseData.bind(this);
    }

    render() {        
        return (
            <div className="login-container">
                <h2>Connexion</h2>
                <form className="login-form" onSubmit={e => e.preventDefault()}>
                    <label htmlFor="username">Usager</label>
                    <input 
                        type="text" 
                        id="username" 
                        value={this.state.username} 
                        onChange={e => this.setUsername(e.target.value)} 
                        required 
                    />

                    <label htmlFor="password">Mot de passe</label>
                    <input 
                        type="password" 
                        id="password" 
                        value={this.state.password} 
                        onChange={e => this.setPassword(e.target.value)} 
                        required 
                    />
                    <button type="submit" onClick={this.getToken}>Se connecter</button>
                </form>
            </div>
        );
    }

    setUsername(value) {
        this.setState({
            username: value
          });
    }

    setPassword(value) {
        this.setState({
            password: value
          });
    }

    getToken() {
        const data = new URLSearchParams();
        data.append("grant_type", "password");
        data.append("username", this.state.username);
        data.append("password", this.state.password);
    
        axios({
            method: "post",
            url: "http://localhost:8000/token",
            data: data.toString(),
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
        })
        .then((response) => {
            this.setResponseData(response);
        })
        .catch((error) => {
            console.error("Login failed:", error);
            alert("Connexion échouée. Vérifiez vos informations d'identification.");
        });
    }
    
    setResponseData(response) {
        const token = response.data.access_token;
        localStorage.setItem("AUTH_TOKEN", `Bearer ${token}`);
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        console.log("Login successful! Token set:", token);
        this.props.navigate("/rechercherReservation");
    }
}

export default withNavigation(Login);