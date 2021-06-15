import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({ component: Component, path, isLoggedIn, ...rest }) => (
    <Route
        path={path}
        {...rest}
        render={(props) =>
            isLoggedIn ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: '/login',
                        state: {
                            prevLocation: path,
                            error: 'You need to login first!',
                        },
                    }}
                />
            )
        }
    />
);
const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        loggingIn: state.auth.loggingIn,
        isLoggedIn: state.auth.isLoggedIn,
    };
};
export default connect(mapStateToProps, null)(PrivateRoute);
