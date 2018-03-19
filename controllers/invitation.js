module.exports = function(invitations) {

    return {

        create: function(req, res) {

            if (req.cx.user && req.cx.user.role === "administrator") {

                const id = uuid();

                if (req.body.email && req.body.role) {
                    res.status(200).json({
                        success: true,
                        data: invitations[id] = {
                            id: id,
                            email: req.body.email,
                            role: req.body.role,
                            createdAt: Date.now()
                        }
                    });
                }
                else {
                    res.status(405).json({ success: false, message: "Email and/or role not specified" });
                }

            }
            else {
                res.status(409).json({ success: false, message: "Not allowed" });
            }


        }

    };

};