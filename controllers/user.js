module.exports = function(User, cryptography, invitations) {

    return {

        get: function(req, res) {
            User.get(req.params.id, obj(req, res, [ "hash", "salt", "token" ]));
        },

        getAll: function(req, res) {
            User.getAll(req.query, list(req, res, [ "hash", "salt", "token" ]));
        },

        create: function(req, res) {

            const data = req.body;

            const isAdmin = req.cx.user && req.cx.user.role === "administrator";

            if (!_.isNil(data.role) && !isAdmin) {
                data.role = "student";
            }

            const invitation = invitations[req.query.invitation];

            if (!_.isNil(invitation)) {

                data.email = invitation.email;
                data.role = invitation.role;

                delete invitations[req.query.invitation];

            }

            async.waterfall([
                (done) => _.isNil(data.password) ? done(null, null, null) : cryptography.createPasswordHash(data.password, done),
                (hash, salt, done) => {

                    if (hash) {
                        delete data.password;
                        data.hash = hash;
                        data.salt = salt;
                    }

                    User.create(data, done);

                }
            ], obj(req, res, [ "hash", "salt", "token" ]));

        },

        update: function(req, res) {

            const data = req.body;

            async.waterfall([
                (done) => _.isNil(data.password) ? done(null, null) : cryptography.createPasswordHash(data.password, done),
                (hash, salt, done) => {

                    if (hash) {
                        data.hash = hash;
                        data.salt = salt;
                    }

                    User.update(req.params.id, data, done);

                }
            ], updateResult(req, res));

        },

        delete: function(req, res) {
            User.delete(req.params.id, deleteResult(req, res));
        }

    };

    function obj(req, res, omit) {

        return function(err, data) {
            if (err) {
                res.status(500).json({ success: false, message: err.message, stack: err.stack });
            }
            else if (_.isNil(data)) {
                res.status(404).json({ success: false });
            }
            else {
                res.json({ success: true, data: _.omit(data, omit) });
            }
        };

    }

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