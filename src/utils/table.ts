// 获取当前分页数据
export const dataGrouping = (val: Array<object>, pageSize: number, page: number) => {
  if (val.length < pageSize) return val;
  return val.slice(pageSize * (page - 1), pageSize * (page - 1) + pageSize);
};

export const generateColumns = (length = 10, prefix = 'column-', props?: any) =>
  Array.from({ length }).map((_, columnIndex) => ({
    ...props,
    key: `${prefix}${columnIndex}`,
    dataKey: `${prefix}${columnIndex}`,
    title: `Column ${columnIndex}`,
    width: 150,
  }));

export const generateData = (columns: ReturnType<typeof generateColumns>, length = 200, prefix = 'row-') =>
  Array.from({ length }).map((_, rowIndex) => {
    return columns.reduce(
      (rowData, column, columnIndex) => {
        // rowData[column.dataKey] = `Row ${rowIndex} - Col ${columnIndex}`;
        rowData[column.dataKey] = `${rowIndex}`;
        return rowData;
      },
      {
        id: `${prefix}${rowIndex}`,
        parentId: null,
      }
    );
  });

export const generateDataFn = (columns: number, datas: number) => {
  return generateData(generateColumns(columns), datas);
};
