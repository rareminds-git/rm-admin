import axios from 'axios';
import Pagination from 'components/Pagination';
import moment from 'moment';
import React, { useEffect, useMemo, useState } from 'react';
import { Row, Col, Card, Table } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

let PageSize = 10;

const Events = () => {
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
  const currentPosts = pagesData?.eventsData?.slice(indexOfFirstPost, indexOfLastPost);

  useEffect(() => {
    const getData = () => {
      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${import.meta.env.VITE_API_URL}events`,
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
              <button className="btn btn-primary float-right" onClick={() => navigate('/events/add')}>
                Add New Event
              </button>
              <Table responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>SubTitle</th>
                    <th>Category</th>
                    <th>Organiser</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentPosts?.map((data, index) => {
                    return (
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td style={{ wordWrap: 'break-word', minWidth: '260px', maxWidth: '260px', whiteSpace: 'normal' }}>
                          {data.Heading1}
                        </td>
                        <td style={{ wordWrap: 'break-word', minWidth: '260px', maxWidth: '260px', whiteSpace: 'normal' }}>
                          {data.Heading2}
                        </td>
                        <td style={{ wordWrap: 'break-word', minWidth: '260px', maxWidth: '260px', whiteSpace: 'normal' }}>
                          {data.SubHeading1}
                        </td>
                        <td style={{ wordWrap: 'break-word', minWidth: '260px', maxWidth: '260px', whiteSpace: 'normal' }}>
                          {data.SubHeading2}
                        </td>
                        <td style={{ wordWrap: 'break-word', minWidth: '260px', maxWidth: '260px', whiteSpace: 'normal' }}>
                          {moment(data.EventDate).format('DD-MM-YYYY')}
                        </td>
                        <td>
                          <button onClick={() => navigate(`/edit/events/${data.ContentId}`)} className="btn btn-primary">
                            Edit
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
              <Pagination
                length={pagesData?.eventsData?.length}
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

export default Events;
