const serverUrl = process.env.REACT_APP_SERVER_URL;
if (!serverUrl) {
    throw new Error('REACT_APP_SERVER_URL must be set!');
}

export const config = {
    serverUrl
};