import PleaseSignIn from '../components/PleaseSignin';
import Chat from '../components/chat/Chat';



const OrderPage = props => (
    <div>
        <PleaseSignIn>
        <Chat></Chat>
        </PleaseSignIn>
    </div>
);

export default OrderPage;