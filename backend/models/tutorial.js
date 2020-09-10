//const mongoose = require("mongoose");
//mongoose.Promise = global.Promise;

module.exports = mongoose => {
    const Tutorial = mongoose.model("tutorial",mongoose.Schema(
            {
                title: String,
                description: String,
                published: Boolean
            },
            { timestamps: true }
        )
    );

    return Tutorial;
};