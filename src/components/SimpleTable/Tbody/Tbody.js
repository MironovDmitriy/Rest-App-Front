import React from 'react';
import styled from 'styled-components';

const Component = styled.tbody`
`;

export default ({children, ...rest}) => (
    <Component {...rest}>
        {children}
    </Component>
);