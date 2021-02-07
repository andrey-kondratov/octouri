/* src/actions/OctouriActions.js */

import * as types from '../constants/ActionTypes';
import { status, json } from '../utils/requests';
import { getServerUrl, getUserApiKey, getEnvironments, getEnvironment, getLastEnvironmentId } from '../selectors';
import { DEFAULT_ENVIRONMENTS_FETCH_PAGE_SIZE, DEFAULT_MACHINES_FETCH_PAGE_SIZE } from '../constants/defaults';
import { showSuccess, showInfo, showError, showWarning } from './SnackbarActions';
const { spawn } = window.require('child_process');
const _ = require('lodash');

export const initialize = (url, apiKey) => (dispatch) => {
    if (!url || !apiKey) {
        dispatch(showError(`Configuration error.`));
        dispatch(showSettings());
        return;
    }

    const server = {
        url,
        hostname: new URL(url).hostname,
        connecting: true
    };

    const user = {
        apiKey
    };

    dispatch(reload(server, user));
    dispatch(showInfo(`Connecting to ${server.hostname}...`, 30000));
    dispatch(showProgress());

    window.fetch(`${url}/api/users/me`, {
        headers: {
            'X-Octopus-ApiKey': `${apiKey}`
        }
    })
        .then(status)
        .then(json)
        .then(me => {
            window.fetch(`${url}/api`, {
                headers: {
                    'X-Octopus-ApiKey': `${apiKey}`
                }
            })
                .then(status)
                .then(json)
                .then(api => {
                    server.connecting = false;
                    server.connected = true;
                    user.username = me.Username;
                    user.displayName = me.DisplayName;

                    dispatch(reload(server, user));
                    dispatch(hideSettings());

                    dispatch(showSuccess(`Connected as ${me.DisplayName}, API version ${api.ApiVersion}.`));
                    dispatch(fillEnvironments());
                })
        })
        .catch(() => {
            server.connecting = false;

            dispatch(reload(server, user));
            dispatch(showError(`Connection failed.`));
            dispatch(hideProgress());
        });
}

export const retryInitialize = () => (dispatch, getState) => {
    const state = getState();
    const environment = getEnvironment(state);
    dispatch(updateLastEnvironmentId(environment.id));

    const url = getServerUrl(state);
    const apiKey = getUserApiKey(state);

    dispatch(initialize(url, apiKey));
};

const updateLastEnvironmentId = value => ({
    type: types.UPDATE_LAST_ENVIRONMENT_ID,
    value
})

const reload = (server, user) => ({
    type: types.RELOAD,
    server,
    user
});

export const hideSettings = () => {
    return {
        type: types.CHANGE_SETTINGS_VISIBILITY,
        value: false
    }
}

export const showSettings = () => {
    return {
        type: types.CHANGE_SETTINGS_VISIBILITY,
        value: true
    }
}

const fillEnvironments = () => (dispatch, getState) => {
    const state = getState();
    const url = getServerUrl(state);
    const apiKey = getUserApiKey(state);
    const lastEnvironmentId = getLastEnvironmentId(state);

    if (!url || !apiKey) {
        dispatch({
            type: types.FILL_ENVIRONMENTS
        });
    }

    const pageSize = DEFAULT_ENVIRONMENTS_FETCH_PAGE_SIZE;

    window.fetch(`${url}/api/environments?take=${pageSize}`, {
        headers: {
            'X-Octopus-ApiKey': `${apiKey}`
        }
    })
        .then(status)
        .then(json)
        .then(data => {
            let environments = data.Items
                .map(item => ({
                    id: item.Id,
                    name: item.Name,
                    description: item.description
                }));

            environments = _.orderBy(environments, ['name']);

            dispatch({
                type: types.FILL_ENVIRONMENTS,
                environments: environments
            });

            dispatch(hideProgress());

            if (lastEnvironmentId) {
                dispatch(selectEnvironment(lastEnvironmentId));
            }
        })
        .catch(error => {
            alert(error);

            dispatch({
                type: types.FILL_ENVIRONMENTS
            });

            dispatch(hideProgress());
        });
}

export const selectEnvironment = id => (dispatch, getState) => {
    const state = getState();
    const environments = getEnvironments(state);

    const environment = environments.find(x => x.id === id);
    if (!environment) {
        dispatch(showWarning(`Something went wrong.`));
        return;
    }

    dispatch({
        type: types.SELECT_ENVIRONMENT,
        environment
    });

    dispatch(showProgress());

    const url = getServerUrl(state);
    const apiKey = getUserApiKey(state);
    const pageSize = DEFAULT_MACHINES_FETCH_PAGE_SIZE;

    window.fetch(`${url}/api/environments/${environment.id}/machines?take=${pageSize}`, {
        headers: {
            'X-Octopus-ApiKey': `${apiKey}`
        }
    })
        .then(status)
        .then(json)
        .then(data => {
            let machines = data.Items
                .map(item => ({
                    id: item.Id,
                    name: item.Name,
                    ip: item.Uri ? new URL(item.Uri).hostname : (item.Endpoint ? item.Endpoint.Host : null),
                    isDisabled: item.IsDisabled,
                    roles: item.Roles,
                    status: item.Status,
                    healthStatus: item.HealthStatus,
                    statusSummary: item.StatusSummary
                }));

            machines = _.orderBy(machines, ['ip']);
            environment.machines = machines;

            dispatch({
                type: types.SELECT_ENVIRONMENT,
                environment
            });
            dispatch(hideProgress());
        })
        .catch(() => {
            dispatch(showError(`Failed to list machines in ${environment.name}.`));
            dispatch(hideProgress());
        });
}

export const showProgress = () => ({
    type: types.SHOW_PROGRESS
});

export const hideProgress = () => ({
    type: types.HIDE_PROGRESS
});

export const openExplorer = environment => dispatch => {
    const path = `\\\\${environment.ip}\\c$\\`;

    dispatch(showInfo(`Opening ${path} in explorer...`));
    spawn('explorer', [path]);
};

export const openRDP = environment => dispatch => {
    const ip = environment.ip;

    dispatch(showInfo(`Opening ${ip} in Remote Desktop...`));
    spawn('mstsc', [`/v:${ip}`, '/f']);
}