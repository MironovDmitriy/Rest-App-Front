import React from 'react';
import styled from 'styled-components';

const Component = styled.td`
    height: 15px;
    border: 1px solid black;
`;

const Container = styled.div`
    padding: 5px;
`;

export default ({children, ...rest}) => (
    <Component {...rest}>
        <Container>
            {children}
        </Container>
    </Component>
);