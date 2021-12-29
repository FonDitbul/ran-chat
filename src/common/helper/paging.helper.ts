// export const paging = (type: string, curPage: number, totalPage: number) => {
//   const SHOW_PAGE = 10;
//   curPage += 1; //pipe 에서 1 빼놧음
//   const endPage: number = parseInt(String(totalPage % SHOW_PAGE)) * 10;
//   const pageArr = [];
//   for (let i = curPage; i < endPage; i++) {
//     pageArr.push(i);
//   }
//   console.log(tagArr.join(''));
//   return tagArr.join('');
// };

// export const isCurPage = (curPage, page) => {
//   console.log(curPage, page);
//   if (curPage === page) return true;
//   return false;
// };
