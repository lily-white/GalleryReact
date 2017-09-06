require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';
import ReactDOM from 'react-dom';
import createReactClass from 'create-react-class';

//获取图片数据信息
let images = require('../data/images.json');
//将图片名转为图片URL路径信息
images = images.map((img)=> {
    img.imageURL = require('../images/' + img.fileName);
    return img;
});

/*
 * 获取区间内的一个随机值
 */
function getRangeRandom(low, high) {
    return Math.ceil(Math.random() * (high - low) + low);
}

/*
 * 获取 0~30° 之间的一个任意正负值
 */
function get30DegRandom() {
  return ((Math.random() > 0.5 ? '' : '-') + Math.ceil(Math.random() * 30));
}

let ImgFigure = createReactClass({
    handleClick(e) {
        if(this.props.arrange.isCenter){
            this.props.inverse();
        }else{
            this.props.center();
        }

        e.stopPropagation();
        e.preventDefault();
    },
    render() {
        let styleObj = {};
        if(this.props.arrange.pos){
            styleObj = this.props.arrange.pos;
        }
        if(this.props.arrange.isCenter){
            styleObj.zIndex = '11';
        }

        if(this.props.arrange.rotate){
            ['WebkitTransform', 'MozTransform', 'msTransform', 'transform'].map((item) => {
                styleObj[item] = 'rotate(' + this.props.arrange.rotate + 'deg)';
            })
            
        }

        let imgClass = 'img-figure';
        imgClass += this.props.arrange.isInverse ? ' is-inverse' : '';

        return (
            <figure className={imgClass} style={styleObj} onClick={this.handleClick}>
                <img src={this.props.data.imageURL} alt={this.props.data.title}/>
                <figcaption>
                    <h2 className="img-title">{this.props.data.title}</h2>
                    <div className="img-back">
                        <p>{this.props.data.desc}</p>
                    </div>    
                </figcaption>
            </figure>
        );
    }
});

let ControlUnit = createReactClass({
    handleClick(e) {
        if(this.props.arrange.isCenter) {
            this.props.inverse();
        }else{
            this.props.center();
        }

        e.stopPropagation();
        e.preventDefault();
    },
    render() {
        let unitClassName = 'control-unit';
        if(this.props.arrange.isCenter) {
            unitClassName += ' is-center';

            if(this.props.arrange.isInverse) {
                unitClassName += ' is-inverse';
            }
        }
        return (
            <span className={unitClassName} onClick={this.handleClick}></span>
        );
    }
});

class AppComponent extends React.Component {
    constructor(props) {
      super(props);
    
      this.state = {
        imgsArrangeArr : [
        /*
            {
                pos: {
                    left:0,
                    top:0
                },
                rotate:0,
                isInverse: false
            }
        */
        ]
      };

      this.Constant = {
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
        };
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
            imageWidth = imageDOM.scrollWidth,
            imageHeight = imageDOM.scrollHeight,
            haflImageWidth = Math.ceil(imageWidth / 2),
            halfImageHeight = Math.ceil(imageHeight / 2);

        //计算中心图片位置
        this.Constant.centerPos = {
            left: halfStageWidth - haflImageWidth,
            top: halfStageHeight - halfImageHeight
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
     *翻转图片
     *@param 要翻转图片在图片数组中的index
     */
    inverse(index){
        return () => {
            let imgArr = this.state.imgsArrangeArr;
            imgArr[index].isInverse = !imgArr[index].isInverse;

            this.setState({
                imgsArrangeArr: imgArr
            });
        }
    }

    /*
     *居中图片
     *@param 要居中图片在图片数组中的index
     */
    center(index){
        return () => {
            this.rerange(index);
        }
    }
    /*
     *重新布局所有图片
     *@param index 指定居中哪个图片
     */
    rerange(centerIndex) {
    let imgsArrangeArr = this.state.imgsArrangeArr,
        Constant = this.Constant,
        centerPos = Constant.centerPos,
        hPosRange = Constant.hPosRange,
        vPosRange = Constant.vPosRange,
        hPosRangeLeftSecX = hPosRange.leftSecX,
        hPosRangeRightSecX = hPosRange.rightSecX,
        hPosRangeY = hPosRange.y,
        vPosRangeTopY = vPosRange.y,
        vPosRangeX = vPosRange.x,

        imgsArrangeTopArr = [],
        topImgNum = Math.floor(Math.random() * 2),    // 取一个或者不取
        topImgSpliceIndex = 0,

        imgsArrangeCenterArr = imgsArrangeArr.splice(centerIndex, 1);

        // 首先居中 centerIndex 的图片, 居中的 centerIndex 的图片不需要旋转
        imgsArrangeCenterArr[0] = {
          pos: centerPos,
          rotate: 0,
          isCenter: true,
          isInverse: false
        };

        // 取出要布局上侧的图片的状态信息
        topImgSpliceIndex = Math.ceil(Math.random() * (imgsArrangeArr.length - topImgNum));
        imgsArrangeTopArr = imgsArrangeArr.splice(topImgSpliceIndex, topImgNum);

        // 布局位于上侧的图片
        imgsArrangeTopArr.forEach(function (value, index) {
            imgsArrangeTopArr[index] = {
              pos: {
                  top: getRangeRandom(vPosRangeTopY[0], vPosRangeTopY[1]),
                  left: getRangeRandom(vPosRangeX[0], vPosRangeX[1])
              },
              rotate: get30DegRandom(),
              isCenter: false,
              isInverse: false
            };
        });

        // 布局左右两侧的图片
        for (var i = 0, j = imgsArrangeArr.length, k = j / 2; i < j; i++) {
            var hPosRangeLORX = null;

            // 前半部分布局左边， 右半部分布局右边
            if (i < k) {
                hPosRangeLORX = hPosRangeLeftSecX;
            } else {
                hPosRangeLORX = hPosRangeRightSecX;
            }

            imgsArrangeArr[i] = {
              pos: {
                  top: getRangeRandom(hPosRangeY[0], hPosRangeY[1]),
                  left: getRangeRandom(hPosRangeLORX[0], hPosRangeLORX[1])
              },
              rotate: get30DegRandom(),
              isCenter: false,
              isInverse: false
            };

        }

        if (imgsArrangeTopArr && imgsArrangeTopArr[0]) {
            imgsArrangeArr.splice(topImgSpliceIndex, 0, imgsArrangeTopArr[0]);
        }

        imgsArrangeArr.splice(centerIndex, 0, imgsArrangeCenterArr[0]);

        this.setState({
            imgsArrangeArr: imgsArrangeArr
        });
    }

    render() {
        let imgFigures = [],
            controlUnits = [];


        images.map((img, index) => {
            if(!this.state.imgsArrangeArr[index]){
                this.state.imgsArrangeArr[index] = {
                    pos: {
                        left: 0,
                        top: 0
                    },
                    rotate: 0,
                    isInverse: false
                };
            }

            imgFigures.push(<ImgFigure key={'imageFigure'+index} ref={'imageFigure'+index} data={img} arrange={this.state.imgsArrangeArr[index]} 
                inverse={this.inverse(index)} center={this.center(index)} />);

            controlUnits.push(<ControlUnit key={index} arrange={this.state.imgsArrangeArr[index]} inverse={this.inverse(index)} center={this.center(index)}/>);
            return img;
        });

        return (
            <section className="stage" ref="stage">
                <section className="img-sec">
                    {imgFigures}
                </section>
                <nav className="control-nav">
                    {controlUnits}
                </nav>
            </section>
        );
    }
}

AppComponent.defaultProps = {
};

export default AppComponent;
