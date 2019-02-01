import './Header.scss';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import image from './../../assets/images/image.png';

class Header extends Component {

  render() {
    return (
      <header className="header">
        <img src={image} />
        <h1>Hello React + Webpack 4</h1>
      </header>
    )
  }

}

export default Header;
