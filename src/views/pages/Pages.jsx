import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Pages = () => {
  const [pagesData, setPagesData] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    const getData = () => {
      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${import.meta.env.VITE_API_URL}pages`,
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
              <Table responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Page Name</th>
                    <th>Page Slug</th>
                    <th>Page Type</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {pagesData?.map((data, index) => {
                    return (
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{data.PageName}</td>
                        <td>{data.PageSlug}</td>
                        <td>{data.PageType === 1 ? 'User Page' : 'Website'}</td>
                        <td>
                          <button onClick={() => navigate(`/pages/edit${data.PageSlug}`)} className="btn btn-primary">
                            Edit
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default Pages;
