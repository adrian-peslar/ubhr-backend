import React, { Component } from 'react';
import { connect } from 'react-redux';
import HRDashboard from 'UBHR/views/user/HRDashboard';
import EmployeeDashboard from 'UBHR/views/user/EmployeeDashboard';
import CandidateDashboard from 'UBHR/views/user/CandidateDashboard';
import { fetchConnections } from 'UBHR/actions/appActions';

class Dashboard extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchConnections();
    }

    render() {
        switch (this.props.user.type) {
            case 1:
                return <HRDashboard props={{ ...this.props }} />;
            case 2:
                return <EmployeeDashboard props={{ ...this.props }} />;
            case 3:
                return <CandidateDashboard props={{ ...this.props }} />;
        }
        return null;
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
        fetchConnections: () => {
            dispatch(fetchConnections());
        },
    };
};

export default connect(mapStateToProps, mapDispatchProps)(Dashboard);
