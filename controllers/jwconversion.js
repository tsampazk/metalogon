module.exports = function(jwPlatform) {
    
    let api = new jwPlatform({
        key: config.jwPlatform.key,
        secret: config.jwPlatform.secret,
    });
    
    return {
    
        get: function(req, res) {
            api.post("v1/videos/conversions/show", { conversion_key: req.params.id }, null, result(req, res));
        },
    
        getAll: function(req, res) {
            api.post("v1/videos/conversions/list", { video_key: req.query.videoId }, null, result(req, res));
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