// utils/filters.js
function buildFilters(query) {
  let filters = {};

  if (query.interfaceName) {
    filters.interfaceName = { $regex: query.interfaceName, $options: "i" };
  }
  if (query.integrationKey) {
    filters.integrationKey = { $regex: query.integrationKey, $options: "i" };
  }
  if (query.status) {
    filters.status = query.status.toUpperCase();
  }
  if (query.startDate && query.endDate) {
    filters.timestamp = {
      $gte: new Date(query.startDate),
      $lte: new Date(query.endDate)
    };
  }
  return filters;
}

module.exports = { buildFilters };
