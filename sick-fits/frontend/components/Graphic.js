import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Title from './styles/Title';
import ItemStyles from './styles/ItemStyles';
import DeleteItem from './DeleteItem';
import AddToCart from './AddToCart';

class Graphic extends Component {
    // static propTypes = {
    //   item: PropTypes.object.isRequired,
    // };

    render() {
        const { graphic } = this.props;
        return( 
        <ItemStyles>
            <p>{graphic.number} {graphic.firstName}</p>

            {/* number: $number
            lastName: $lastName
            firstName: $firstName
            organization: $organization
            title: $title
            category: $category
            image: $image
            leader: $leader */}

            {/* {graphic.image && <img src={graphic.image} alt={graphic.title} />}
            <Title>
                <Link href=
                    {{ 
                    pathname: '/graphic',
                    query: {id: graphic.id} 
                    }}>
                <a>
                {graphic.title}
                </a>
                </Link>
            </Title>
            <p>{graphic.description}</p> */}

            {/* <div className="buttonList">
            <Link 
            href={{
                pathname: 'update',
                query: { id: graphic.id },
            }}
            >
            <a>Edit ✏️</a> 
            </Link>
            <AddToCart id={graphic.id} />
            <DeleteItem id={graphic.id}>Delete This Item</DeleteItem>
            </div> */}
        </ItemStyles>

        )
    }
}

export default Graphic
