import React, { Component } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import { connect } from 'react-redux';

class Home extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log('Home');
        return (
            <div>
                <Header />
                <span>Pagina publica</span>
                <Footer />
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

export default connect(mapStateToProps, null)(Home);
