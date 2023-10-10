const { HttpError } = require('../helpers/http_error');
const { paginate } = require('../helpers/paginate');
const { AnalyticSchema } = require('../schema/analytics');


const addAnalytics = async (data) => {
    try {
        return await AnalyticSchema.create({
            ...data
        });
    } catch (error) {
        throw new HttpError(HttpError.S.DatabaseError, error.message, "addAnalytics");
    }
}

const getAnalyticList = async (options, query)=> {
    try {
        const aggregate = [
            {
                $project: {
                    path: "$path",
                    pageViews: "$pageViews",
                    createdAt: "$createdAt",
                    updatedAt: "$updatedAt",
                }
            },
            {
                $match: query
            }
        ];
        return await paginate(options, aggregate, AnalyticSchema);
    } catch (error) {
        throw new HttpError(HttpError.S.DatabaseError, error.message, "getAnalyticList");
    }
}

const getAnalyticByPath = async (path) => {
    try {
        return await AnalyticSchema.findOne({ path });
    } catch (error) {
        if (path && error.message?.includes("Cast to ObjectId failed for value")) {
            throw new HttpError(HttpError.S.NotFound, "Data not found", "getAnalyticByPath")
        }
        throw new HttpError(HttpError.S.DatabaseError, error.message, "getAnalyticByPath");
    }
}

const updateAnalyticsByPath = async (path, data) => {
    try {
        return await AnalyticSchema.findOneAndUpdate({ path }, data, { new: true });
    } catch (error) {
        if (path && error.message?.includes("Cast to ObjectId failed for value")) {
            throw new HttpError(HttpError.S.NotFound, "Data not found", "updateAnalytics")
        }
        throw new HttpError(HttpError.S.DatabaseError, error.message, "updateAnalytics");
    }
}

module.exports = {
    addAnalytics,
    getAnalyticList,
    getAnalyticByPath,
    updateAnalyticsByPath
}