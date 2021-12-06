const redirect = (response) => {
    window.location = response.redirect;
};

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

module.exports = {
    redirect,
    getToken,
};