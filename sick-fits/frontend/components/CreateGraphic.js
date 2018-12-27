import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';
import Form from './styles/Form';
import formatMoney from '../lib/formatMoney';
import Error from './ErrorMessage';

const CREATE_GRAPHIC_MUTATION = gql `
    mutation CREATE_GRAPHIC_MUTATION(
            $number: Int!
            $lastName: String!
            $firstName: Int!
            $organization: String
            $title: String
            $category: String
            $image: String
            $leader: Boolean
    ) {
        CREATE_GRAPHIC_MUTATION(
            number: $number
            lastName: $lastName
            firstName: $firstName
            organization: $organization
            title: $title
            category: $category
            image: $image
            leader: $leader
        ) {
            id
        }
    }
`;

const  categoriesOptions = [ 'Generic', 'PA Senate', 'PA House', 'Federal'];


class CreateGraphic extends Component {
    state = {
        number: '',
        lastName: '',
        firstName: '',
        organization: '',
        title: '',
        category: '',
        image: '',
        leader: '',
        value:''
    };


    handleChange = (e) => {
        const { name, type, value } = e.target;
        const val = type === 'number' ? parseFloat(value) : value;
        this.setState({ [name]: val })
    };

    uploadFile = async (e) => {
        const files = e.target.files;
        const data = new FormData()
        data.append('file', files[0])
        data.append('upload_preset','sickfits');

        const res = await fetch('https://api.cloudinary.com/v1_1/pcntv/image/upload', {
            method: 'POST',
            body: data
        });
        const file = await res.json();
        console.log(file)
        this.setState({
            image: file.secure_url,
            largeImage: file.eager[0].secure_url
        })
    };

    render() {
        return (
            <Mutation mutation={CREATE_GRAPHIC_MUTATION}
            variables = {this.state}>
            {(createGraphic, { loading, error}) => (
                
    <Form 
        onSubmit={async e => {
            // Stop the form from submitting
        e.preventDefault();
        // call the mutation
        const res = await createItem();
        //change them to the single item page
        Router.push({
            pathname: '/graphic',
            query: { id: res.data.createItem.id }
        })
    }}
    >
    <Error error={error}/>
        <fieldset disabled={loading} aria-busy={loading}>
        {/* <label 
                htmlFor="file">
                    Image
                <input 
                    type="file" 
                    id="file" 
                    name="file" 
                    placeholder="Upload an image" required 
                    onChange={this.uploadFile}
                    />
                    {this.state.image && <img width="200" src={this.state.image} alt="Upload Preview"/>}
                </label> */}

        
            {/* lastName: $lastName
            firstName: $firstName
            organization: $organization
            title: $title
            category: $category
            image: $image
            leader: $leader */}

            <label 
            htmlFor="category">
                Category
            <input 
                type="dropdown" 
                id="text" 
                name="category" 
                placeholder="Category" required 
                value={this.state.category}
                onChange={this.handleChange}
                />
            </label>

            <label
                htmlFor="number">
                    Number
                <input 
                    type="number" 
                    id="number" 
                    name="number" 
                    placeholder="Number" required 
                    value={this.state.number}
                    onChange={this.handleChange}
                    />
                </label>

                <label>
                Pick your favorite flavor:
          <select name="value" value={this.state.value} onChange={this.handleChange}>
                <option value=""></option>
                <option value="grapefruit">Grapefruit</option>
                <option value="lime">Lime</option>
                <option value="coconut">Coconut</option>
                <option value="mango">Mango</option>
          </select>
        </label>

                <label 
                htmlFor="lastName">
                    Last Name
                <input 
                    type="text" 
                    id="lastName"
                    options={categoriesOptions} 
                    name="lastName" 
                    placeholder="Last Name" required 
                    value={this.state.lastName}
                    onChange={this.handleChange}
                    />
                </label>

                <label 
                htmlFor="firstName">
                    First Name
                <input 
                    type="text" 
                    id="firstName" 
                    name="firstName" 
                    placeholder="First Name" required 
                    value={this.state.firstName}
                    onChange={this.handleChange}
                    />
                </label>

                <label 
                htmlFor="organization">
                    Organization
                <input 
                    type="text" 
                    id="organization" 
                    name="organization" 
                    placeholder="Organization" required 
                    value={this.state.organization}
                    onChange={this.handleChange}
                    />
                </label>

                <label 
                htmlFor="title">
                    Title
                <input 
                    type="text" 
                    id="title" 
                    name="title" 
                    placeholder="Title" required 
                    value={this.state.title}
                    onChange={this.handleChange}
                    />
                </label>


                <label 
                htmlFor="title">
                    Title

                <input 
                    type="text" 
                    id="title" 
                    name="title" 
                    placeholder="Title" required 
                    value={this.state.title}
                    onChange={this.handleChange}
                    />

                </label>

                <label 
                htmlFor="title">
                    Title
                <input 
                    type="text" 
                    id="title" 
                    name="title" 
                    placeholder="Title" required 
                    value={this.state.title}
                    onChange={this.handleChange}
                    />
                </label>

                <label 
                htmlFor="price">
                    Price
                <input 
                    type="number" 
                    id="price" 
                    name="price" 
                    placeholder="Price" required 
                    value={this.state.price}
                    onChange={this.handleChange}
                    />
                </label>

                <label 
                htmlFor="description">
                    Description
                <textarea 
                    id="description" 
                    name="description" 
                    placeholder="Enter A Description" required 
                    value={this.state.description}
                    onChange={this.handleChange}
                    />
                </label>
                <button type="submit">Submit</button>


        </fieldset>

    </Form>
                    )}
                    </Mutation>
        
        )}
}

export default CreateGraphic;
export { CREATE_GRAPHIC_MUTATION };
