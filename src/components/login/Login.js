import { Component } from "react";
import axios from "axios";
import withNavigation from "../menu/withNavigation";

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
         <>
            <br></br>
            <label htmlFor="nom">Usager : </label>
            <input type="text" id="usager" value={this.state.username} onChange={ e => this.setUsername(e.target.value) } />
            <br></br>
            <label htmlFor="nom">Mot de passe : </label>
            <input type="password" id="motdepasse" value={this.state.password} onChange={ e => this.setPassword(e.target.value) } />
            <br></br>
            <button onClick={this.getToken}>Se connecter</button>
         </>
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
        const data = `grant_type=password&username=${this.state.username}&password=${this.state.password}&scope=&client_id=string&client_secret=string`;
        axios({
            method: "post",
            url: "http://127.0.0.1:8000/token",
            data: data,
            //withCredentials: false,
            headers: { "Content-Type": "application/x-www-form-urlencoded",
                       //"Cache-Control": "no-cache"
            },
        })
        .then((response) => {
            this.setResponseData(response);
        })
        .catch(
            console.log
        );
    }

    setResponseData(response) {
        localStorage.setItem("AUTH_TOKEN", "Bearer " + response.data.access_token);
        this.props.navigate("/rechercherReservation");
    }
}

export default withNavigation(Login);