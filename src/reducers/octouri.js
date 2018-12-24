/* src/reducers/octouri.js */

import * as types from '../constants/ActionTypes';

const initialState = {
    showSettings: false,
    server: {
        url: '',
        hostname: '',
        connecting: false,
        connected: false
    },
    user: {
        apiKey: '',
        username: '',
        displayName: ''
    },
    environments: [],
    environment: {
        name: '',
        machines: []
    },
    progress: {
        visible: false
    }
}

export default function octouri(state = initialState, action) {
    switch (action.type) {
        case types.CHANGE_SETTINGS_VISIBILITY:
            return { ...state, showSettings: action.value };
        case types.RELOAD:
            return {
                ...state,
                server: action.server,
                user: action.user,
                environments: [],
                environment: {
                    name: '',
                    machines: []
                }
            }
        case types.FILL_ENVIRONMENTS:
            return { ...state, environments: action.environments };
        case types.SELECT_ENVIRONMENT:
            return { ...state, environment: action.environment };
        case types.SHOW_PROGRESS:
            return { ...state, progress: { ...process, visible: true } };
        case types.HIDE_PROGRESS:
            return { ...state, progress: { ...process, visible: false } };
        default:
            return state;
    }
}