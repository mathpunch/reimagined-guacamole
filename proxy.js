const fetch = require('node-fetch');

exports.handler = async (event, context) => {
    const { url } = event.queryStringParameters;

    if (!url) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: 'No URL provided' }),
        };
    }

    try {
        const response = await fetch(url);
        const body = await response.text();

        return {
            statusCode: response.status,
            body,
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error fetching the URL', error }),
        };
    }
};
