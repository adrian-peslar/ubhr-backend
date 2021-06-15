import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import history from 'UBHR/history';
// import FlashMessage from 'react-flash-message';
import { login } from 'UBHR/actions/authActions';
class LoginContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                email: '',
                password: '',
            },
            redirect: props.redirect,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
    }

    componentDidMount() {
        //
    }

    componentDidUpdate(prevProps) {
        const { prevLocation } = this.state.redirect.state || { prevLocation: { pathname: '/dashboard' } };
        if (this.props.isLoggedIn === true && prevProps.isLoggedIn === false && prevLocation) {
            console.log('redirec');
            if (prevLocation && this.props.isLoggedIn) {
                console.log('-._', prevLocation);
                return history.push(prevLocation);
            }
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        let userData = this.state.user;
        this.props.login(userData);
    }
    handleEmail(e) {
        let value = e.target.value;
        this.setState((prevState) => ({
            user: {
                ...prevState.user,
                email: value,
            },
        }));
    }
    handlePassword(e) {
        let value = e.target.value;
        this.setState((prevState) => ({
            user: {
                ...prevState.user,
                password: value,
            },
        }));
    }
    render() {
        const { state = {} } = this.state.redirect;
        const { error } = state;
        const { user } = this.props;
        return (
            <div className="container login-container">
                <div className="row">
                    <div className="offset-xl-3 col-xl-6 offset-lg-1 col-lg-10 col-md-12 col-sm-12 col-12 ">
                        <span className="pull-right">
                            <Link to="/">&lt; Inapoi la prima pagina</Link>
                        </span>
                        <h2 className="text-center mb30">Intră în cont In</h2>
                        {this.state.isLoggedIn
                            ? ''
                            : // <FlashMessage duration={60000} persistOnHover={true}>
                              //     <h5 className={'alert alert-success'}>Login successful, redirecting...</h5>
                              // </FlashMessage>
                              ''}
                        {this.state.error
                            ? ''
                            : // <FlashMessage duration={100000} persistOnHover={true}>
                              //     <h5 className={'alert alert-danger'}>Error: {this.state.error}</h5>
                              // </FlashMessage>
                              ''}
                        {error && !this.state.isLoggedIn
                            ? ''
                            : // <FlashMessage duration={100000} persistOnHover={true}>
                              //     <h5 className={'alert alert-danger'}>Error: {error}</h5>
                              // </FlashMessage>
                              ''}
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    placeholder="E-mail"
                                    className="form-control"
                                    required
                                    onChange={this.handleEmail}
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    id="password"
                                    type="password"
                                    name="password"
                                    placeholder="Parola"
                                    className="form-control"
                                    required
                                    onChange={this.handlePassword}
                                />
                            </div>
                            <button
                                disabled={this.state.loggingIn}
                                type="submit"
                                name="singlebutton"
                                className="btn btn-default btn-lg  btn-block mb10"
                            >
                                {' '}
                                {this.state.loggingIn ? 'Intră in cont...' : 'Intră în cont'}{' '}
                            </button>
                        </form>
                        <div className="">
                            <div className="">
                                Nu ai cont?{' '}
                                <Link to="/register" className="text-yellow">
                                    {' '}
                                    Înregistrare
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
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
        login: (userData) => {
            dispatch(login({ userData }));
        },
    };
};

export default connect(mapStateToProps, mapDispatchProps)(LoginContainer);
