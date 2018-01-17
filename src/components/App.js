import React, {Component} from 'react';
import {Switch, Route, Redirect, BrowserRouter} from 'react-router-dom';
import {Link} from 'react-router-dom';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';

import localStorageSrv from '../services/localStorage';
import './App.css';
import AlertComponent from './modals/alert/Alert';
import NotFoundComponent from './not-found/NotFound';
import CatalogComponent from './catalog/Catalog';
import ItemComponent from './item/Item';
import LoginComponent from './login/Login';
import LoginButtonComponent from './login-button/LoginButton';
import EditItemComponent from './item/edit-item/EditItem';
import DeleteItemComponent from './item/delete-item/DeleteItem';

const PrivateRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={props => {
        const accessToken = localStorageSrv.get('accessToken');

        return (
            accessToken ? (
                <Component {...props}/>
            ) : (
                <Redirect to={{
                    pathname: '/login',
                    state: {from: props.location}
                }}/>
            )
        )
    }}/>
);

class App extends Component {

    render() {
        return (
            <BrowserRouter>
                <div className='app-component'>

                    <Alert stack={true} contentTemplate={AlertComponent}/>
                    <div id="header">
                        <div className="header-content">
                            <Link to="/">
                                <h2 className="header-title">Catalog App</h2>
                            </Link>

                            <LoginButtonComponent/>

                        </div>
                    </div>
                    <div className='content'>

                        <Switch>
                            <Route exact path='/' component={CatalogComponent}/>
                            <Route exact path='/catalog/:categorySlug/items' component={CatalogComponent}/>
                            <Route exact path='/catalog/:categorySlug/:itemSlug/:itemId' component={ItemComponent}/>
                            <PrivateRoute exact path={'/catalog/:categorySlug/:itemSlug/:itemId/edit'}
                                          component={EditItemComponent}/>
                            <PrivateRoute exact path={'/catalog/:categorySlug/:itemSlug/:itemId/delete'}
                                          component={DeleteItemComponent}/>
                            <Route exact path='/login' component={LoginComponent}/>
                            <Route exact path='/add' component={EditItemComponent}/>

                            <Route component={NotFoundComponent}/>
                        </Switch>

                    </div>

                </div>
            </BrowserRouter>
        );
    }


}

export default App;
