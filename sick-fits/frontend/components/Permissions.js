import { Query } from 'react-apollo';
import Error from './ErrorMessage';
import gql from 'graphql-tag';
import Table from './styles/Table';

const ALL_USERS_QUERY = gql`
    query {
        users {
            id
            name
            email
            permissions
        }
    }
`

const possiblePermissions = [
    'ADMIN',
    'USER',
    'ITEMCREATE',
    'ITEMUPDATE',
    'ITEMDELETE',
    'PERMISSIONUPDATE',
]

const Permissions = (props) => (
    <Query query={ALL_USERS_QUERY}>
    {({data, loading, error}) => console.log(data) || (
        <div>
        <Error error={error} />
        <div>
            <h2>Manage Permissions</h2>
            <Table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        {possiblePermissions.map(permission => <th>{permission}</th>)}
                        <th>↓</th>
                    </tr>
                    <thead>
                        <tbody>
                            {data.users.map(user => user.name)}
                        </tbody>
                    </thead>
                </thead>
            </Table>


        </div>
        </div>
    )}
    </Query>
)
// 18:43 Module 35
export default Permissions;