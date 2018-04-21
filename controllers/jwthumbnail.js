module.exports = function(jwPlatform) {
    
    let api = new jwPlatform({
        key: config.jwPlatform.key,
        secret: config.jwPlatform.secret,
    });
    
    return {
    
        get: function(req, res) {
            api.post("v1/videos/thumbnails/show", { video_key: req.params.id }, null, result(req, res));
        },

        update: function(req, res) {
            api.post("v1/videos/thumbnails/update", { video_key: req.params.id }, req.body, result(req, res));
        }
        
    };
    
    function result(req, res) {
        
        return function(err, result) {
    
            if (err) {
                res.status(500).json({ success: false, message: err.message, stack: err.stack, data: err });
            }
            else {
                res.json({ success: true, data: result });
            }
    
        }
        
    }
    
};