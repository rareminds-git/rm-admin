import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Table, Tabs, Tab } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const DashDefault = () => {
  const [dashboardData, setDashboardData] = useState();
  const [chartData, setChartData] = useState();

  useEffect(() => {
    const getData = () => {
      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${import.meta.env.VITE_API_URL}dashboard`,
        headers: {}
      };

      axios
        .request(config)
        .then((response) => {
          setDashboardData(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    getData();
  }, []);

  const navigate = useNavigate();

  useEffect(() => {
    const dashSalesData = [
      {
        title: 'Blogs',
        amount: dashboardData?.blogsData.length,
        icon: 'icon-arrow-up text-c-green',
        value: 50,
        class: 'progress-c-theme'
      },
      {
        title: 'Last 7 day Queries',
        amount: dashboardData?.queries.length,
        icon: 'icon-arrow-down text-c-red',
        value: 36,
        class: 'progress-c-theme2'
      },
      {
        title: 'Last 7 day Subscriptions',
        amount: dashboardData?.subscribers.length,
        icon: 'icon-arrow-up text-c-green',
        value: 70,
        color: 'progress-c-theme'
      }
    ];

    setChartData(dashSalesData);
  }, [dashboardData]);

  return (
    <React.Fragment>
      <Row>
        {chartData?.map((data, index) => {
          return (
            <Col key={index} xl={6} xxl={4}>
              <Card>
                <Card.Body>
                  <h6 className="mb-4">{data.title}</h6>
                  <div className="row d-flex align-items-center">
                    <div className="col-9">
                      <h3 className="f-w-300 d-flex align-items-center m-b-0">{data.amount}</h3>
                    </div>
                    {/* <div className="col-3 text-end">
                      <p className="m-b-0">{data.value}%</p>
                    </div> */}
                  </div>
                  <div className="progress m-t-30" style={{ height: '7px' }}>
                    <div
                      className={`progress-bar ${data.class}`}
                      role="progressbar"
                      style={{ width: `${data.amount}%` }}
                      aria-valuenow={data.value}
                      aria-valuemin="0"
                      aria-valuemax="100"
                    />
                  </div>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>

      <Row>
        <Col md={8}>
          <Card>
            <Card.Body>
              <h2> Queries </h2>
              <Table responsive>
                <thead>
                  <tr>
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
                  {dashboardData?.queries?.slice(0, 5).map((data, index) => {
                    let services = data?.Services.split(',')?.map((ele) => {
                      if (ele.trim() === 'TA') return 'Talent Acquisition';
                      if (ele.trim() === 'TD') return 'Talent Development';
                      if (ele.trim() === 'TM') return 'Talent Management';
                    });

                    return (
                      <tr key={index}>
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

        <Col md={4}>
          <Card>
            <Card.Body>
              <h2> Subscibers </h2>
              <Table responsive>
                <thead>
                  <tr>
                    <th>Email</th>

                    <th>Submitted Date</th>
                  </tr>
                </thead>
                <tbody>
                  {dashboardData?.subscribers?.slice(0, 5).map((data, index) => {
                    return (
                      <tr key={index}>
                        <td style={{ wordWrap: 'break-word', minWidth: '60px', maxWidth: '260px', whiteSpace: 'normal' }}>
                          {data.SubscriberEmail}
                        </td>

                        <td style={{ wordWrap: 'break-word', minWidth: '60px', maxWidth: '260px', whiteSpace: 'normal' }}>
                          {moment(data.CreatedOn).format('MM/DD/YYYY hh:mm:ss')}
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

      <Row>
        <Col>
          <Card>
            <Card.Body>
              <h2> Blogs </h2>
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
                  {dashboardData?.blogsData.slice(0, 5).map((data, index) => {
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

export default DashDefault;
