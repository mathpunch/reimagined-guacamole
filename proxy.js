const fetch = require('node-fetch');

exports.handler = async (event) => {
    const { url } = event.queryStringParameters;

    if (!url) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: 'No URL provided' }),
        };
    }

    try {
        const response = await fetch(url);
        if (!response.ok) {
            return {
                statusCode: response.status,
                body: JSON.stringify({ message: 'Error fetching the URL', status: response.statusText }),
            };
        }

        const body = await response.text();

        return {
            statusCode: response.status,
            headers: {
                'Content-Type': 'text/html',
                'Access-Control-Allow-Origin': '*',
            },
            body: body,
        };
    } catch (error) {
        console.error('Error fetching the URL:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error fetching the URL', error: error.message }),
        };
    }
};
