import React from 'react';
import ReactDOM from 'react-dom';
import PostBox from './PostBox';

ReactDOM.render(
  <PostBox
    url='http://localhost:3001/api/posts'
    pollInterval={2000}
  />,
  document.getElementById('root')
);
