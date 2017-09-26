module.exports = function(db, schema) {
    
    let model = db.model(schema.name, joigoose.convert(schema.create));
    
    return {
        
        get: function(id, done) {
            
            model.findOne({ id: id }).exec(done);
            
        },
        
        getAll: function(criteria, done) {
            
            model.find(criteria).exec(done);
            
        },
        
        create: function(data, done) {
    
            async.waterfall([
                (done) => Joi.validate(data, schema.create, done),
                (value, done) => model.create(value, done)
            ], done);

        },
        
        update: function(id, data, done) {
    
            async.waterfall([
                (done) => Joi.validate(data, schema.update, done),
                (value, done) => model.update(value).where({ id: id}).exec(done)
            ], done);

        },
        
        delete: function(id, done) {
    
            model.remove().where({ id: id }).exec(done);
            
        }
        
    }
    
};