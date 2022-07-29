import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import LandingPage from '../components/pages/public/LandingPage.js';
import CommonSandbox from '../components/pages/public/CommonSandbox.js';
import GameListPage from '../components/pages/public/GameListPage2.js';

let paths = [
  <Route key="public-route-/"
         path="/" element={<LandingPage />} />,
  <Route key="public-route-/commons"
        path="/commons" element={<CommonSandbox />} />,
  <Route key="public-route-/game-list"
       path="/data/game-list" element={<GameListPage />} />,
  <Route key="public-route-redirect-unknowns"
         path="*" element={<Navigate to="/" />} />
];

export default paths;
