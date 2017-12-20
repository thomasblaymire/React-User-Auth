import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import * as actions from "../../actions";


class Signin extends Component {
    handleFormSubmit({ email, password }) {
        console.log(email, password);
        // Call the signInUser available from actions
        this.props.signinUser({ email, password });
    }

    renderAlert() {
        if(this.props.errorMessage) {
            return (
                <div className="alert alert-danger">
                    <strong>Oops!</strong> {this.props.errorMessage}
                </div>
            );
        }
    }

    render() {
        const { handleSubmit, fields: { email, password }} = this.props;

        return (
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                <div className="form-group">
                    <fieldset>
                        <label>Email:</label>
                        <input {...email} className="form-control" />
                    </fieldset>
                </div>
                <div className="form-group">
                    <fieldset className="form-group">
                        <label>Password:</label>
                        <input {...password} className="form-control" />
                    </fieldset>
                </div>
                {this.renderAlert()}
                <button action="submit" className="btn btn-primary">Sign in</button>
            </form>
        );
    }
}

function mapStateToProps(state){
    return { errorMessage: state.auth.error };
}

export default reduxForm({
    form: "signin",
    fields: ["email", "password"]
}, mapStateToProps, actions)(Signin);
