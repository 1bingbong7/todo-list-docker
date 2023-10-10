const mongoose = require("mongoose");
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");
const schema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            trim: true,
        },
        isCompleted: {
            type: Boolean,
            default: false,
        },
        dueDate: Date,
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

const TodoSchema = mongoose.model("Todo", schema);


module.exports = { TodoSchema };