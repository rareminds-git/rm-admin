/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { ListGroup, Dropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const NavRight = () => {
  const navigate = useNavigate();

  return (
    <React.Fragment>
      <ListGroup as="ul" bsPrefix=" " className="navbar-nav ml-auto" id="navbar-right">
        <ListGroup.Item as="li" bsPrefix=" "></ListGroup.Item>

        <ListGroup.Item as="li" bsPrefix=" ">
          <Dropdown align={'end'} className="drp-user">
            <Dropdown.Toggle as={Link} variant="link" to="#" id="dropdown-basic">
              <i className="icon feather icon-settings" />
            </Dropdown.Toggle>
            <Dropdown.Menu align="end" className="profile-notification">
              <div
                onClick={() => {
                  localStorage.removeItem('access_token');
                  window.location.href = '/admin/';
                }}
                className="pro-head"
                style={{ cursor: 'pointer' }}
              >
                {/* <img src={avatar1} className="img-radius" alt="User Profile" /> */}
                <span>Logout</span>
                <Link className="dud-logout" title="Logout">
                  <i className="feather icon-log-out" />
                </Link>
              </div>
            </Dropdown.Menu>
          </Dropdown>
        </ListGroup.Item>
      </ListGroup>
      {/* <ChatList listOpen={listOpen} closed={() => setListOpen(false)} /> */}
    </React.Fragment>
  );
};

export default NavRight;
