const getOctouri = state => state.octouri;
export const getServer = state => getOctouri(state).server;
export const getServerUrl = state => getServer(state).url;
export const getUser = state => getOctouri(state).user;
export const getUserApiKey = state => getUser(state).apiKey;
export const getEnvironments = state => getOctouri(state).environments;