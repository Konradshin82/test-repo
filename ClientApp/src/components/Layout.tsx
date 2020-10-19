import * as React from 'react';
import { Container } from 'reactstrap';
import AppTest from './testapp/AppTest';

export default (props: { children?: React.ReactNode }) => (
    <React.Fragment>
        <AppTest/>
        <Container>
            {props.children}
        </Container>
    </React.Fragment>
);
