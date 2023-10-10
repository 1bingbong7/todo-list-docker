const paginate = async (options, aggregate = [], schema) => {
    const opt = {
        page: options._page || 1,
        limit: options._limit || 10
    }
    const myAggregate = schema.aggregate(aggregate);
    const paginatedItems = await myAggregate.paginateExec(opt);
    return paginatedItems?.docs || [];
}

module.exports = {
    paginate
}
    
  

  