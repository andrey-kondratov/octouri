import { ERROR, WARN, INFO, SUCCESS } from '../constants/snackbar';
import * as types from '../constants/ActionTypes';
import { DEFAULT_SNACKBAR_DURATION } from '../constants/defaults';

const showSnackbar = (message, level = INFO, duration = DEFAULT_SNACKBAR_DURATION) => ({
    type: types.SHOW_SNACKBAR,
    message,
    level,
    duration
});

export const showSuccess = (message, duration = DEFAULT_SNACKBAR_DURATION) => showSnackbar(message, SUCCESS, duration);
export const showWarning = (message, duration = DEFAULT_SNACKBAR_DURATION) => showSnackbar(message, WARN, duration);
export const showError = (message, duration = DEFAULT_SNACKBAR_DURATION) => showSnackbar(message, ERROR, duration);
export const showInfo = (message, duration = DEFAULT_SNACKBAR_DURATION) => showSnackbar(message, INFO, duration);

export const hideSnackbar = () => ({
    type: types.HIDE_SNACKBAR
});