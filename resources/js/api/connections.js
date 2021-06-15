import axios from 'axios';

export default async () => {
    let state = JSON.parse(localStorage['appState']);
    console.log('state', state);
    return await axios.get('/api/contacts', {
        headers: {
            Authorization: 'Bearer ' + state.user.access_token,
        },
    });
};
