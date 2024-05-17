import React from 'react';
import './Notification.css'; 
const Notification = ({ message }) => {
  return (
    <div className="notification">
      {message.split('\n').map((line, index) => (
        <React.Fragment key={index}>
          {line}
          <br />
        </React.Fragment>
      ))}
    </div>
  );
};

export default Notification;
