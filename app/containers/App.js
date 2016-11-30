import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';
import Home from '../components/home';


const mapStateToProps = (state) => {
  return {
    children: PropTypes.element.isRequired,
  }
}

export default connect(mapStateToProps)(Home);
