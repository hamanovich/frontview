import React, { Fragment } from 'react';
import Fontawesome from 'react-fontawesome';

import Container from 'react-bootstrap/Container';
import Media from 'react-bootstrap/Media';

const About = () => (
  <Fragment>
    <Container>
      <h1>About me</h1>
      <p className="lead mb-5">
        I am Siarhei Hamanovich. Almost 30. Let me provide you the list of my
        social accounts. A few of them only in russian content, however, fill
        free to contact me in English as well and I will answer you directly.
        See you
      </p>
      <Media>
        <Fontawesome
          name="github"
          className="mr-4"
          style={{ width: 60 }}
          size="4x"
        />
        <Media.Body>
          <h3>
            <a
              href="https://github.com/hamanovich"
              target="_blank"
              rel="noopener noreferrer">
              Github
            </a>
          </h3>
          <p>
            Software Engineer HTML5/CSS3, Accessibility. Frontend audit.
            corejs/ReactJS/VueJS.
          </p>
        </Media.Body>
      </Media>
      <Media>
        <Fontawesome
          name="linkedin"
          className="mr-4"
          style={{ width: 60 }}
          size="4x"
        />
        <Media.Body>
          <h3>
            <a
              href="https://www.linkedin.com/in/hamanovich/"
              target="_blank"
              rel="noopener noreferrer">
              Linkedin
            </a>
          </h3>
          <p>EPAM Systems. Software Engineer.</p>
        </Media.Body>
      </Media>
      <Media>
        <Fontawesome
          name="jsfiddle"
          className="mr-4"
          style={{ width: 60 }}
          size="3x"
        />
        <Media.Body>
          <h3>
            <a
              href="https://jsfiddle.net/user/hamanovich/fiddles/"
              target="_blank"
              rel="noopener noreferrer">
              JSfiddle
            </a>
          </h3>
          <p>JSfiddle sandbox demo projects.</p>
        </Media.Body>
      </Media>
      <Media>
        <Fontawesome
          name="500px"
          className="mr-4"
          style={{ width: 60 }}
          size="4x"
        />
        <Media.Body>
          <h3>
            <a
              href="https://500px.com/hamanovich"
              target="_blank"
              rel="noopener noreferrer">
              500px
            </a>
          </h3>
          <p>Photogallery. Last photoshoots from my camera.</p>
        </Media.Body>
      </Media>
      <Media>
        <Fontawesome
          name="skype"
          className="mr-4"
          style={{ width: 60 }}
          size="4x"
        />
        <Media.Body>
          <h3>hamanonvich</h3>
          <p>
            <em>
              Yeah, I know, I made a typo mistake in skype account when creating
              a new one. My fail :(
            </em>
          </p>
        </Media.Body>
      </Media>
      <Media>
        <Fontawesome
          name="wordpress"
          className="mr-4"
          style={{ width: 60 }}
          size="4x"
        />
        <Media.Body>
          <h3>
            <a href="https://2i.by" target="_blank" rel="noopener noreferrer">
              2i.by
            </a>
          </h3>
          <p>
            My personal astronomy blog for publication new observations. Only
            russian content.
          </p>
        </Media.Body>
      </Media>
      <Media>
        <Fontawesome
          name="youtube"
          className="mr-4"
          style={{ width: 60 }}
          size="4x"
        />
        <Media.Body>
          <h3>
            <a
              href="https://www.youtube.com/channel/UCJwmqotZlALp6Ett_dxk-JA"
              target="_blank"
              rel="noopener noreferrer">
              Youtube
            </a>
          </h3>
          <p>A few video moments</p>
        </Media.Body>
      </Media>
      <Media>
        <Fontawesome
          name="instagram"
          className="mr-4"
          style={{ width: 60 }}
          size="4x"
        />
        <Media.Body>
          <h3>
            <a
              href="https://www.instagram.com/hamanovich/"
              target="_blank"
              rel="noopener noreferrer">
              Instagram
            </a>
          </h3>
          <p>Travelling and photoshooting. Personal instagram account.</p>
        </Media.Body>
      </Media>
      <Media>
        <Fontawesome
          name="twitter"
          className="mr-4"
          style={{ width: 60 }}
          size="4x"
        />
        <Media.Body>
          <h3>
            <a
              href="https://twitter.com/hamanovich"
              target="_blank"
              rel="noopener noreferrer">
              Twitter
            </a>
          </h3>
          <p>Personal twitter account. Russian content only.</p>
        </Media.Body>
      </Media>
    </Container>
  </Fragment>
);

export default About;
