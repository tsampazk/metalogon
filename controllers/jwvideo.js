module.exports = function(jwPlatform) {
    
    let api = new jwPlatform({
        key: config.jwPlatform.key,
        secret: config.jwPlatform.secret,
    });
    
    return {
    
        get: function(req, res) {
            api.post("v1/videos/show", { video_key: req.params.id }, null, result(req, res));
        },
    
        getAll: function(req, res) {
            api.post("v1/videos/list", null, null, result(req, res));
        },
    
        create: function(req, res) {
            api.post("v1/videos/create", null, req.body, result(req, res));
        },
    
        delete: function(req, res) {
            api.post("v1/videos/delete", { video_key: req.params.id }, null, result(req, res));
        }
        
    };
    
    function result(req, res) {
        
        return function(err, result) {
    
            if (err) {
                res.status(500).json({ success: false, message: err.message, stack: err.stack });
            }
            else {
                res.json({ success: true, data: result });
            }
    
        }
        
    }
    
};