import React from 'react';
import { FaInstagram, FaLinkedin, FaFacebook } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <p style={styles.text}>© 2023 ELHAJJAM Samiha. All rights reserved.</p>
      <div style={styles.socialIcons}>
        <a href="https://www.instagram.com/samiha_elhajjam/" target="_blank" rel="noopener noreferrer">
          <FaInstagram style={styles.icon} />
        </a>
        <a href="https://www.linkedin.com/in/samiha-elhajjam/" target="_blank" rel="noopener noreferrer">
          <FaLinkedin style={styles.icon} />
        </a>
        <a href="https://www.facebook.com/ilayss.el" target="_blank" rel="noopener noreferrer">
          <FaFacebook style={styles.icon} />
        </a>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: 'black',
    padding: '40px',
    textAlign: 'center',
    marginTop: '-100px',
  },
  text: {
    color: '#888',
    fontSize: '14px',
  },
  socialIcons: {
    marginTop: '20px',
  },
  icon: {
    color: '#fff',
    fontSize: '20px',
    margin: '0 10px',
  },
};

export default Footer;
