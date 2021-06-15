const SERVER = 'https://ubhr.net:8080';
import socketClient from 'socket.io-client';
import appData from 'UBHR/services/appData';
import { setChatUsers } from 'UBHR/actions/chatActions';

let isLoggedIn = false;

export function chatService(store) {
    appData.socket = socketClient(SERVER);
    appData.socket.on('connection', (myID) => {
        console.log(`I'm connected with the back-end`, myID);
    });

    appData.socket.on('getUsers', (users) => {
        console.log('users', users);
        store.dispatch(setChatUsers({ users }));
    });

    function retrieveIsLoggedIn(state) {
        return state.auth.isLoggedIn;
    }
    function retrieveUser(state) {
        return state.auth.user;
    }

    function handleUserLoggedInChange() {
        let previousIsLoggedIn = isLoggedIn;
        isLoggedIn = retrieveIsLoggedIn(store.getState());
        if (previousIsLoggedIn !== isLoggedIn) {
            console.log('s-a miscat ceva');
            if (isLoggedIn === true) {
                console.log('userul s-a logat');
                const user = retrieveUser(store.getState());
                console.log('user', user);
                appData.socket.emit('addUser', user.id);
            } else {
                console.log('userul s-a delogat');
            }
        }
    }
    store.subscribe(handleUserLoggedInChange);
}
