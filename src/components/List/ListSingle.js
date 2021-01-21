import React from 'react';
import styled from 'styled-components';

const ListItem = styled.li`
    display: flex;
    justify-content: space-between;
    list-style: none;
    text-align: left;
    padding: 0px;
    margin: 0px;
`;
const Title = styled.h2`
    margin: -16px;
`;
const Label = styled.span`
    font-weight: bold;
`;


const ListSingle = ({ item }) => (
    <>
    <Title></Title>
    <ListItem key={item.label}>
        <Label>{item.label}</Label>{item.description}{item.value} 
    </ListItem>
    </>
);
export default ListSingle;