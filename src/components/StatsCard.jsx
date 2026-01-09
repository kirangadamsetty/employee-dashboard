import React from 'react';

const StatsCard = ({ title, count, icon, color }) => {
  return (
    <div className="col-md-4 mb-3">
      <div className={`card card-hover h-100 border-start border-4 border-${color}`}>
        <div className="card-body d-flex align-items-center justify-content-between">
          <div>
            <h6 className="text-muted text-uppercase mb-1">{title}</h6>
            <h2 className="fw-bold mb-0 text-dark">{count}</h2>
          </div>
          <div className={`text-${color} fs-1 opacity-25`}>
            {icon}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;