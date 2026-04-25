import React from 'react';

interface HeaderProps {
  isLoaded: boolean;
  isLoading: boolean;
}

export const Header: React.FC<HeaderProps> = ({ isLoaded, isLoading }) => {
  return (
    <header className="app-header">
      <div id="project-info"><span>Created By : <a target='_' href='https://github.com/bye-shuvo'>Bye_Shuvo</a></span></div>
      <div className="header-ornament left">❧</div>
      <div className="header-center">
        <h1 className="app-title">Grand Piano</h1>
        <p className="app-subtitle">Salamander Concert Grand · Virtual Instrument</p>
        <div className="load-status">
          {isLoading && (
            <span className="status-loading">
              <span className="loading-dot" />
              <span className="loading-dot" />
              <span className="loading-dot" />
              Loading samples…
            </span>
          )}
          {isLoaded && (
            <span className="status-ready">✦ Instrument ready — play with keys or mouse</span>
          )}
        </div>
      </div>
      <div className="header-ornament right">❦</div>
    </header>
  );
};
