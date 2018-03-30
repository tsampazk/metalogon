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
        key: "42cgSrMI",
        secret: "b2rWFGGh8b84Z8bclyCSROg2"
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