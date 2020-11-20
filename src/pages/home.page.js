import React from 'react';
import './home.styles.scss';
import { ReactComponent as SiteLogo } from '../assets/images/starwars_logo.svg';
import heroImage from '../assets/images/bg.png';

export const Home = () => {
  return (
    <React.Fragment>
      <section className="hero flex section">
        <div className="hero-content">
          <SiteLogo className="site-logo" />
          <div className="banner flex">
            <h1 className="banner-title">THE FORCE</h1>
            <br />
            <div className="flex banner-subtitle-container">
              <h4 className="banner-subtitle">WILL BE WITH YOU</h4>
              <span className="banner-subtitle-alt-sm">ALWAYS</span>
            </div>
            <div className="hero-call-to-action">
              <a href="#char" className="btn btn-primary hero-btn">
                BROWSE CHARACTERS
              </a>
            </div>
          </div>
        </div>
        <div className="hero-image">
          <img src={heroImage} alt="soldier holding gun" />
        </div>
      </section>
      <section className="section section-main">
        <h1 className="section-title">CHARACTERS</h1>
        <div className="gallery">
          <div className="gallery-item">
            <div className="card">
              <div className="card-header">
                <span>file 1</span>
              </div>
              <div className="card-content">
                <h3>Dark Vader</h3>
                <h4>1988Y</h4>
              </div>
              <div className="card-footer">
                <a href="">Open File</a>
              </div>
            </div>
          </div>
          <div className="gallery-item">
            <div className="card">
              <div className="card-header">
                <span>file 1</span>
              </div>
              <div className="card-content">
                <h3>Dark Vader</h3>
                <h4>1988Y</h4>
              </div>
              <div className="card-footer">
                <a href="">Open File</a>
              </div>
            </div>
          </div>
          <div className="gallery-item">
            <div className="card">
              <div className="card-header">
                <span>file 1</span>
              </div>
              <div className="card-content">
                <h3>Dark Vader</h3>
                <h4>1988Y</h4>
              </div>
              <div className="card-footer">
                <a href="">Open File</a>
              </div>
            </div>
          </div>
          <div className="gallery-item">
            <div className="card">
              <div className="card-header">
                <span>file 1</span>
              </div>
              <div className="card-content">
                <h3>Dark Vader</h3>
                <h4>1988Y</h4>
              </div>
              <div className="card-footer">
                <a href="">Open File</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};
