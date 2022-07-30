import React, { useEffect } from 'react';

const LandingPage = () => {
  useEffect(() => {
    document.title = 'Tometech - Home'
  }, []);

  return (
    <div className="landing-page-wrapper">
      You have landed! 👽
    </div>
  );
};

export default LandingPage;
