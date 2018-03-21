module.exports = {
    
    api: {
        root: "/rest",
        interface: "0.0.0.0",
        port: process.env.PORT
    },
    
    store: {
        host: process.env.MONGODB_URI,
        db: process.env.STORE_DB
    },
    
    jwPlatform: {
        key: "1jGlF6St",
        secret: "TFGhnmFNM2vTgCe17I4lQ6N8"
    },

    security: {

        authorization: {

            exceptions: [

                // Access token
                {
                    method: "POST",
                    url: "^{root}\\/login$"
                },
                {
                    method: "POST",
                    url: "^{root}\\/user$"
                },
                {
                    method: "POST",
                    url: "^{root}\\/user\\?invitation\\=[a-z0-9\\-]+$"
                }


            ]

        }

    }

};