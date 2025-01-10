import axios from 'axios';
import Pagination from 'components/Pagination';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const GeneralEvents = () => {
  const [pagesData, setPagesData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);

  const navigate = useNavigate();

  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    const fetchGeneralEvents = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}generalEvents`);
        const { generalEventData, generalEventDetails } = response.data;

        // Combine generalEventData and generalEventDetails for easier rendering
        const combinedData = generalEventData.map((event, index) => ({
          ...event,
          ...generalEventDetails[index],
        }));

        setPagesData(combinedData);
      } catch (error) {
        console.error('Error fetching general events:', error);
      }
    };

    fetchGeneralEvents();
  }, []);

  // Pagination calculations
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = pagesData.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <React.Fragment>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <button className="btn btn-primary float-right" onClick={() => navigate('/general-events/add')}>
                Add New Event
              </button>
              <Table responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentPosts.map((event, index) => (
                    <tr key={event.ContentId || index}>
                      <th>{indexOfFirstPost + index + 1}</th>
                      <td style={{ wordWrap: 'break-word', minWidth: '260px', maxWidth: '260px', whiteSpace: 'normal' }}>
                        {event.Heading1}
                      </td>
                      <td style={{ wordWrap: 'break-word', minWidth: '260px', maxWidth: '260px', whiteSpace: 'normal' }}>
                        {event.Heading2 || 'No description'}
                      </td>
                      <td style={{ wordWrap: 'break-word', minWidth: '260px', maxWidth: '260px', whiteSpace: 'normal' }}>
                        {moment(event.CreatedOn).format('DD-MM-YYYY')}
                      </td>
                      <td>
                        <button onClick={() => navigate(`/edit/general-events/${event.ContentSlug}`)} className="btn btn-primary">
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                  {currentPosts.length === 0 && (
                    <tr>
                      <td colSpan="5" className="text-center">
                        No events available.
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
              <Pagination
                length={pagesData.length}
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

export default GeneralEvents;
