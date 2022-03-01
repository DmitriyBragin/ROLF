import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { NotFoundPage } from '../NotFoundPage';

import './index.scss';
import { Header } from '../../components/Header';
import { QuestionPage } from '../QuestionPage';

function App() {
    return (
        <div className="app">
            <Header />
            <Switch>
                <Route exact path="/" render={props => <QuestionPage {...props} />} />
                <Route component={NotFoundPage} />
            </Switch>
        </div>
    );
}

export default App;
