/* src/reducers/snackbar.js */

import * as types from '../constants/ActionTypes';
import { DEFAULT_SNACKBAR_DURATION, DEFAULT_SNACKBAR_LEVEL } from '../constants/defaults';

const initialState = {
    open: false,
    message: '',
    level: DEFAULT_SNACKBAR_LEVEL,
    duration: DEFAULT_SNACKBAR_DURATION
}

export default function snackbar(state = initialState, action) {
    switch (action.type) {
        case types.SHOW_SNACKBAR:
            return { ...state, open: true, message: action.message, level: action.level, duration: action.duration || DEFAULT_SNACKBAR_DURATION };
        case types.HIDE_SNACKBAR:
            return { ...state, open: false };
        default:
            return state;
    }
}