require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';

//获取图片数据信息
let images = require('../data/images.json');
//将图片名转为图片URL路径信息
images = images.map((img)=> {
    img.imageURL = require('../images/' + img.fileName);
    return img;
});

class AppComponent extends React.Component {
  render() {
    return (
      <section className="stage">
        <section className="img-sec"></section>
        <nav className="control-nav"></nav>
      </section>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
