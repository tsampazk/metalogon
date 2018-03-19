module.exports = function(User, cryptography) {

    return {

        create: function(req, res) {

            if (req.body.email && req.body.password) {

                async.waterfall([
                    (done) => User.get({ email: { $regex: "(?i)" + req.body.email } }, done),
                    (user, done) => {
                        if (user) {
                            cryptography.createPasswordHash(req.body.password, user.salt, (err, hash) => done(err, user, hash));
                        }
                        else {
                            done(null, null, null);
                        }
                    }
                ], (err, user, hash) => {
                    if (err) {
                        res.status(500).json({ success: false, message: err.message, stack: err.stack });
                    }
                    else if (user && user.hash === hash) {

                        user.token = cryptography.createToken();

                        User.update(user.id, user, (err) => {

                            if (err) {
                                res.status(500).json({ success: false, message: err.message, stack: err.stack });
                            }
                            else {
                                res.status(200).json({
                                    success: true,
                                    data: {
                                        id: user.id,
                                        token: user.token,
                                        role: user.role
                                    }
                                });
                            }

                        });

                    }
                    else {
                        res.status(401).json({ success: false, message: "Invalid email or password" });
                    }
                });

            }

        }

    };

};