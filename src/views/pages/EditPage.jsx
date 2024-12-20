import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import TextEditor from '../../components/TextEditor';
import { convertToSlug, decodeHTMLEntities, getEditPageData } from 'utils/helpers';
import SuccessBanner from 'components/SuccessBanner';

const EditPage = () => {
  const { slug } = useParams();
  const [pageData, setPageData] = useState();
  const [aboutPageData, setAboutPageData] = useState();
  const [formData, setFormData] = useState({
    hero: {},
    whyus: {},
    services: {},
    successstories: {},
    achievements: {},
    metadata: {},
    contactus: {},
    privacy: {},
    't&c': {},
    about: {},
    careers: {}
  });
  const [btnDisabled, setBtnDisabled] = useState({
    hero: true,
    whyus: true,
    services: true,
    successstories: true,
    achievements: true,
    metadata: true,
    careers: true
  });
  const [showSuccessBanner, setSuccessBanner] = useState({});

  useEffect(() => {
    const getData = () => {
      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${import.meta.env.VITE_API_URL}pages/${slug}`,
        headers: {}
      };

      axios
        .request(config)
        .then((response) => {
          console.log('edit data', getEditPageData(response.data));
          setPageData(getEditPageData(response.data));
          if (slug === 'about-us') {
            let aboutData = response.data;
            let partnersData = aboutData?.sectionData?.filter((ele) => ele.Heading1 === 'Partners' && ele);
            let valuesData = aboutData?.sectionData?.filter((ele) => ele.Heading1 === 'Core Values' && ele);
            let awardsData = aboutData?.sectionData?.filter((ele) => ele.Heading1 === 'Awards' && ele);
            let MissionData = aboutData?.sectionData?.filter((ele) => ele.Heading1 === 'Mission' && ele);
            let VisionData = aboutData?.sectionData?.filter((ele) => ele.Heading1 === 'Vision' && ele);
            let StoryData = aboutData?.sectionData?.filter((ele) => ele.Heading1 === 'Our Story' && ele);

            setAboutPageData({
              partnersData,
              valuesData,
              awardsData,
              MissionData,
              VisionData,
              StoryData
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };

    getData();
  }, []);

  const submitEditData = (contentSlug, id) => {
    let data = formData[contentSlug];
    if (slug !== 'contact-us') {
      data.ContentSlug = '/' + contentSlug;
    }

    if (contentSlug === 'metadata') {
      data.ContentSlug = '/metadata';
    }

    if (contentSlug === 'about') {
      data.ContentId = id;
    }

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${import.meta.env.VITE_API_URL}editPage/${slug}`,
      headers: {
        'Content-Type': 'application/json'
      },
      data: JSON.stringify(data)
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        setSuccessBanner({ [contentSlug === 'about' ? id : contentSlug]: true });
        setTimeout(() => {
          setSuccessBanner({ [contentSlug === 'about' ? id : contentSlug]: false });
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  console.log('disabled btn', pageData);

  return (
    <React.Fragment>
      <Row>
        {pageData?.pageData?.PageType === 1 && (
          <Col sm={6}>
            <Card>
              <Card.Header>
                {showSuccessBanner['hero'] && <SuccessBanner />}
                <Card.Title as="h5">Hero</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Row>
                    <Col md={12}>
                      <Form.Group className="mb-3">
                        <Form.Label>Main Heading</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows="3"
                          onChange={(e) => {
                            setFormData((prevState) => ({ ...prevState, hero: { ...prevState.hero, Heading1: e.target.value } }));
                            setBtnDisabled({ ...btnDisabled, [pageData?.hero?.ContentSlug]: false });
                          }}
                          defaultValue={pageData?.hero.Heading1}
                          placeholder="Enter main heading"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={12}>
                      <Form.Group className="mb-3">
                        <Form.Label>Enter Quote</Form.Label>
                        <Form.Control
                          as="textarea"
                          onChange={(e) => {
                            setFormData((prevState) => ({ ...prevState, hero: { ...prevState.hero, Heading2: e.target.value } }));
                            setBtnDisabled({ ...btnDisabled, [pageData?.hero?.ContentSlug]: false });
                          }}
                          rows="3"
                          defaultValue={pageData?.hero.Heading2}
                          placeholder="Enter quote"
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <Form.Control
                        size="md"
                        type="text"
                        defaultValue={pageData?.hero.SubHeading1}
                        onChange={(e) => {
                          setFormData((prevState) => ({ ...prevState, hero: { ...prevState.hero, SubHeading1: e.target.value } }));

                          setBtnDisabled({ ...btnDisabled, [pageData?.hero?.ContentSlug]: false });
                        }}
                        placeholder="Enter Quote (Author Name)"
                        className="mb-3"
                      />
                    </Col>
                    <Col md={6}>
                      <Form.Control
                        type="text"
                        defaultValue={pageData?.hero.SubHeading2}
                        onChange={(e) => {
                          setFormData((prevState) => ({ ...prevState, hero: { ...prevState.hero, SubHeading2: e.target.value } }));

                          setBtnDisabled({ ...btnDisabled, [pageData?.hero?.ContentSlug]: false });
                        }}
                        placeholder="Enter Quote (Author Designation)"
                        className="mb-3"
                      />
                    </Col>
                  </Row>

                  <Button
                    variant="primary"
                    onClick={() => submitEditData('hero')}
                    disabled={btnDisabled[pageData?.hero?.ContentSlug]}
                    className="float-right"
                  >
                    Submit
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        )}

        {pageData?.pageData?.PageType === 1 && (
          <Col sm={6}>
            <Card>
              <Card.Header>
                {showSuccessBanner['whyus'] && <SuccessBanner />}
                <Card.Title as="h5">Why Us</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Row>
                    <Col md={12}>
                      <Form.Group className="mb-3">
                        <Form.Label>Enter Description</Form.Label>
                        <TextEditor
                          defaultValue={decodeHTMLEntities(pageData?.whyus?.Description)}
                          contentSlug="whyus"
                          pageData={pageData}
                          setBtnDisabled={setBtnDisabled}
                          setFormData={setFormData}
                          btnDisabled={btnDisabled}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Button variant="primary" onClick={() => submitEditData('whyus')} disabled={btnDisabled['whyus']} className="float-right">
                    Submit
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        )}

        {pageData?.pageData?.PageType === 1 && (
          <Col sm={6}>
            <Card>
              <Card.Header>
                {showSuccessBanner['services'] && <SuccessBanner />}
                <Card.Title as="h5">Our Services</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Row>
                    <Col md={12}>
                      <Form.Group className="mb-3">
                        <Form.Label>Enter Description</Form.Label>
                        <TextEditor
                          defaultValue={pageData?.services?.Description}
                          contentSlug="services"
                          pageData={pageData}
                          setBtnDisabled={setBtnDisabled}
                          setFormData={setFormData}
                          btnDisabled={btnDisabled}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Button
                    variant="primary"
                    onClick={() => submitEditData('services')}
                    disabled={btnDisabled['services']}
                    className="float-right"
                  >
                    Submit
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        )}
        {pageData?.pageData?.PageType === 1 && (
          <Col sm={6}>
            <Card>
              <Card.Header>
                {showSuccessBanner['successstories'] && <SuccessBanner />}
                <Card.Title as="h5">Success Stories</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Row>
                    <Col md={12}>
                      <Form.Group className="mb-3">
                        <Form.Label>Enter Description</Form.Label>
                        <TextEditor
                          defaultValue={pageData?.successstories?.Description}
                          contentSlug="successstories"
                          pageData={pageData}
                          setBtnDisabled={setBtnDisabled}
                          setFormData={setFormData}
                          btnDisabled={btnDisabled}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Button
                    variant="primary"
                    onClick={() => submitEditData('successstories')}
                    disabled={btnDisabled[pageData?.successstories?.ContentSlug]}
                    className="float-right"
                  >
                    Submit
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        )}

        {pageData?.pageData?.PageType === 1 && (
          <Col sm={6}>
            <Card>
              <Card.Header>
                {showSuccessBanner['achievements'] && <SuccessBanner />}
                <Card.Title as="h5">Achievements</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Row>
                    <Col md={12}>
                      <Form.Group className="mb-3">
                        <Form.Label>Enter Heading</Form.Label>
                        <Form.Control
                          placeholder="Enter heading"
                          onChange={(e) => {
                            setFormData((prevState) => ({
                              ...prevState,
                              achievements: { ...prevState.achievements, Heading1: e.target.value }
                            }));
                            setBtnDisabled({ ...btnDisabled, [pageData?.achievements?.ContentSlug]: false });
                          }}
                          defaultValue={pageData?.achievements?.Heading1}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={12}>
                      <Form.Group className="mb-3">
                        <Form.Label>Enter Description</Form.Label>
                        <TextEditor
                          defaultValue={pageData?.achievements?.Description}
                          contentSlug="achievements"
                          pageData={pageData}
                          setBtnDisabled={setBtnDisabled}
                          setFormData={setFormData}
                          btnDisabled={btnDisabled}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Button
                    variant="primary"
                    onClick={() => submitEditData('achievements')}
                    disabled={btnDisabled[pageData?.achievements?.ContentSlug]}
                    className="float-right"
                  >
                    Submit
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        )}

        {pageData?.pageData?.PageType === 3 && (
          <Col sm={12}>
            <Card>
              <Card.Header>
                {showSuccessBanner['careers'] && <SuccessBanner />}
                <Card.Title as="h5">Careers</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Row>
                    <Col md={12}>
                      <Form.Group className="mb-3">
                        <Form.Label>Enter Heading</Form.Label>
                        <Form.Control
                          placeholder="Enter heading"
                          onChange={(e) => {
                            setFormData((prevState) => ({
                              ...prevState,
                              careers: { ...prevState.careers, Heading1: e.target.value }
                            }));
                            setBtnDisabled({ ...btnDisabled, [careers]: false });
                          }}
                          defaultValue={pageData?.sectionData[0]?.Heading1}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={12}>
                      <Form.Group className="mb-3">
                        <Form.Label>Enter Description</Form.Label>
                        <TextEditor
                          defaultValue={pageData?.sectionData[0]?.Description}
                          contentSlug="careers"
                          pageData={pageData}
                          setBtnDisabled={setBtnDisabled}
                          setFormData={setFormData}
                          btnDisabled={btnDisabled}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Button
                    variant="primary"
                    onClick={() => submitEditData('careers')}
                    disabled={btnDisabled['careers']}
                    className="float-right"
                  >
                    Submit
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        )}

        {pageData?.pageData?.PageSlug === '/contact-us' &&
          pageData?.sectionData?.map((secData, index) => {
            return (
              <Col sm={6} key={index}>
                <Card>
                  <Card.Header>
                    {showSuccessBanner['contactus'] && <SuccessBanner />}
                    <Card.Title as="h5">{secData.Heading1}</Card.Title>
                  </Card.Header>
                  <Card.Body>
                    <Form>
                      <Row>
                        <Col md={12}>
                          <Form.Group className="mb-3">
                            <Form.Label>Enter Heading</Form.Label>
                            <Form.Control
                              placeholder="Enter heading"
                              onChange={(e) => {
                                setFormData((prevState) => ({
                                  ...prevState,
                                  contactus: {
                                    ...prevState.contactus,
                                    Heading1: e.target.value,
                                    ContentId: secData.ContentId,
                                    ContentSlug: convertToSlug(e.target.value)
                                  }
                                }));
                              }}
                              defaultValue={secData?.Heading1}
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={12}>
                          <Form.Group className="mb-3">
                            <Form.Label>Enter Description</Form.Label>
                            <Form.Control
                              placeholder="Enter description"
                              as="textarea"
                              rows="5"
                              onChange={(e) => {
                                setFormData((prevState) => ({
                                  ...prevState,
                                  contactus: { ...prevState.contactus, Heading2: e.target.value, ContentId: secData.ContentId }
                                }));
                              }}
                              defaultValue={secData?.Heading2}
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        {index === 0 && (
                          <Col md={12}>
                            <Form.Group className="mb-3">
                              <Form.Label>Enter {secData?.SubHeading1}</Form.Label>
                              <Form.Control
                                placeholder={`Enter ${secData.SubHeading1}`}
                                as="textarea"
                                rows="2"
                                onChange={(e) => {
                                  setFormData((prevState) => ({
                                    ...prevState,
                                    contactus: { ...prevState.contactus, Address1: e.target.value, ContentId: secData.ContentId }
                                  }));
                                }}
                                defaultValue={secData?.Address1}
                              />
                            </Form.Group>
                          </Col>
                        )}
                        {index === 1 && (
                          <>
                            <Col md={6}>
                              <Form.Group className="mb-3">
                                <Form.Label>Enter Contact(For University / Colleges)</Form.Label>
                                <Form.Control
                                  placeholder={`Enter Contact (For University / Colleges)`}
                                  as="textarea"
                                  rows="2"
                                  onChange={(e) => {
                                    setFormData((prevState) => ({
                                      ...prevState,
                                      contactus: { ...prevState.contactus, Contact1: e.target.value, ContentId: secData.ContentId }
                                    }));
                                  }}
                                  defaultValue={secData?.Contact1}
                                />
                              </Form.Group>
                            </Col>
                            <Col md={6}>
                              <Form.Group className="mb-3">
                                <Form.Label>Enter Contact</Form.Label>
                                <Form.Control
                                  placeholder={`Enter Contact`}
                                  as="textarea"
                                  rows="2"
                                  onChange={(e) => {
                                    setFormData((prevState) => ({
                                      ...prevState,
                                      contactus: { ...prevState.contactus, Contact2: e.target.value, ContentId: secData.ContentId }
                                    }));
                                  }}
                                  defaultValue={secData?.Contact2}
                                />
                              </Form.Group>
                            </Col>
                          </>
                        )}
                      </Row>

                      <Row>
                        {index === 0 && (
                          <Col md={12}>
                            <Form.Group className="mb-3">
                              <Form.Label>Enter {secData?.SubHeading2}</Form.Label>
                              <Form.Control
                                placeholder={`Enter ${secData.SubHeading2}`}
                                as="textarea"
                                rows="2"
                                onChange={(e) => {
                                  setFormData((prevState) => ({
                                    ...prevState,
                                    contactus: { ...prevState.contactus, Address2: e.target.value, ContentId: secData.ContentId }
                                  }));
                                }}
                                defaultValue={secData?.Address2}
                              />
                            </Form.Group>
                          </Col>
                        )}
                        {index === 1 && (
                          <Col md={12}>
                            <Form.Group className="mb-3">
                              <Form.Label>Enter {secData?.SubHeading2}</Form.Label>
                              <Form.Control
                                placeholder={`Enter ${secData.SubHeading2}`}
                                as="textarea"
                                rows="2"
                                onChange={(e) => {
                                  setFormData((prevState) => ({
                                    ...prevState,
                                    contactus: { ...prevState.contactus, EmailAddress: e.target.value, ContentId: secData.ContentId }
                                  }));
                                }}
                                defaultValue={secData?.EmailAddress}
                              />
                            </Form.Group>
                          </Col>
                        )}
                      </Row>

                      <Button
                        variant="primary"
                        onClick={() => submitEditData('contactus')}
                        // disabled={btnDisabled[formData?.contactus?.Heading1]}
                        className="float-right"
                      >
                        Submit
                      </Button>
                    </Form>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}

        {pageData?.pageData?.PageSlug === '/about-us'
          ? aboutPageData?.StoryData?.map((ele) => {
              return (
                <Col sm={12} key={ele.ContentId}>
                  <Card>
                    <Card.Header>
                      {showSuccessBanner[ele.ContentId] && <SuccessBanner />}
                      <Card.Title as="h5">About Us</Card.Title>
                    </Card.Header>
                    <Card.Body>
                      <Form>
                        <Row>
                          <Col md={12}>
                            <Form.Group className="mb-3">
                              <Form.Label>Enter Heading</Form.Label>
                              <Form.Control
                                placeholder="Enter heading"
                                onChange={(e) => {
                                  setFormData((prevState) => ({
                                    ...prevState,
                                    about: { ...prevState.about, Heading2: e.target.value }
                                  }));
                                  setBtnDisabled({ ...btnDisabled, privacy: false });
                                }}
                                defaultValue={ele?.Heading2}
                              />
                            </Form.Group>
                          </Col>
                        </Row>
                        <Row>
                          <Col md={12}>
                            <Form.Group className="mb-3">
                              <Form.Label>Enter Description</Form.Label>
                              <TextEditor
                                defaultValue={ele.Description}
                                contentSlug="about"
                                pageData={pageData}
                                setBtnDisabled={setBtnDisabled}
                                setFormData={setFormData}
                                btnDisabled={btnDisabled}
                              />
                            </Form.Group>
                          </Col>
                        </Row>

                        <Button
                          variant="primary"
                          onClick={() => {
                            setFormData((prevState) => ({
                              ...prevState,
                              about: { ...prevState.about, ContentId: ele.ContentId }
                            }));
                            submitEditData('about', ele.ContentId);
                          }}
                          disabled={btnDisabled['about']}
                          className="float-right"
                        >
                          Submit
                        </Button>
                      </Form>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })
          : ''}

        {pageData?.pageData?.PageSlug === '/about-us'
          ? aboutPageData?.valuesData?.map((ele) => {
              return (
                <Col sm={4} key={ele.ContentId}>
                  <Card>
                    <Card.Header>
                      {showSuccessBanner[ele.ContentId] && <SuccessBanner />}
                      <Card.Title as="h5">Core Values</Card.Title>
                    </Card.Header>
                    <Card.Body>
                      <Form>
                        <Row>
                          <Col md={12}>
                            <Form.Group className="mb-3">
                              <Form.Label>Enter Heading</Form.Label>
                              <Form.Control
                                placeholder="Enter heading"
                                onChange={(e) => {
                                  setFormData((prevState) => ({
                                    ...prevState,
                                    about: { ...prevState.about, Heading2: e.target.value }
                                  }));
                                  setBtnDisabled({ ...btnDisabled, privacy: false });
                                }}
                                defaultValue={ele?.Heading2}
                              />
                            </Form.Group>
                          </Col>
                        </Row>
                        <Row>
                          <Col md={12}>
                            <Form.Group className="mb-3">
                              <Form.Label>Enter Description</Form.Label>
                              <TextEditor
                                defaultValue={ele.Description}
                                contentSlug="about"
                                pageData={pageData}
                                setBtnDisabled={setBtnDisabled}
                                setFormData={setFormData}
                                btnDisabled={btnDisabled}
                              />
                            </Form.Group>
                          </Col>
                        </Row>

                        <Button
                          variant="primary"
                          onClick={() => {
                            setFormData((prevState) => ({
                              ...prevState,
                              about: { ...prevState.about, ContentId: ele.ContentId }
                            }));
                            submitEditData('about', ele.ContentId);
                          }}
                          disabled={btnDisabled['values']}
                          className="float-right"
                        >
                          Submit
                        </Button>
                      </Form>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })
          : ''}

        {pageData?.pageData?.PageSlug === '/about-us'
          ? aboutPageData?.VisionData?.map((ele) => {
              return (
                <Col sm={6} key={ele.ContentId}>
                  <Card>
                    <Card.Header>
                      {showSuccessBanner[ele.ContentId] && <SuccessBanner />}
                      <Card.Title as="h5">Vision</Card.Title>
                    </Card.Header>
                    <Card.Body>
                      <Form>
                        <Row>
                          <Col md={12}>
                            <Form.Group className="mb-3">
                              <Form.Label>Enter Heading</Form.Label>
                              <Form.Control
                                placeholder="Enter heading"
                                onChange={(e) => {
                                  setFormData((prevState) => ({
                                    ...prevState,
                                    about: { ...prevState.about, Heading2: e.target.value }
                                  }));
                                  setBtnDisabled({ ...btnDisabled, privacy: false });
                                }}
                                defaultValue={ele?.Heading2}
                              />
                            </Form.Group>
                          </Col>
                        </Row>
                        <Row>
                          <Col md={12}>
                            <Form.Group className="mb-3">
                              <Form.Label>Enter Description</Form.Label>
                              <TextEditor
                                defaultValue={ele.Description}
                                contentSlug="about"
                                pageData={pageData}
                                setBtnDisabled={setBtnDisabled}
                                setFormData={setFormData}
                                btnDisabled={btnDisabled}
                              />
                            </Form.Group>
                          </Col>
                        </Row>

                        <Button
                          variant="primary"
                          onClick={() => {
                            setFormData((prevState) => ({
                              ...prevState,
                              about: { ...prevState.about, ContentId: ele.ContentId }
                            }));
                            submitEditData('about', ele.ContentId);
                          }}
                          disabled={btnDisabled['vision']}
                          className="float-right"
                        >
                          Submit
                        </Button>
                      </Form>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })
          : ''}

        {pageData?.pageData?.PageSlug === '/about-us'
          ? aboutPageData?.MissionData?.map((ele) => {
              return (
                <Col sm={6} key={ele.ContentId}>
                  <Card>
                    <Card.Header>
                      {showSuccessBanner[ele.ContentId] && <SuccessBanner />}
                      <Card.Title as="h5">Mission</Card.Title>
                    </Card.Header>
                    <Card.Body>
                      <Form>
                        <Row>
                          <Col md={12}>
                            <Form.Group className="mb-3">
                              <Form.Label>Enter Heading</Form.Label>
                              <Form.Control
                                placeholder="Enter heading"
                                onChange={(e) => {
                                  setFormData((prevState) => ({
                                    ...prevState,
                                    about: { ...prevState.about, Heading2: e.target.value }
                                  }));
                                  setBtnDisabled({ ...btnDisabled, privacy: false });
                                }}
                                defaultValue={ele?.Heading2}
                              />
                            </Form.Group>
                          </Col>
                        </Row>
                        <Row>
                          <Col md={12}>
                            <Form.Group className="mb-3">
                              <Form.Label>Enter Description</Form.Label>
                              <TextEditor
                                defaultValue={ele.Description}
                                contentSlug="about"
                                pageData={pageData}
                                setBtnDisabled={setBtnDisabled}
                                setFormData={setFormData}
                                btnDisabled={btnDisabled}
                              />
                            </Form.Group>
                          </Col>
                        </Row>

                        <Button
                          variant="primary"
                          onClick={() => {
                            setFormData((prevState) => ({
                              ...prevState,
                              about: { ...prevState.about, ContentId: ele.ContentId }
                            }));
                            submitEditData('about', ele.ContentId);
                          }}
                          disabled={btnDisabled['mission']}
                          className="float-right"
                        >
                          Submit
                        </Button>
                      </Form>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })
          : ''}

        {pageData?.pageData?.PageSlug === '/about-us'
          ? aboutPageData?.awardsData?.map((ele) => {
              return (
                <Col key={ele.ContentId}>
                  <Card>
                    <Card.Header>
                      {showSuccessBanner[ele.ContentId] && <SuccessBanner />}
                      <Card.Title as="h5">Awards</Card.Title>
                    </Card.Header>
                    <Card.Body>
                      <Form>
                        <Row>
                          <Col md={12}>
                            <Form.Group className="mb-3">
                              <Form.Label>Enter Heading</Form.Label>
                              <Form.Control
                                placeholder="Enter heading"
                                onChange={(e) => {
                                  setFormData((prevState) => ({
                                    ...prevState,
                                    about: { ...prevState.about, Heading2: e.target.value }
                                  }));
                                  setBtnDisabled({ ...btnDisabled, privacy: false });
                                }}
                                defaultValue={ele?.Heading2}
                              />
                            </Form.Group>
                          </Col>
                        </Row>
                        <Row>
                          <Col md={12}>
                            <Form.Group className="mb-3">
                              <Form.Label>Enter Description</Form.Label>
                              <TextEditor
                                defaultValue={ele.Description}
                                contentSlug="about"
                                pageData={pageData}
                                setBtnDisabled={setBtnDisabled}
                                setFormData={setFormData}
                                btnDisabled={btnDisabled}
                              />
                            </Form.Group>
                          </Col>
                        </Row>

                        <Button
                          variant="primary"
                          onClick={() => {
                            setFormData((prevState) => ({
                              ...prevState,
                              about: { ...prevState.about, ContentId: ele.ContentId }
                            }));
                            submitEditData('about', ele.ContentId);
                          }}
                          disabled={btnDisabled['awards']}
                          className="float-right"
                        >
                          Submit
                        </Button>
                      </Form>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })
          : ''}

        {pageData?.pageData?.PageSlug === '/privacy-policy' && (
          <Col sm={12}>
            <Card>
              <Card.Header>
                {showSuccessBanner['privacy'] && <SuccessBanner />}
                <Card.Title as="h5">Privacy Policy</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Row>
                    <Col md={12}>
                      <Form.Group className="mb-3">
                        <Form.Label>Enter Heading</Form.Label>
                        <Form.Control
                          placeholder="Enter heading"
                          onChange={(e) => {
                            setFormData((prevState) => ({
                              ...prevState,
                              privacy: { ...prevState.privacy, Heading1: e.target.value }
                            }));
                            setBtnDisabled({ ...btnDisabled, privacy: false });
                          }}
                          defaultValue={pageData?.sectionData[0]?.Heading1}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={12}>
                      <Form.Group className="mb-3">
                        <Form.Label>Enter Description</Form.Label>
                        <TextEditor
                          defaultValue={pageData?.sectionData[0]?.Description}
                          contentSlug="privacy"
                          pageData={pageData}
                          setBtnDisabled={setBtnDisabled}
                          setFormData={setFormData}
                          btnDisabled={btnDisabled}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Button
                    variant="primary"
                    onClick={() => submitEditData('privacy')}
                    // disabled={btnDisabled[pageData?.achievements?.ContentSlug]}
                    className="float-right"
                  >
                    Submit
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        )}

        {pageData?.pageData?.PageSlug === '/terms-&-conditions' && (
          <Col sm={12}>
            <Card>
              <Card.Header>
                {showSuccessBanner['t&c'] && <SuccessBanner />}
                <Card.Title as="h5">Terms & Conditions</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Row>
                    <Col md={12}>
                      <Form.Group className="mb-3">
                        <Form.Label>Enter Heading</Form.Label>
                        <Form.Control
                          placeholder="Enter heading"
                          onChange={(e) => {
                            setFormData((prevState) => ({
                              ...prevState,
                              't&c': { ...prevState['t&c'], Heading1: e.target.value }
                            }));
                            setBtnDisabled({ ...btnDisabled, 't&c': false });
                          }}
                          defaultValue={pageData?.sectionData[0]?.Heading1}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={12}>
                      <Form.Group className="mb-3">
                        <Form.Label>Enter Description</Form.Label>
                        <TextEditor
                          defaultValue={pageData?.sectionData[0]?.Description}
                          contentSlug="t&c"
                          pageData={pageData}
                          setBtnDisabled={setBtnDisabled}
                          setFormData={setFormData}
                          btnDisabled={btnDisabled}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Button
                    variant="primary"
                    onClick={() => submitEditData('t&c')}
                    // disabled={btnDisabled[pageData?.achievements?.ContentSlug]}
                    className="float-right"
                  >
                    Submit
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        )}

        {pageData?.pageData?.PageSlug === '/terms-&-conditions' && (
          <Col sm={12}>
            <Card>
              <Card.Header>
                {showSuccessBanner['t&c'] && <SuccessBanner />}
                <Card.Title as="h5">Terms & Conditions</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Row>
                    <Col md={12}>
                      <Form.Group className="mb-3">
                        <Form.Label>Enter Heading</Form.Label>
                        <Form.Control
                          placeholder="Enter heading"
                          onChange={(e) => {
                            setFormData((prevState) => ({
                              ...prevState,
                              't&c': { ...prevState['t&c'], Heading1: e.target.value }
                            }));
                            setBtnDisabled({ ...btnDisabled, 't&c': false });
                          }}
                          defaultValue={pageData?.sectionData[0]?.Heading1}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={12}>
                      <Form.Group className="mb-3">
                        <Form.Label>Enter Description</Form.Label>
                        <TextEditor
                          defaultValue={pageData?.sectionData[0]?.Description}
                          contentSlug="t&c"
                          pageData={pageData}
                          setBtnDisabled={setBtnDisabled}
                          setFormData={setFormData}
                          btnDisabled={btnDisabled}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Button
                    variant="primary"
                    onClick={() => submitEditData('t&c')}
                    // disabled={btnDisabled[pageData?.achievements?.ContentSlug]}
                    className="float-right"
                  >
                    Submit
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        )}

        <Col sm={12}>
          <Card>
            <Card.Header>
              {showSuccessBanner['metadata'] && <SuccessBanner />}
              <Card.Title as="h5">Metadata</Card.Title>
            </Card.Header>
            <Card.Body>
              <Form>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Enter Meta Title</Form.Label>
                      <Form.Control
                        placeholder="Enter meta title"
                        onChange={(e) => {
                          setFormData((prevState) => ({ ...prevState, metadata: { ...prevState.metadata, MetaTitle: e.target.value } }));
                          setBtnDisabled({ metadata: false });
                        }}
                        defaultValue={pageData?.pageData?.MetaTitle}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Enter OG Title</Form.Label>
                      <Form.Control
                        placeholder="Enter og title"
                        onChange={(e) => {
                          setFormData((prevState) => ({ ...prevState, metadata: { ...prevState.metadata, OGTitle: e.target.value } }));
                          setBtnDisabled({ metadata: false });
                        }}
                        defaultValue={pageData?.pageData?.OGTitle}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={12}>
                    <Form.Group className="mb-3">
                      <Form.Label>Enter Meta Description</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        onChange={(e) => {
                          setFormData((prevState) => ({
                            ...prevState,
                            metadata: { ...prevState.metadata, MetaDescription: e.target.value }
                          }));
                          setBtnDisabled({ metadata: false });
                        }}
                        defaultValue={pageData?.pageData?.MetaDescription}
                        placeholder="Enter meta description"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={12}>
                    <Form.Group className="mb-3">
                      <Form.Label>Enter OG Description</Form.Label>
                      <Form.Control
                        as="textarea"
                        onChange={(e) => {
                          setFormData((prevState) => ({
                            ...prevState,
                            metadata: { ...prevState.metadata, OGDescription: e.target.value }
                          }));
                          setBtnDisabled({ metadata: false });
                        }}
                        rows={3}
                        defaultValue={pageData?.pageData?.OGDescription}
                        placeholder="Enter og description"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Enter Meta Keywords</Form.Label>
                      <Form.Control
                        as="textarea"
                        onChange={(e) => {
                          setFormData((prevState) => ({ ...prevState, metadata: { ...prevState.metadata, MetaKeywords: e.target.value } }));
                          setBtnDisabled({ metadata: false });
                        }}
                        rows={3}
                        defaultValue={pageData?.pageData?.MetaKeywords}
                        placeholder="Enter meta keywords"
                      />
                    </Form.Group>
                  </Col>
                  {/* <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Enter OG Keywords</Form.Label>
                      <Form.Control as="textarea" rows={3} placeholder="Enter og keywords" />
                    </Form.Group>
                  </Col> */}
                </Row>

                <Button
                  variant="primary"
                  onClick={() => submitEditData('metadata')}
                  disabled={btnDisabled['metadata']}
                  className="float-right"
                >
                  Submit
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default EditPage;
