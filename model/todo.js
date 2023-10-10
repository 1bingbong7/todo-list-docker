const { HttpError } = require('../helpers/http_error');
const { paginate } = require('../helpers/paginate');
const { TodoSchema } = require('../schema/todo');


const addTodo = async (data) => {
    try {
        return await TodoSchema.create({
            ...data
        });
    } catch (error) {
        throw new HttpError(HttpError.S.DatabaseError, error.message, "addTodo");
    }
}

const getTodoList = async (options, query)=> {
    try {
        const aggregate = [
            {
                $project: {
                    title: "$title",
                    description: "$description",
                    isCompleted: "$isCompleted",
                    dueDate: "$dueDate",
                    createdAt: "$createdAt",
                    updatedAt: "$updatedAt",
                }
            },
            {
                $match: query
            }
        ];
        return await paginate(options, aggregate, TodoSchema);
    } catch (error) {
        throw new HttpError(HttpError.S.DatabaseError, error.message, "getTodoList");
    }
}

const getTodo = async (id) => {
    try {
        return await TodoSchema.findById(id);
    } catch (error) {
        if (id && error.message?.includes("Cast to ObjectId failed for value")) {
            throw new HttpError(HttpError.S.NotFound, "Data not found", "getTodo")
        }
        throw new HttpError(HttpError.S.DatabaseError, error.message, "getTodo");
    }
}

const updateTodo = async (id, data) => {
    try {
        return await TodoSchema.findByIdAndUpdate(id, data, { new: true });
    } catch (error) {
        if (id && error.message?.includes("Cast to ObjectId failed for value")) {
            throw new HttpError(HttpError.S.NotFound, "Data not found", "updateTodo")
        }
        throw new HttpError(HttpError.S.DatabaseError, error.message, "updateTodo");
    }
}

const deleteTodo = async (id) => {
    try {
        return await TodoSchema.findByIdAndDelete(id);
    } catch (error) {
        throw new HttpError(HttpError.S.DatabaseError, error.message, "deleteTodo");
    }
}

module.exports = {
    addTodo,
    getTodoList,
    getTodo,
    updateTodo,
    deleteTodo,
}