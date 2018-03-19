module.exports = (crypto, uuid) => {

    return {

        createPasswordHash: function(password, salt, done) {

            /**
             * Byte size
             */
            let len = 128;

            /**
             * Iterations ~300ms
             */
            let iterations = 12000;

            /**
             * Digest
             */
            let digest = "SHA1";

            if (arguments.length === 3) {
                crypto.pbkdf2(password, salt, iterations, len, digest, function(err, hash) {

                    if (err) return done(err);

                    done(null, hash.toString('base64'), salt);

                });
            }
            else {

                done = salt;

                crypto.randomBytes(len, function(err, salt){

                    if (err) return done(err);

                    salt = salt.toString('base64');

                    crypto.pbkdf2(password, salt, iterations, len, digest, function(err, hash) {

                        if (err) return done(err);

                        done(null, hash.toString('base64'), salt);

                    });

                });

            }

        },

        createToken: function() {

            return uuid();

        }

    };

};