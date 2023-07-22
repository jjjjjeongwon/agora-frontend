import React from 'react';
import FadeLoader from 'react-spinners/FadeLoader';

function LoadingSpinner() {
  return (
    <div class="contentWrap">
      <div
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <FadeLoader
          color="#0e72ed"
          height={15}
          width={5}
          radius={2}
          margin={2}
        />
        loading...
      </div>
    </div>
  );
}

export default LoadingSpinner;
