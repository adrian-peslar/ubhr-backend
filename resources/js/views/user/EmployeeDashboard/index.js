import React, { Component } from 'react';
import Header from 'UBHR/components/Header';
import Footer from 'UBHR/components/Footer';
import { connect } from 'react-redux';

class Dashboard extends Component {
    // check if user is authenticated and storing authentication data as states if true
    render() {
        return (
            <div>
                <Header />
                <span>Employee dashboard</span> <br />
                <table className="table table-striped">
                    <tbody>
                        <tr>
                            <th scope="row ">User Id</th>
                            <td>{this.props.user.id}</td>
                        </tr>
                        <tr>
                            <th scope="row ">Full Name</th>
                            <td>{this.props.user.name}</td>
                        </tr>
                        <tr>
                            <th scope="row ">Email</th>
                            <td>{this.props.user.email}</td>
                        </tr>
                    </tbody>
                </table>
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

export default connect(mapStateToProps, null)(Dashboard);
