import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';

interface PaginationButton {
  page: number,
  text?: string,
  isSelected?: boolean,
  children?: any
}

function PaginationButton(props: PaginationButton) {
  const { page, children, isSelected } = props;
  const history = useHistory()
  const location = useLocation()
  const urlParams = new URLSearchParams(location.search)

  return (
    <button style={styles.paginationButton(isSelected || false)} onClick={() => {
      urlParams.set("page", page.toString())
      history.push({
        pathname: "/",
        search: urlParams.toString()
      })
    }}>{children}</button>
  )
}

interface PaginationProps {
  currentPage: number,
  maxPage: number
}

export default function Pagination(props: PaginationProps) {
  let { currentPage, maxPage } = props;

  const increasePage = () => Math.min(currentPage + 1, maxPage);
  const decreasePage = () => Math.max(currentPage - 1, 1);

  return (
    <div>
      {currentPage !== 1 && <PaginationButton page={decreasePage()}>-</PaginationButton>}
      {Array.apply(null, Array(maxPage)).map((_, index) => (
        <PaginationButton key={index} page={index + 1} isSelected={currentPage == index + 1}>{index + 1}</PaginationButton>
      ))}
      {currentPage !== maxPage && <PaginationButton page={increasePage()}>+</PaginationButton>}
    </div >
  );
}

const styles = {
  paginationButton: (isSelected: boolean) => ({
    fontWeight: isSelected ? 1000 : 200,
    width: 30,
    height: 30,
    marginLeft: 2,
    marginRight: 2,
    cursor: 'pointer'
  })
}