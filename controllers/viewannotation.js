module.exports = function(Annotation, Category) {

    return {

        getAll: function(req, res) {

            async.waterfall([
                (done) => Annotation.getAll(req.query, done),
                (annotations, done) => Category.getAll(_.map(annotations, (item) => item.categoryId ), (err, categories) => done(err, annotations, categories)),
                (annotations, categories, done) => join(annotations, categories, done)
            ], list(req, res));

        }

    };

    function join(annotations, categories, done) {

        _.forEach(annotations, (a) => {

            const c = _.filter(categories, (o) => o.id === a.categoryId);

            if (c)
                a.category = c;
            else
                a.category = null;

        });

        done(null, annotations);

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