import React, { useState } from 'react';
import $ from 'zepto-browserify';

const MyComponent = () => {
  const getCookie = (name) => {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = $.trim(cookies[i]);
        if (cookie.substring(0, name.length + 1) === `${name}=`) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  };

  const csrftoken = getCookie('csrftoken');

  // Your component logic goes here

  return (
    // JSX for your component
    <div>
      <p>CSRF Token: {csrftoken}</p>
    </div>
  );
};

export default MyComponent;
