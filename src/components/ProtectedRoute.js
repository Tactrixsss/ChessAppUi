import React, { useContext } from 'react';
import { AuthConsumer, AuthContext } from './AuthProvider'
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom'
export default function ProtectedRoute(props) {
    const { component: Component, ...rest } = props

    return (
        <AuthConsumer>
            {({ authorization }) => (
                <Route
                    render={props =>
                        authorization ? <Component {...props} /> : <Redirect to="/" />
                    }
                    {...rest}
                />

            )}

        </AuthConsumer>
    )

}