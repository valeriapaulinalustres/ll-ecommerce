import { useEffect, useContext, useState } from "react";
import Container from "react-bootstrap/esm/Container.js";
import ProductCard from "../../components/productCard.jsx";
import ProductsContext from "../../context/ProductsContext.js";
import PaginationComponent from "../../components/PaginationComponent.jsx";
import styles from "../../styles/Home.module.css";

function Home() {

  const { allProductsFromBack, getProducts, pageCount, setPageCount, page, setPage } = useContext(ProductsContext);

  useEffect(() => {
    getProducts(page);
  }, [page]);

  return (
    <Container className={styles.container}>
      <div className={styles.cardContainer}>
        {allProductsFromBack.map((el, index) => {
          return <ProductCard key={index} product={el} />;
        })}
      </div>
      <PaginationComponent />
    </Container>
  );
}

export default Home;
