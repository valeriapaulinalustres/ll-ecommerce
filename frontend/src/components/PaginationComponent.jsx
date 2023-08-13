import { useContext } from 'react';
import Pagination from 'react-bootstrap/Pagination';
import ProductsContext from '../context/ProductsContext';
import styles from '../styles/Home.module.css';

function PaginationComponent() {
  const { pageCount, setPageCount, page, setPage } =
    useContext(ProductsContext);

  function handlePrev() {
    setPage((p) => {
      if (p === 1) {
        return p;
      }
      return p - 1;
    });
  }

  function handleNext() {
    setPage((p) => {
      if (p === pageCount) {
        return p;
      }
      return p + 1;
    });
  }

  return (
    <Pagination className={styles.paginationContainer}>
      <Pagination.Prev disabled={page === 1} onClick={handlePrev} />
      <Pagination.Item>{page}</Pagination.Item>
      <Pagination.Next
        disabled={page === pageCount}
        onClick={handleNext}
        data-testid='btn-next'
      />
    </Pagination>
  );
}

export default PaginationComponent;
