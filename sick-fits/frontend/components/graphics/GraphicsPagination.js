import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Head from 'next/head';
import Link from 'next/link';
import PaginationStyles from '../styles/PaginationStyles';
import { perPage } from '../../config';

const GRAPHICS_PAGINATION_QUERY = gql`
    query GRAPHICS_PAGINATION_QUERY {
        graphicsConnection {
            aggregate {
                count
            }
        }
    }
    `;

const GraphicsPagination = props => (
    <Query query={GRAPHICS_PAGINATION_QUERY}>
        {({ data, loading, error}) => {
            if (loading) return <p>Loading.....</p>
            const count = data.graphicsConnection.aggregate.count;
            const pages = Math.ceil(count / perPage);
            const page = props.page;
            return (
            <PaginationStyles>
                <Head>
                    <title>PCN - Page {page} of {pages}
                    </title>
                </Head>
                <Link 
                    prefetch
                    href={{
                        pathname: 'graphics',
                        query: { page: page -1 }
                        }}>
                        <a className="prev" aria-disabled={page <= 1}>← Prev</a>
                        </Link>
                <p>Page {props.page} of {pages}!</p>
                <p>{count} Graphics Total</p>
                <Link 
                    prefetch
                    href={{
                        pathname: 'graphics',
                        query: { page: page + 1 }
                        }}>
                        <a className="next" aria-disabled={page >= pages}>Next →</a>
                        </Link>
            </PaginationStyles>
        );
        }}
        </Query>
)

export default GraphicsPagination;