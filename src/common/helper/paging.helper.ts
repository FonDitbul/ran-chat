const SHOW_BOARD = 15; // 게시판 개수 (서버와 동일한 변수)
const SHOW_PAGING_NUM = 10; // PAGING 개수

export const pageToArray = (curPage: number, totalCount: number) => {
  const totalPage = Math.ceil(totalCount / SHOW_BOARD); //총 페이지 개수
  const endPage: number = //페이지 끝 번호
    totalPage < Math.ceil(curPage / SHOW_PAGING_NUM) * SHOW_PAGING_NUM
      ? totalPage
      : Math.ceil(curPage / SHOW_PAGING_NUM) * SHOW_PAGING_NUM;
  let startPage: number = endPage - (SHOW_PAGING_NUM - 1); //페이지 시작 번호
  if (Math.ceil(startPage / SHOW_PAGING_NUM) <= 0) {
    //1일때 예외처리
    startPage = 1;
  }
  const pageArr: number[] = []; //페이지 시작 ~ 끝 배열 반환
  for (let i = startPage; i <= endPage; i++) {
    pageArr.push(i);
  }
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

export const nextCurPage = (curPage, totalCount: number) => {
  if (Math.ceil(totalCount / SHOW_BOARD) <= curPage) return curPage;
  return curPage + 1;
};
