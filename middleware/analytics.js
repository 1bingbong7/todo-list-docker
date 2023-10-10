const { getAnalyticByPath, updateAnalyticsByPath, addAnalytics } = require("../model/analytics");

const analytics = async (req, res, next) => {
  try {
    const path = req.baseUrl;
    const analytics = await getAnalyticByPath(path);
    if (analytics) {
        await updateAnalyticsByPath(path, {
            pageViews: analytics.pageViews + 1
        })
    } else {
        await addAnalytics({
            path,
            pageViews: 1
        })
    }
  } catch (error) {
    console.log("🚀 ~ file: analytics.js:7 ~ analytics ~ error:", error)
  }
  // still pass through if error   
  next();
};

module.exports = analytics;
