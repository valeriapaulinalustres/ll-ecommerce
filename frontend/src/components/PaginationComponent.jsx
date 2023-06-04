import Pagination from 'react-bootstrap/Pagination';

function PaginationComponent() {
  return (
<Pagination>
  <Pagination.Prev />
   <Pagination.Item>{1}</Pagination.Item>
 <Pagination.Next />
</Pagination>
  )
}

export default PaginationComponent