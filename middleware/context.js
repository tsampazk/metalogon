module.exports = (User) => {

    const context = {};

    let lastRequestId = 0;

    context.initialize = (req, res, next) => {

        req.cx = {
            requestId: ++lastRequestId
        };

        res.cx = {
            json: (data) => {

                if (req.query.fields) {

                    const fields = req.query.fields.split(",");
                    let pickedData;

                    if (_.isArray(data)) {
                        pickedData = _.map(data, (item) => { return _.pick(item, fields);  });
                    }
                    else {
                        pickedData = _.pick(data, req.query.fields.split(","));
                    }

                    res.json({
                        success: true,
                        data: pickedData
                    });

                }
                else {

                    res.json({
                        success: true,
                        data: data
                    });

                }

            }
        };

        next();

    };

    context.authenticate = (req, res, next) => {

        if (req.headers.token) {

            User.get({ token: req.headers.token }, (err, user) => {
                if (!err) {

                    if (user) {
                        req.cx.user = user;
                    }

                    next();

                }
                else {
                    next(err);
                }
            })

        }
        else {
            next();
        }

    };

    context.authorize = (req, res, next) => {

        if (!req.cx.user) {

            let allow = false;

            _.each(config.security.authorization.exceptions, (exception) => {

                if (exception.method.toLowerCase() === req.method.toLowerCase() || exception.method === "*") {

                    let pattern = new RegExp(exception.url.replace("{root}", config.api.root.replace("/", "\\/")));

                    allow |= pattern.test(req.originalUrl);

                }

            });

            if (allow) {
                next();
            }
            else {
                res.status(401).json({ success: false, message: "Unauthorized" });
            }

        }
        else {
            next();
        }

    };

    context.handleErrors = (err, req, res, next) => {

        res.status(err.status ? err.status : 500);
        res.json({
            success: false,
            data: err.message
        });

        next();

    };

    return context;

};
