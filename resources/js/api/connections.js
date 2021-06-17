import axios from 'axios';

export default async () => {
    let state = JSON.parse(localStorage['appState']);
    return await axios.get('/api/contacts', {
        headers: {
            Authorization: 'Bearer ' + state.user.access_token,
        },
    });
};

