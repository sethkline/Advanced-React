import React, { Component } from 'react';
import {Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Graphic from '../Graphic';
import GraphicsPagination from './GraphicsPagination';
import { perPage } from '../../config';
import GraphicsSearch from './GraphicsSearch';
import Table from '../styles/Table';


const ALL_GRAPHICS_QUERY = gql`
    query ALL_GRAPHICS_QUERY($skip: Int = 0, $first: Int = ${perPage}) {
        graphics(first: $first, skip: $skip, orderBy: createdAt_DESC) {
            id
            number
            lastName
            firstName
            organization
            title
            category
            image
            leader
        }
    }
`;


const Center = styled.div`
    text-align: center;
`;

const GraphicsListStyle = styled.div`
    display:grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 10px;
    max-width: ${props => props.theme.maxWidth};
    margin: 0 auto;
`;


class GraphicsList extends Component {
    render() {
        return (
            <>
            <div className="sub-bar">
            <GraphicsSearch />
            </div>
            <Center>
                <GraphicsPagination page={this.props.page} />
                <Query query={ALL_GRAPHICS_QUERY}
                    variables = {{ 
                        skip: this.props.page * perPage - perPage
                    }}
                >
                {({ data, error, loading }) => {
                    if(loading) return <p>Loading...</p>
                    if(error) return <p>Error: {error.message}</p>
                    return <div> 
                        {/* <GraphicsListStyle> */}
                        <Table>
                            <tr>
                                <th>Number</th>
                                <th>Name</th>
                                <th>Title</th>
                                <th>Organization</th>
                            </tr>
                            {data.graphics.map(graphic => <Graphic graphic={graphic} key={graphic.id}></Graphic>)}
            
                        </Table>
                        {/* {data.graphics.map(graphic => <Graphic graphic={graphic} key={graphic.id}></Graphic>)} */}
                    {/* </GraphicsListStyle> */}
                    </div>
                }}
                </Query>
                <GraphicsPagination page={this.props.page} />
            </Center>
            </>
        );
    }
}

export default GraphicsList;
export { ALL_GRAPHICS_QUERY };