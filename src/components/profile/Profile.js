import styled from "styled-components";
import {getDomain} from "../../helpers/getDomain";
import {Spinner} from "../../views/design/Spinner";
import Player from "../game/Game";
import {Button} from "../../views/design/Button";
import {withRouter} from "react-router-dom";
import React from "react";
import {BaseContainer} from "../../helpers/layout";

const Container = styled(BaseContainer)`
  color: white;
  text-align: center;
`;
const FormContainer = styled.div`
  margin-top: 2em;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 300px;
  justify-content: center;
`;
export const Label = styled.label`
  color: white;
  margin-bottom: 10px;
  text-transform: uppercase;
  display:block
`;


class Profile extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            id : this.props.match.params.id,
            user: null
        }
    }

    componentWillMount() {
        fetch(`${getDomain()}/users/${this.state.id}?token=${localStorage.getItem("token")}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json(), error => {
                this.props.history.push("/login");
            })
            .then(user => {
                // delays continuous execution of an async operation for 0.8 seconds.
                // This is just a fake async call, so that the spinner can be displayed
                // feel free to remove it :)
                try {
                    this.setState({"user": user});
                } catch (err) {
                    alert("Sorry something went wrong!" + err);
                    this.logout();
                    localStorage.removeItem("token");
                }
            })
            .catch(err => {
                console.log(err);
                alert("Something went wrong fetching the user: " + err);
            });
    }

    render() {
        if (this.state.user === null) { return null }
        return (
            <Container>
                <Label>{this.state.user.id}</Label>
                <Label>{this.state.user.username}</Label>
                <Label>{this.state.user.name}</Label>
                <Label>{this.creationDate()}</Label>
                <Label>{this.birthDay()}</Label>
                <Button
                    width="20%"
                    onClick={() => {
                        this.props.history.push("/game");
                    }}
                >
                    Back
                </Button>
            </Container>
        );
    }

    birthDay(){
        if (this.state.user.birthDay === null) return "No Birthday available!";
        return (new Date(Number(this.state.user.birthDay))).toDateString();
    }
    creationDate(){
        return (new Date(Number(this.state.user.creationDate))).toDateString();
    }
}




export default withRouter(Profile);