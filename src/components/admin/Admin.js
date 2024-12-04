import { Component } from "react";
import withAuthentication from "../login/withAuthentication";

class Admin extends Component {

    render() {
        return (
         <>
            <div>COMPOSANTE ADMINISTRATIVE</div>
         </>
        );
    }
}

export default withAuthentication(Admin);