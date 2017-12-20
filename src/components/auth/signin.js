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

                <button action="submit" className="btn btn-primary">Sign in</button>
            </form>
        );
    }
}

export default reduxForm({
    form: "signin",
    fields: ["email", "password"]
}, null, actions)(Signin);
