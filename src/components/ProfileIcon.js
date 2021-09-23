import '../App.css';
import React from 'react';
import { connect } from  'react-redux';
import { FaKiwiBird, FaDog, FaCat, FaUserCircle } from 'react-icons/fa';
import { GiBearFace, GiMonkey, GiFoxHead, GiPirateCaptain, GiNinjaHead, GiAstronautHelmet } from 'react-icons/gi';

class ProfileIcon extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            iconMap: {
                "dog": <FaDog style={{color: this.props.iconColour, fontSize: this.props.size, margin: '10px'}} />,
                "cat": <FaCat style={{color: this.props.iconColour, fontSize: this.props.size, margin: '10px'}} />,
                "bird": <FaKiwiBird style={{color: this.props.iconColour, fontSize: this.props.size, margin: '10px'}} />,
                "bear": <GiBearFace style={{color: this.props.iconColour, fontSize: this.props.size, margin: '10px'}} />,
                "monkey": <GiMonkey style={{color: this.props.iconColour, fontSize: this.props.size, margin: '10px'}} />,
                "fox": <GiFoxHead style={{color: this.props.iconColour, fontSize: this.props.size, margin: '10px'}} />,
                "pirate": <GiPirateCaptain style={{color: this.props.iconColour, fontSize: this.props.size, margin: '10px'}} />,
                "ninja": <GiNinjaHead style={{color: this.props.iconColour, fontSize: this.props.size, margin: '10px'}} />,
                "astronaut": <GiAstronautHelmet style={{color: this.props.iconColour, fontSize: this.props.size, margin: '10px'}} />,
                "default": <FaUserCircle style={{color: this.props.iconColour, fontSize: this.props.size, margin: '10px'}} />,
            }
        }
    }
    render() {
        return(
            <div>
                {this.props.iconName !== null ||  this.props.iconName !== "default" ? this.state.iconMap[this.props.iconName] : this.state.iconMap["default"]}
            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    return {
      authDetails: state.authDetails
    }
}

export default connect(mapStateToProps)(ProfileIcon);
