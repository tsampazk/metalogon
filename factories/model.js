module.exports = function(store, schema) {
    
    return {
        
        get: function(criteria, done) {
            
            if (typeof criteria === "string") {
                store.dbo.collection(schema.name).findOne({ id: criteria }, done);
            }
            else {
                store.dbo.collection(schema.name).findOne(criteria, done);
            }

        },

        getAll: function(criteria, done) {

            if (_.isArray(criteria)) {
                store.dbo.collection(schema.name).find({ id: { $in: criteria } }).toArray(done);
            }
            else {
                store.dbo.collection(schema.name).find(criteria).toArray(done);
            }

        },
        
        create: function(data, done) {
    
            async.waterfall([
                (done) => Joi.validate(data, schema.create, done),
                (value, done) => store.dbo.collection(schema.name).insertOne(value, (err) => done(err, value))
            ], done);

        },
        
        update: function(id, data, done) {
    
            async.waterfall([
                (done) => Joi.validate(data, schema.update, done),
                (value, done) => store.dbo.collection(schema.name).updateOne({ id: id }, { $set: value }, done)
            ], done);

        },
        
        delete: function(id, done) {

            store.dbo.collection(schema.name).remove({ id: id }, done);
            
        }
        
    }
    
};