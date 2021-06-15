import React, { Component } from 'react';
import LoginContainer from './LoginContainer';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: props.location,
        };
    }
    render() {
        if (this.props.isLoggedIn === true)
            return (
                <Redirect
                    to={{
                        pathname: '/dashboard',
                    }}
                />
            );

        return (
            <div className="content">
                <LoginContainer redirect={this.state.redirect} />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        loggingIn: state.auth.loggingIn,
        isLoggedIn: state.auth.isLoggedIn,
    };
};

export default connect(mapStateToProps, null)(Login);
