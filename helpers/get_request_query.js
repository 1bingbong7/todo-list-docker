const getRequestQuery = (q) => {
    const query = Object.fromEntries(Object.entries(q).filter(([key]) => !key.startsWith('_')));
  
    const options = Object.fromEntries(Object.entries(q).filter(([key]) => key.startsWith('_')));
  
    return { query, options };
  };
  
module.exports = {
    getRequestQuery
}
  