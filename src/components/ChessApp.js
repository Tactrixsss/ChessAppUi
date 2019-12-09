import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import ProjectImage from './ProjectImage';
import EditMoves from './EditMoves';
import HomePage from './HomePage'
import SignIn from './SignIn'
import SignUp from './SignUp'
import MenuAppBar from './MenuBar'
import ListOpenings from './ListOpeningsVT'
import ListMoves from './ListMoves'
import { AuthProvider } from './AuthProvider'
import ProtectedRoute from './ProtectedRoute'
import Popup from './EditPopup'

function ChessApp() {

    return (
        
        <div>
            
            <Router>
                <AuthProvider>
                    <MenuAppBar></MenuAppBar>
                    <Switch>
                        <Route path='/signin' component={SignIn}></Route>
                        <Route path='/signup' component={SignUp}></Route>
                        <Route path='/' component={HomePage}></Route>
                    </Switch>
                </AuthProvider>
            </Router>
        </div>
    );
}

export default ChessApp;