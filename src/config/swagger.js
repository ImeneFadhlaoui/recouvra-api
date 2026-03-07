const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Recouvra+ API',
            version: '1.0.0',
            description: 'API de gestion du recouvrement',
        },
        servers: [{ url: 'http://localhost:3000/api' }],
        components: {
            securitySchemes: {
                cookieAuth: {
                    type: 'apiKey',
                    in: 'cookie',
                    name: 'token'
                }
            }
        },
        security: [{ cookieAuth: [] }]
    },
    apis: ['./src/routes/*.js']
};

module.exports = swaggerJsdoc(options);