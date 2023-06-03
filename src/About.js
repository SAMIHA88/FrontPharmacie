import React from 'react';

const About = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.text}>Notre Application est pour la gestion des pharmacies et leur localisation.</h1>
      <br/>
      <div style={styles.imageContainer}>
        <img
          src={require("./images/localisationPharma.png")}
          alt="Image du tableau de bord"
          style={styles.image}
        />
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '60vh',
  },
  text: {
    textAlign: 'center',
  },
  imageContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '300px',
    height: 'auto',
  },
};

export default About;
