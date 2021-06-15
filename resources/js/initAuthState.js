import { setAuthState } from 'UBHR/actions/authActions';

export function initAuthState(store) {
    let state_of_state = localStorage['appState'];
    if (!state_of_state) {
        let appState = {
            isLoggedIn: false,
            user: {},
        };
        localStorage['appState'] = JSON.stringify(appState);
    }
    let state = localStorage['appState'];
    let AppState = JSON.parse(state);
    const { isLoggedIn, user } = AppState;
    store.dispatch(setAuthState({ isLoggedIn, user }));
}
