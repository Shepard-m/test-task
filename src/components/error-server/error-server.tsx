import React from 'react';
import '../error-server/error-server-style.css';

export default function ErrorServer() {
  return (
    <div className='error' data-testid={'ErrorServer'}>
      <div className="error__content">
        <img className='error__fon' src="img/error-server.jpg" alt="" />
        <p className='error__text'>Произошла ошибка сервера</p>
      </div>
    </div>);
}
