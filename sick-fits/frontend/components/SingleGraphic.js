import React, { Component } from 'react'
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Error from './ErrorMessage';
import styled from 'styled-components';
import Head from 'next/head';

const SingleItemStyles = styled.div`
    max-width: 1200px;
    margin: 2rem auto;
    box-shadow: ${props => props.theme.bs};
    display: grid;
    grid-auto-columns: 1fr;
    grid-auto-flow: column;
    min-height: 800px;
    img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
    .details {
        margin: 3rem;
        font-size: 2rem;
    }
`;

const SINGLE_GRAPHIC_QUERY = gql`
 query SINGLE_GRAPHIC_QUERY($id: ID!) {
     graphic(where: { id: $id }) {
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
`



class SingleGraphic extends Component {
  render() {
    return (
        // <p>{graphic.number} {graphic.firstName}</p>
      <Query 
            query={SINGLE_GRAPHIC_QUERY} 
            variables={{id: this.props.id}}
        >
        {({error, loading, data}) => {
            if (error) return <Error error={error} />
            if (loading) return <p>Loading....</p>
            if(!data.graphic) return <p>No Graphic Found for {this.props.id}</p>
            const graphic = data.graphic
            return <SingleItemStyles>
                <Head>
                    <title>{graphic.number} | {graphic.lastName}</title>
                </Head>
                <img src={graphic.image} alt={graphic.last} />
                <div className="details">
                <h2>{graphic.number} | {graphic.firstName} {graphic.lastName}</h2>
                </div>
            </SingleItemStyles>
        }}
      </Query>
    )
  }
}

export default SingleGraphic