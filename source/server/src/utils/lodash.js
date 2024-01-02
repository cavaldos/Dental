import _ from "lodash";

function groupAndTable(data, groupKeys, tableKeys) {
  const groupedData = _.groupBy(data, (item) => {
    return groupKeys.map((key) => item[key]).join("-");
  });
  const result = _.map(groupedData, (items) => {
    const tableData = {};
    tableKeys.forEach((key) => {
      tableData[key] = _.map(items, key);
    });

    return {
      ...groupKeys.reduce((obj, key) => {
        obj[key] = items[0][key];
        return obj;
      }, {}),
      ...tableData,
      ..._.pick(
        items[0],
        _.difference(Object.keys(items[0]), [...groupKeys, ...tableKeys])
      ),
    };
  });

  return result;
}

export default groupAndTable;