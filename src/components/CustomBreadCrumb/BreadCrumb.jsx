import Breadcrumb from 'react-bootstrap/Breadcrumb';
import 'bootstrap/dist/css/bootstrap.min.css';

function BreadcrumbExample() {
  return (
    <Breadcrumb>
      <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
      <Breadcrumb.Item href="http://localhost:3080/">
        All Categories
      </Breadcrumb.Item>
      <Breadcrumb.Item active>Furniture Products</Breadcrumb.Item>
    </Breadcrumb>
  );
}

export default BreadcrumbExample;
