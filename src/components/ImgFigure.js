import React from 'react';

class ImgFigure extends React.Component{
    constructor(props) {
      super(props);
    
      this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        if(this.props.arrange.isCenter){
            this.props.inverse();
        }else{
            this.props.center();
        }

        e.stopPropagation();
        e.preventDefault();
    }

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
};
ImgFigure.defaultProps = {};
export default ImgFigure;