module.exports = (mongo) => {

    const client = mongo.MongoClient;

    return {

        connect: function(done) {

            client.connect(config.store.host, (err, db) => {

                if (!err) {

                    console.log("Database connected");

                    this.dbo = db.db(config.store.db);

                    done(null, this.dbo);

                }
                else {

                    console.log("Unable to connect to database");

                    done(err);

                }

            });

        }

    }

};