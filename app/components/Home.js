// @flow
import React, { Component } from 'react';
import styles from './Home.css';


export default class Home extends Component {
  render() {
    return (
      <div>
        <div className={styles.container}>
          Hello World!
        </div>
      </div>
    );
  }
}