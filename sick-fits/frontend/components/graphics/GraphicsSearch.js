import React from 'react';
import Downshift, { resetIdCounter } from 'downshift';
import Router from 'next/router';
import { ApolloConsumer, renderToStringWithData } from 'react-apollo';
import gql from 'graphql-tag';
import debounce from 'lodash.debounce';
import { DropDown, DropDownItem, SearchStyles } from '../styles/DropDown';

const SEARCH_GRAPHICS_QUERY = gql`
 query SEARCH_GRAPHICS_QUERY($searchTerm: String!) {
     graphics(where: {
         OR: [
             {lastName_contains: $searchTerm},
             {firstName_contains: $searchTerm},
             {title_contains: $searchTerm},
             {organization_contains: $searchTerm}
            ]
     }) {
         id
         image
         lastName
         firstName
         number
     }
 }
`;

function routeToGraphic(graphic){
 Router.push({
     pathname: '/graphic',
     query: {
         id: graphic.id,
     },
 });
}

class AutoComplete extends React.Component {
    state = {
        graphics: [],
        loading: false,
    }

    onChange = debounce( async (e, client)=> {
        //turn loading on
        this.setState({loading: true});
        // Manually query apollo client
        const res = await client.query({
            query: SEARCH_GRAPHICS_QUERY, 
            variables: { searchTerm: e.target.value },
        });
        this.setState({
            graphics: res.data.graphics,
            loading: false
        })
    }, 350);
    render() {
        resetIdCounter();
        return (
        <SearchStyles>
            <Downshift
                onChange={ routeToGraphic}
                itemToString ={ graphic => (graphic === null ? '' : graphic.lastName)}
            >
                {({getInputProps, getItemProps, isOpen, inputValue, highlightedIndex}) => (

            <div>
                <ApolloConsumer>
                    {(client) => (
                    <input type="search"
                    {...getInputProps({
                        type: 'search',
                        placeholder: "Search For A Graphic",
                        id: "search",
                        className: this.state.loading ? 'loading' : '',
                        onChange: e => {
                            e.persist();
                            this.onChange(e, client);
                        }, 
                    })} 
                    />
                    )}

                </ApolloConsumer>
                { isOpen && (
                    <DropDown>
            {this.state.graphics.map((item, index) => (
                <DropDownItem 
                    {...getItemProps({ item })} 
                    key={item.id}
                    highlighted={index === highlightedIndex}
                >
                <img width="50" src={item.image} alt={item.lastName} />
                {item.number} {''}
                 {item.firstName} {''} {item.lastName}
                
              </DropDownItem>
            ))}
            {!this.state.graphics.length && 
            !this.state.loading && (
                <DropDownItem> Nothing Found {inputValue}
                </DropDownItem>
            )}
          </DropDown>
            )}
            </div>
            )}
        </Downshift>
        </SearchStyles>
        )
    }
}

export default AutoComplete;