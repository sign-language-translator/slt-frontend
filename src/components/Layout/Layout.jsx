import React from 'react';
import './layout.css';
import {Outlet} from 'react-router-dom';
import { Sidebar, NavBar } from '../';

export default function Layout() {
  return (
    <div className={`layout`}>
      <Sidebar />
      <NavBar />

      <div className="layout__content">
        <div className="layout__content-main"><Outlet /></div>
      </div>
    </div>
  );
}
