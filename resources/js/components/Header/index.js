import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from 'UBHR/actions/authActions';
import history from 'UBHR/history';

class Header extends Component {
    constructor(props) {
        super(props);
    }

    logOut = (e) => {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        this.props.logout();
    };

    render() {
        return (
            <div className="">
                <span className="ml10">
                    <Link to="/">Acasă</Link>
                </span>
                <span className="ml10">|</span>
                {this.props.isLoggedIn ? (
                    <>
                        <span className="ml10">
                            <Link to="/dashboard">Panou</Link>
                        </span>
                        <span className="ml10">|</span>
                    </>
                ) : (
                    ''
                )}

                {this.props.isLoggedIn ? (
                    <span className="ml10">
                        <a onClick={this.logOut} href="/login">
                            Ieșire din cont
                        </a>
                    </span>
                ) : (
                    ''
                )}
                {!this.props.isLoggedIn ? (
                    <>
                        <span className="ml10">
                            <Link to="/login">Login</Link>
                        </span>
                        <span className="ml10">|</span>
                        <span className="ml10">
                            <Link to="/register">Register</Link>
                        </span>
                    </>
                ) : (
                    ''
                )}
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

const mapDispatchProps = (dispatch) => {
    return {
        logout: () => {
            dispatch(logout());
        },
    };
};

export default connect(mapStateToProps, mapDispatchProps)(Header);
