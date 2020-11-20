import React from 'react';
import './home.styles.scss';
import { ReactComponent as SiteLogo } from '../assets/images/starwars_logo.svg';
import heroImage from '../assets/images/bg.png';
import {PeopleList} from "../components/people/peopleList.component";

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
      <section className="section section-main section-full-height" id="char">
        <h1 className="section-title">CHARACTERS</h1>
        <PeopleList/>
      </section>
    </React.Fragment>
  );
};
