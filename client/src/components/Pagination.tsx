import React from 'react';

interface PaginationProps {
  setPage: (page: number) => void,
  currentPage: number,
  maxPage: number
}

export default function Pagination(props: PaginationProps) {
  let { setPage, currentPage, maxPage } = props

  const increasePage = () => setPage(Math.min(currentPage + 1, maxPage))
  const decreasePage = () => setPage(Math.max(currentPage - 1, 1))

  return (
    <div>
      <button onClick={decreasePage}>-</button>
      {Array.apply(null, Array(maxPage)).map((_, index) => (
        <button style={styles.pageNumber(index + 1 === currentPage)} onClick={() => setPage(index + 1)}>{index + 1}</button>
      ))}
      <button onClick={increasePage}>+</button>
    </div>
  )
}

const styles = {
  pageNumber: (isSelected: boolean) => ({
    fontWeight: isSelected ? 1000 : 200
  })
}