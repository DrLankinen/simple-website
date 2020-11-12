import React from 'react';

interface PaginationProps {
  setPage: (page: number) => void,
  currentPage: number,
  maxPage: number
}

export default function Pagination(props: PaginationProps) {
  let { setPage, currentPage, maxPage } = props;

  const increasePage = () => setPage(Math.min(currentPage + 1, maxPage));
  const decreasePage = () => setPage(Math.max(currentPage - 1, 1));

  return (
    <div>
      {currentPage !== 1 && <button style={styles.button} onClick={decreasePage}>-</button>}
      {Array.apply(null, Array(maxPage)).map((_, index) => (
        <button style={Object.assign({}, styles.pageNumber(index + 1 === currentPage), styles.button)} onClick={() => setPage(index + 1)}>{index + 1}</button>
      ))
      }
      {currentPage !== maxPage && <button style={styles.button} onClick={increasePage}>+</button>}
    </div >
  );
}

const styles = {
  button: {
    cursor: 'pointer'
  },
  pageNumber: (isSelected: boolean) => ({
    fontWeight: isSelected ? 1000 : 200,
    width: 30,
    height: 30,
    marginLeft: 2,
    marginRight: 2
  })
}