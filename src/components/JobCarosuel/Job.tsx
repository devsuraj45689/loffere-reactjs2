import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ReusableCarousel from './JobCarosuel';
import 'bootstrap/dist/css/bootstrap.min.css';

function Job(props: any) {
  const dummyData = [
    [
      {
        id: 1,
        title: 'Traveling household appliance techincian',
        location: 'Taza-Al Hoceima-Taounate, India',
        salary: 1000,
        days: '2 days ago',
        post: 'New',
        companyName: 'HCL',
        companyImage:
          'https://seekvectors.com/files/download/69d3d316b03ef1e8df1ddacd1e9c3d7e.jpg',
      },
      {
        id: 2,
        title: 'Traveling household appliance techincian',
        location: 'Taza-Al Hoceima-Taounate, India',
        salary: 1000,
        days: '2 days ago',
        post: 'New',
        companyName: 'HCL',
        companyImage:
          'https://seekvectors.com/files/download/69d3d316b03ef1e8df1ddacd1e9c3d7e.jpg',
      },
      {
        id: 3,
        title: 'Traveling household appliance techincian',
        location: 'Taza-Al Hoceima-Taounate, India',
        salary: 1000,
        days: '2 days ago',
        post: 'New',
        companyName: 'HCL',
        companyImage:
          'https://seekvectors.com/files/download/69d3d316b03ef1e8df1ddacd1e9c3d7e.jpg',
      },
      {
        id: 4,
        title: 'Traveling household appliance techincian',
        location: 'Taza-Al Hoceima-Taounate, India',
        salary: 1000,
        days: '2 days ago',
        post: 'New',
        companyName: 'HCL',
        companyImage:
          'https://seekvectors.com/files/download/69d3d316b03ef1e8df1ddacd1e9c3d7e.jpg',
      },
      {
        id: 5,
        title: 'Traveling household appliance techincian',
        location: 'Taza-Al Hoceima-Taounate, India',
        salary: 1000,
        days: '2 days ago',
        post: 'New',
        companyName: 'HCL',
        companyImage:
          'https://seekvectors.com/files/download/69d3d316b03ef1e8df1ddacd1e9c3d7e.jpg',
      },
    ],
  ];

  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 3500 }, items: 6 },
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 4 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
  };

  return (
    <>
      {props.jobCarosuel.map((carousel: any, index: any) => (
        <Container className="mt-4" key={carousel}>
          <Row className="mb-4">
            <Col className="d-flex justify-content-between align-items-center">
              <h2 className="h4 fw-bold">{carousel}</h2>
              <a
                href="#"
                className="text-decoration-none"
                style={{ color: '#26C6DA' }}
              >
                View All →
              </a>
            </Col>
          </Row>
          <ReusableCarousel
            items={dummyData[index]}
            responsive={responsive}
            accentColor="#26C6DA"
          />
        </Container>
      ))}
    </>
  );
}

export default Job;
