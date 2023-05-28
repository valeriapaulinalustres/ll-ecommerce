import { useEffect, useContext } from "react";
import { base_URL } from "../../utils/mainRoute.js";
import { useNavigate } from "react-router-dom";
import UsersContext from "../../context/UsersContext.js";
import Container from "react-bootstrap/esm/Container.js";
import ProductCard from "../../components/productCard.jsx";
import ProductsContext from "../../context/ProductsContext.js";
import Row from "react-bootstrap/Row";

function Home() {
  const { allProductsFromBack, getProducts } = useContext(ProductsContext);

  const navigate = useNavigate();


  useEffect(() => {
    getProducts();
  }, []);

  return (
    <Container>
      <Row>
        {allProductsFromBack.map((el, index) => {
          return <ProductCard key={index} product={el} />;
        })}
      </Row>
    </Container>
  );
}

export default Home;
