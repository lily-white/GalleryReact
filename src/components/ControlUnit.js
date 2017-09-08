import React from 'react';

class ControlUnit extends React.Component{
    constructor(props) {
      super(props);
    
      this.state = {};
      this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        if(this.props.arrange.isCenter) {
            this.props.inverse();
        }else{
            this.props.center();
        }

        e.stopPropagation();
        e.preventDefault();
    }

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

ControlUnit.defaultProps = {};
export default ControlUnit;