module.exports = function(Video, Collaboration) {

    return {

        getAll: function(req, res) {

            async.waterfall([
                (done) => Collaboration.getAll(req.query, done),
                (collaborations, done) => Video.getAll(_.map(collaborations, (item) => item.videoId ), done)
            ], list(req, res));

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