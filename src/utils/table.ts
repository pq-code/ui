// 获取当前分页数据
export const dataGrouping = (val: Array<object>, pageSize: number, page: number) => {
  if (val.length < pageSize) return val;
  return val.slice(pageSize * (page - 1), pageSize * (page - 1) + pageSize);
};

// 懒加载数据处理
export const handlerLazyLoad = (entries, observer) => {
  return (entries, observer) => {};
};

export const lazyLoading = (root, target) => {
  //   let options = {
  //     root: root, // 根元素
  //     rootMargin: '0px', //传值形式类似于css的margin 传一个值则四个边都为0
  //     threshold: 0, //触发条件 表示目标元素刚进入根元素时触发
  //   };
  const intersectionObserver = new IntersectionObserver(handlerLazyLoad, root);
  intersectionObserver.observe(target);
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

export const generateDataFn = (columns, datas) => {
  return generateData(generateColumns(columns), datas);
};
