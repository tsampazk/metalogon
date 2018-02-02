module.exports = {
    
    api: {
        root: "/rest",
        interface: "0.0.0.0",
        port: process.env.PORT
    },
    
    mongodb: {
        host: process.env.MONGODB_URI
    },
    
    jwPlatform: {
        key: "1jGlF6St",
        secret: "TFGhnmFNM2vTgCe17I4lQ6N8"
    }

};