import '../App.css';
import React from 'react';
import { connect } from  'react-redux';
import { FaKiwiBird, FaDog, FaCat } from 'react-icons/fa';
import { GiBearFace, GiMonkey, GiFoxHead, GiPirateCaptain, GiNinjaHead, GiAstronautHelmet } from 'react-icons/gi';

class IconSelection extends React.Component {
    render() {
        return(
            <div style={{display: 'flex', justifyContent: 'center', margin: '30px'}}>
                <div>
                    <fieldset name="iconName" onChange={this.props.handleChange}>
                        <div>
                            <FaDog style={{color: this.props.iconColour, fontSize: '35px', margin: '10px'}} />
                            <input type="radio" value="dog" name="iconName" />
                            <FaCat style={{color: this.props.iconColour, fontSize: '35px', margin: '10px'}} />
                            <input type="radio" value="cat" name="iconName" />
                            <GiBearFace style={{color: this.props.iconColour, fontSize: '35px', margin: '10px'}} />
                            <input type="radio" value="bear" name="iconName" />
                        </div>
                        <div>
                            <GiFoxHead style={{color: this.props.iconColour, fontSize: '35px', margin: '10px'}} />
                            <input type="radio" value="fox" name="iconName" />
                            <GiMonkey style={{color: this.props.iconColour, fontSize: '35px', margin: '10px'}} />
                            <input type="radio" value="monkey" name="iconName" />
                            <FaKiwiBird style={{color: this.props.iconColour, fontSize: '35px', margin: '10px'}} />
                            <input type="radio" value="bird" name="iconName" />
                        </div>
                        <div>
                            <GiAstronautHelmet style={{color: this.props.iconColour, fontSize: '35px', margin: '10px'}} />
                            <input type="radio" value="astronaut" name="iconName" />
                            <GiNinjaHead style={{color: this.props.iconColour, fontSize: '35px', margin: '10px'}} />
                            <input type="radio" value="ninja" name="iconName" />
                            <GiPirateCaptain style={{color: this.props.iconColour, fontSize: '35px', margin: '10px'}} />
                            <input type="radio" value="pirate" name="iconName" />
                        </div>
                    </fieldset>
                </div>
                <div style={{margin: '50px'}}>
                    <select onChange={this.props.handleChange} name="iconColour">
                        <option value="white">White</option>
                        <option value="#df3030">Red</option>
                        <option value="#2694ea">Blue</option>
                        <option value="#008216">Green</option>
                        <option value="yellow">Yellow</option>
                        <option value="orange">Orange</option>
                        <option value="#8733d1">Purple</option>
                        <option value="gray">Gray</option>
                        <option value="pink">Pink</option>
                    </select>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    return {
      authDetails: state.authDetails
    }
}

export default connect(mapStateToProps)(IconSelection);
