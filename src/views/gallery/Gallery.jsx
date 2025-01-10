import axios from 'axios';
import Pagination from 'components/Pagination';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa'; 

let PageSize = 10;

const Gallery = () => {
  const [pagesData, setPagesData] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);

  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const navigate = useNavigate();

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = pagesData?.galleryData?.slice(indexOfFirstPost, indexOfLastPost);
  
  const deleteGalleryItem = (ImageURL) => {
    if (!ImageURL) {
      console.error('No URL found for deletion');
      return;
    }
    // Ask for confirmation before deleting
    if (window.confirm('Are you sure you want to delete this item?')) {
      let config = {
        method: 'delete',
        url: `${import.meta.env.VITE_API_URL}gallery/${encodeURIComponent(ImageURL)}`,
        headers: {}
      };

      axios
        .request(config)
        .then((response) => {
          // Remove the deleted item from the displayed data
          setPagesData(prevState => ({
            ...prevState,
            galleryData: prevState.galleryData.filter(item => item.ImageURL !== ImageURL)
          }));
        })
        .catch((error) => {
          console.log('Deletion failed:', error); // Log the error for debugging
          alert('Failed to delete the gallery item. Please try again.');
        });
    }
  };

  useEffect(() => {
    const getData = () => {
      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${import.meta.env.VITE_API_URL}gallery?page=${currentPage}&limit=${postsPerPage}`,
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

  return (
    <React.Fragment>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <button className="btn btn-primary float-right" onClick={() => navigate('/gallery/add')}>
                Add New Gallery Item
              </button>
              <Table responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Image</th>
                    <th>Date</th>
                    <th>University</th>
                    <th>Event Name</th>
                    <th>Course</th>
                    <th>Sem</th>
                    <th>Year</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentPosts?.map((data, index) => {
                    return (
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>
                          <img src={data.ImageURL} alt={data.EventName} style={{ width: '100px', height: '100px' }} />
                        </td>
                        <td>{moment(data.EventDate).format('DD-MM-YYYY')}</td>
                        <td>{data.University}</td>
                        <td>{data.EventName}</td>
                        <td>{data.Course}</td>
                        <td>{data.Semester}</td>
                        <td>{data.Year}</td>
                        <td>
                        <button onClick={() => deleteGalleryItem(data.ImageURL)} className="btn btn-primary">
                            <FaTrash />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
              <Pagination
                length={pagesData?.galleryData?.length}
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

export default Gallery;
