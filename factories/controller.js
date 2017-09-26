module.exports = function(model) {
    
    return {
        
        get: function(req, res) {
    
            model.get(req.params.id, obj(req, res));
        
        },
        
        getAll: function(req, res) {
    
            model.getAll(req.query, list(req, res));

        },
        
        create: function(req, res) {
        
            model.create(req.body, obj(req, res));
            
        },
        
        update: function(req, res) {
    
            model.update(req.params.id, req.body, updateResult(req, res));

        },
        
        delete: function(req, res) {
    
            model.delete(req.params.id, deleteResult(req, res));
    
        },
        
    };
    
    function obj(req, res) {
        
        return function(err, data) {
            if (err) {
                res.status(500).json({ success: false, message: err.message, stack: err.stack });
            }
            else if (_.isNil(data)) {
                res.status(404).json({ success: false });
            }
            else {
                res.json({ success: true, data: data });
            }
        };
        
    }
    
    function list(req, res) {
        
        return function(err, data) {
            if (err) {
                res.status(500).json({ success: false, message: err.message, stack: err.stack });
            }
            else if (_.isNil(data)) {
                res.status(404).json({ success: false });
            }
            else {
                res.json({ success: true, count: data.length, data: data });
            }
        };
        
    }
    
    function updateResult(req, res) {
        
        return function(err, result) {
            
            if (err) {
                res.status(500).json({ success: false, message: err.message, stack: err.stack });
            }
            else if (result.ok !== 1) {
                res.status(500).json({ success: false, data: result });
            }
            else if (result.n === 0) {
                res.status(404).json({ success: false, data: result });
            }
            else {
                res.json({ success: true, data: result }).end();
            }
            
        };
        
    }
    
    function deleteResult(req, res) {
        
        return function(err, commandResult) {
            
            if (err) {
                res.status(500).json({ success: false, message: err.message, stack: err.stack });
            }
            else if (commandResult.result.ok !== 1) {
                res.status(500).json({ success: false, data: commandResult });
            }
            else if (commandResult.result.n === 0) {
                res.status(404).json({ success: false, data: commandResult });
            }
            else {
                res.json({ success: true, data: commandResult }).end();
            }
            
        };
        
    }
    
};