import * as React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import AppTest from './testapp/AppTest';

import './custom.css';

export default () => (
    <Layout>
        <Route exact path='/' component={AppTest} />
    </Layout>
);
