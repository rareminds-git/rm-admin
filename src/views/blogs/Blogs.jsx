import axios from 'axios';
import Pagination from 'components/Pagination';
import moment from 'moment';
import React, { useEffect, useMemo, useState } from 'react';
import { Row, Col, Card, Table } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

let PageSize = 10;


// const deleteBlogItem = async (contentId) => {
//   try {
//       const response = await fetch(`http://localhost:6069/delete-content/${contentId}`, {
//           method: 'DELETE',
//       });
//       if (!response.ok) {
//           const errorData = await response.json();
//           console.error("Error deleting blog item:", errorData);
//           alert(`Error: ${errorData.message || 'Unknown error'}`);
//           return;
//       }
//       const data = await response.json();
//       console.log("Blog item deleted:", data);
//       alert("Blog deleted successfully!");
//   } catch (error) {
//       console.error("Network error:", error);
//       alert("Failed to delete. Please check the server.");
//   }
// };


const deleteBlogItem = async (contentId) => {

  
  // try {
  //   const response = await fetch(`http://localhost:6069/delete-content/${contentId}`, {
  //       method: 'DELETE',
  //   });

  try {
    const API_URL = import.meta.env.VITE_API_URL; // Load API URL from .env
    const response = await fetch(`${API_URL}delete-content/${contentId}`, {  // Removed the extra slash here
      method: 'DELETE',
    });
  


    if (!response.ok) {
        const errorData = await response.json();
        console.error("Error deleting blog item:", errorData);
        alert(`Error: ${errorData.message || 'Unknown error'}`);
        return;
    }

    alert("✅ Blog deleted successfully!");

    // 🔄 Automatically refresh the page after deletion
    window.location.reload();

} catch (error) {
    console.error("Network error:", error);
    alert("❌ Failed to delete. Please check the server.");
}
};





const Blogs = () => {
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
  const currentPosts = pagesData?.blogData?.slice(indexOfFirstPost, indexOfLastPost);

  useEffect(() => {
    const getData = () => {
      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${import.meta.env.VITE_API_URL}blogs`,
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
              <button className="btn btn-primary float-right" onClick={() => navigate('/blogs/add')}>
                Add New Blog
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
                          {moment(data.CreatedOn).format('DD-MM-YYYY')}
                        </td>
                        <td>
                          <button onClick={() => navigate(`/edit/blog/${data.ContentSlug}`)} className="btn btn-primary">
                            Edit
                          </button>
                        </td>
                        <td>
                        {/* <button onClick={() => deleteGalleryItem(data.ImageURL)} className="btn btn-primary">
                            <FaTrash />
                          </button> */}
                        <button onClick={() => deleteBlogItem(data.ContentId)} className="btn btn-primary">
                            Delete
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

export default Blogs;
