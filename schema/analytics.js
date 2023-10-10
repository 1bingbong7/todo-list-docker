const mongoose = require("mongoose");
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");
const schema = mongoose.Schema(
    {
        path: {
            required: true,
            type: String
        },
        pageViews: Number
    },
    {
        timestamps: true,
        toJSON: {
            virtuals: true,
        },
        toObject: {
            virtuals: true,
        },
    }
);

schema.plugin(aggregatePaginate);

const AnalyticSchema = mongoose.model("Analytics", schema);


module.exports = { AnalyticSchema };