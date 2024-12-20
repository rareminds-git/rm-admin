import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Form, Button, Table } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Contacts = () => {
  const { slug } = useParams();
  const [pagesData, setPagesData] = useState();

  useEffect(() => {
    const getData = () => {
      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${import.meta.env.VITE_API_URL}queries`,
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
              <Table responsive>
                <thead>
                  <tr>
                    {/* <th>#</th> */}
                    <th>Full Name</th>
                    <th>Company Name</th>
                    <th>Email</th>
                    <th>Job Title</th>
                    <th>Services</th>
                    <th>Referral Source</th>
                    <th>Comment</th>
                    <th>Submitted Date</th>
                  </tr>
                </thead>
                <tbody>
                  {pagesData?.queries?.map((data, index) => {
                    let services = data?.Services.split(',')?.map((ele) => {
                      if (ele.trim() === 'TA') return 'Talent Acquisition';
                      if (ele.trim() === 'TD') return 'Talent Development';
                      if (ele.trim() === 'TM') return 'Talent Management';
                    });

                    return (
                      <tr key={index}>
                        {/* <th scope="row">{index + 1}</th> */}
                        <td style={{ wordWrap: 'break-word', minWidth: '60px', maxWidth: '260px', whiteSpace: 'normal' }}>
                          {data.FullName}
                        </td>
                        <td style={{ wordWrap: 'break-word', minWidth: '60px', maxWidth: '260px', whiteSpace: 'normal' }}>
                          {data.CompanyName}
                        </td>
                        <td style={{ wordWrap: 'break-word', minWidth: '60px', maxWidth: '260px', whiteSpace: 'normal' }}>{data.Email}</td>
                        <td style={{ wordWrap: 'break-word', minWidth: '60px', maxWidth: '260px', whiteSpace: 'normal' }}>
                          {data.Jobtitle}
                        </td>
                        <td style={{ wordWrap: 'break-word', minWidth: '60px', maxWidth: '260px', whiteSpace: 'normal' }}>
                          {services.join(', ')}
                        </td>
                        <td style={{ wordWrap: 'break-word', minWidth: '60px', maxWidth: '260px', whiteSpace: 'normal' }}>
                          {data.ReferralSource}
                        </td>
                        <td style={{ wordWrap: 'break-word', minWidth: '60px', maxWidth: '260px', whiteSpace: 'normal' }}>
                          {data.Comment}
                        </td>
                        <td style={{ wordWrap: 'break-word', minWidth: '60px', maxWidth: '260px', whiteSpace: 'normal' }}>
                          {moment(data.CreatedAt).format('MM/DD/YYYY hh:mm:ss')}
                        </td>
                        <td></td>
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

export default Contacts;
