const getToken = (callback) => {
    fetch(`/getToken`, {
        method: 'GET',
        mode: 'cors',
    })
    .then(response => {
        return response.json();
    })
    .then(data => {
        callback(data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
};

const checkLoggedIn = (callback) => {
    fetch(`/isLoggedIn`, {
        method: 'GET',
        mode: 'cors',
    })
    .then(response => {
        return response.json();
    })
    .then(data => {
        callback(data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

module.exports = {
    getToken,
    checkLoggedIn,
};