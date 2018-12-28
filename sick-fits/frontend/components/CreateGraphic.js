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
            $firstName: String!
            $organization: String
            $title: String
            $category: String
            $image: String
            $leader: Boolean
    ) {
        createGraphic(
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
//TODO Move to database
const  categoriesOptions = [ '','Generic', 'PA Senate', 'PA House', 'Federal'];


class CreateGraphic extends Component {
    state = {
        number: '',
        lastName: '',
        firstName: '',
        organization: '',
        title: '',
        category: '',
        image: 'test.jpg',
        leader: false,
    };


    handleChange = (e) => {
        const { name, type, value } = e.target;
        const val = type === 'number' ? parseFloat(value) : value;
        this.setState({ [name]: val })
    };

    handleCheckBox = (e) => {
        this.setState({
            leader: e.target.checked
        })
    }

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
        const res = await createGraphic();
        //change them to the single item page
        Router.push({
            pathname: '/graphic',
            query: { id: res.data.createGraphic.id }
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
                <select name="category" value={this.state.category} onChange={this.handleChange} required>
            {categoriesOptions.map((category, i) => <option key={i}>{category}</option>)}
          </select>
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
                    placeholder="First Name" 
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
                    placeholder="Organization" 
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
                    placeholder="Title" 
                    value={this.state.title}
                    onChange={this.handleChange}
                    />
                </label>


                <label 
                htmlFor="image">
                    Image
                <input 
                    type="text" 
                    id="image" 
                    name="image" 
                    placeholder="image" 
                    value={this.state.image}
                    onChange={this.handleChange}
                    />
                </label>

                <label 
                htmlFor="leader">
                    Leader
                <input 
                    type="checkbox" 
                    id="leader" 
                    name="leader" 
                    placeholder="Leader" 
                    value={this.state.leader}
                    onChange={this.handleCheckBox}
                    checked={this.state.checked}
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
