module.exports = function(models) {
    
    return {
        
        getAll: function(req, res) {
            
            async.waterfall([
                (done) => models.canon.getAll(done),
                (canons, done) => models.category.getAll((err, categories) => done(err, categories, canons)),
                (categories, canons, done) => join(categories, canons, done)
            ], list(req, res));
            
        }
        
    };
    
    function join(categories, canons, done) {
    
        let tree = {};
    
        _.forEach(canons, (c) => tree[c.name] = _.merge(c.toObject(), { categories: [] }));
        _.forEach(categories, (c) => tree[c.canon].categories.push(c.toObject()));
        
        done(null, tree);
    
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
    
};