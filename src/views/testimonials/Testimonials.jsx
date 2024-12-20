import axios from 'axios';
import Pagination from 'components/Pagination';
import moment from 'moment';
import React, { useEffect, useMemo, useState } from 'react';
import { Row, Col, Card, Table } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

let PageSize = 10;

const Testimonials = () => {
  const { slug } = useParams();
  const [pagesData, setPagesData] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);

  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const navigate = useNavigate();

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = pagesData?.testimonialData?.slice(indexOfFirstPost, indexOfLastPost);

  useEffect(() => {
    const getData = () => {
      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${import.meta.env.VITE_API_URL}testimonials`,
        headers: {}
      };

      axios
        .request(config)
        .then((response) => {
          setPagesData(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    getData();
  }, []);

  console.log('page data', pagesData);

  return (
    <React.Fragment>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <button className="btn btn-primary float-right" onClick={() => navigate('/testimonials/add')}>
                Add New Testimonial
              </button>
              <Table responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Author</th>
                    <th>Description</th>
                    <th>Category</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentPosts?.map((data, index) => {
                    let category = pagesData?.categories.filter((ele) => ele.ContentId === data.ContentId && ele);
                    return (
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td style={{ wordWrap: 'break-word', minWidth: '260px', maxWidth: '260px', whiteSpace: 'normal' }}>
                          {data.ContentTitle}
                        </td>
                        <td style={{ wordWrap: 'break-word', minWidth: '260px', maxWidth: '260px', whiteSpace: 'normal' }}>
                          {data.ContentDescription}
                        </td>
                        <td style={{ wordWrap: 'break-word', minWidth: '260px', maxWidth: '260px', whiteSpace: 'normal' }}>
                          {category[0]['Heading1']}
                        </td>
                        <td>
                          <button onClick={() => navigate(`/edit/testimonial/${data.ContentDetailId}`)} className="btn btn-primary">
                            Edit
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
              <Pagination
                length={pagesData?.blogData?.length}
                postsPerPage={postsPerPage}
                currentPage={currentPage}
                handlePagination={handlePagination}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default Testimonials;
