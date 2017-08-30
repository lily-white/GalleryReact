require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';
import ReactDOM from 'react-dom'

//获取图片数据信息
let images = require('../data/images.json');
//将图片名转为图片URL路径信息
images = images.map((img)=> {
    img.imageURL = require('../images/' + img.fileName);
    return img;
});

class AppComponent extends React.Component {
    Constant: {
        centerPos: {
            left: 0,
            top: 0
        },
        //水平方向取值范围
        hPosRange: {
            leftSecX: [0, 0],
            rightSecX: [0, 0],
            y: [0, 0]
        },
        //垂直方向取值范围
        vPosRange: {
            x: [0, 0],
            y: [0, 0]
        }
    }

    componentDidMount() {
        //计算舞台的大小
        let stageDOM = ReactDOM.findDOMNode(this.refs.stage),
            stageWidth = stageDOM.scrollWidth,
            stageHeight = stageDOM.scrollHeight,
            halfStageWidth = Math.ceil(stageWidth / 2),
            halfStageHeight = Math.ceil(stageHeight / 2);

        //计算image大小
        let imageDOM = ReactDOM.findDOMNode(this.refs.imageFigure0),
            imageWidth = imageDOM.width,
            imageHeight = imageDOM.height,
            haflImageWidth = Math.ceil(imageWidth / 2),
            halfImageHeight = Math.ceil(imageHeight / 2);

        //计算中心图片位置
        this.Constant.centerPos = {
            left: halfStageWidth - haflImageWidth,
            top: halfStageHeight - halfStageHeight
        };

        //计算左右图片区域边界
        this.Constant.hPosRange.leftSecX[0] = -haflImageWidth;
        this.Constant.hPosRange.leftSecX[1] = halfStageWidth - haflImageWidth * 3;
        this.Constant.hPosRange.rightSecX[0] = halfStageWidth + haflImageWidth;
        this.Constant.hPosRange.rightSecX[1] = stageWidth - haflImageWidth;
        this.Constant.hPosRange.y[0] = -halfImageHeight;
        this.Constant.hPosRange.y[1] = stageHeight - halfImageHeight;

        //计算上方图片区域边界
        this.Constant.vPosRange.x[0] = halfStageWidth - haflImageWidth;
        this.Constant.vPosRange.x[1] = halfStageWidth;
        this.Constant.vPosRange.y[0] = -halfImageHeight;
        this.Constant.vPosRange.x[1] = halfStageHeight - halfImageHeight * 3;

        this.rerange(0);
    }

    /*
     *重新布局所有图片
     *@param index 指定居中哪个图片
     */
    rerange(index) {

    }

    render() {
        let imgFigures = [];

        images.map((img, index) => {
            imgFigures.push(<ImgFigure ref={'imageFigure'+index}/>)
        });

        return (
            <section className="stage" ref="stage">
                <section className="img-sec">
                    {imgFigures}
                </section>
                <nav className="control-nav"></nav>
            </section>
        );
    }
}

AppComponent.defaultProps = {
};

export default AppComponent;
