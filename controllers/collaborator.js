module.exports = function(User, Collaboration) {

    return {

        getAll: function(req, res) {

            async.waterfall([
                (done) => Collaboration.getAll(req.query, done),
                (collaborations, done) => User.getAll(_.map(collaborations, (item) => item.userId ), done)
            ], list(req, res, [ "hash", "salt", "token" ]));

        }

    };

    function list(req, res, omit) {

        return function(err, data) {
            if (err) {
                res.status(500).json({ success: false, message: err.message, stack: err.stack });
            }
            else if (_.isNil(data)) {
                res.status(404).json({ success: false });
            }
            else {
                res.json({ success: true, count: data.length, data: _.map(data, (item) => _.omit(item, omit)) });
            }
        };

    }

};