import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import './styles.css';
import api from '../../services/api';

function Landing() {
  const [totalConnections, setTotalConnections] = useState(0);

  useEffect(() => {
    api.get('connections').then(response => {
      const { total } = response.data;
      setTotalConnections(total);
    });
  }, []);
  return (
    <div id="page-landing">
      <div id="page-landing-content" className="container">

        <div className="logo-container">

          <h2>Sua plataforma de estudos online</h2>
        </div>

      </div>
    </div>
  )
}

export default Landing;