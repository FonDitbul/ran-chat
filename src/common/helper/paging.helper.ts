const SHOW_BOARD = 15;
const SHOW_PAGING_NUM = 10;

export const pageToArray = (curPage: number, totalCountBoard: number) => {
  const startPage: number =
    Math.floor(curPage / SHOW_PAGING_NUM) * SHOW_PAGING_NUM;
  const endPage: number =
    Math.ceil(totalCountBoard / SHOW_BOARD) <
    Math.ceil(startPage * SHOW_PAGING_NUM)
      ? Math.ceil(totalCountBoard / SHOW_BOARD)
      : Math.ceil(startPage * SHOW_PAGING_NUM);

  const pageArr: number[] = [];
  for (let i = startPage; i <= endPage; i++) {
    pageArr.push(i);
  }
  // console.log('startpage', startPage);
  // console.log(curPage / SHOW_PAGING_NUM); // 임시 startPage
  // console.log(endPage);
  return pageArr;
};

export const isCurPage = (curPage: number, page: number) => {
  if (curPage === page) return true;
  return false;
};

export const preCurPage = (curPage) => {
  if (curPage <= 1) return 1;
  return curPage - 1;
};

export const nextCurPage = (curPage, totalCountBoard: number) => {
  if (Math.ceil(totalCountBoard / SHOW_BOARD) <= curPage) return curPage;
  return curPage + 1;
};
