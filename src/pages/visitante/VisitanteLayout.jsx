import NavVisitante from './NavVisitante.jsx';
import HomeVisitante from './HomeVisitante.jsx';
import React from 'react';
const VisitanteLayout = () => {
  return (
    <div className="home">
      <NavVisitante />
      <HomeVisitante />
    </div>
  );
};

export default VisitanteLayout;
