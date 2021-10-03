import '../App.css';
import React from 'react';
import { connect } from  'react-redux';
import { FaKiwiBird, FaDog, FaCat } from 'react-icons/fa';
import { GiBearFace, GiMonkey, GiFoxHead, GiPirateCaptain, GiNinjaHead, GiAstronautHelmet } from 'react-icons/gi';

class IconSelection extends React.Component {
    render() {
        console.log(this.props.iconName)
        return(
            <div style={{display: 'flex', justifyContent: 'center', margin: '30px', flexWrap: 'wrap'}}>
                <div>
                    <fieldset name="iconName" onChange={this.props.handleChange}>
                        <div>
                            <FaDog style={{color: this.props.iconColour, fontSize: '35px', margin: '10px'}} />
                            <input type="radio" value="dog" name="iconName" checked={this.props.iconName === "dog"} />
                            <FaCat style={{color: this.props.iconColour, fontSize: '35px', margin: '10px'}} />
                            <input type="radio" value="cat" name="iconName" checked={this.props.iconName === "cat"} />
                            <GiBearFace style={{color: this.props.iconColour, fontSize: '35px', margin: '10px'}} />
                            <input type="radio" value="bear" name="iconName" checked={this.props.iconName === "bear"} />
                        </div>
                        <div>
                            <GiFoxHead style={{color: this.props.iconColour, fontSize: '35px', margin: '10px'}} />
                            <input type="radio" value="fox" name="iconName" checked={this.props.iconName === "fox"} />
                            <GiMonkey style={{color: this.props.iconColour, fontSize: '35px', margin: '10px'}} />
                            <input type="radio" value="monkey" name="iconName" checked={this.props.iconName === "monkey"} />
                            <FaKiwiBird style={{color: this.props.iconColour, fontSize: '35px', margin: '10px'}} />
                            <input type="radio" value="bird" name="iconName" checked={this.props.iconName === "bird"} />
                        </div>
                        <div>
                            <GiAstronautHelmet style={{color: this.props.iconColour, fontSize: '35px', margin: '10px'}} />
                            <input type="radio" value="astronaut" name="iconName" checked={this.props.iconName === "astronaut"} />
                            <GiNinjaHead style={{color: this.props.iconColour, fontSize: '35px', margin: '10px'}} />
                            <input type="radio" value="ninja" name="iconName" checked={this.props.iconName === "ninja"} />
                            <GiPirateCaptain style={{color: this.props.iconColour, fontSize: '35px', margin: '10px'}} />
                            <input type="radio" value="pirate" name="iconName" checked={this.props.iconName === "pirate"} />
                        </div>
                    </fieldset>
                </div>
                <div style={{margin: '50px'}}>
                    <select onChange={this.props.handleChange} name="iconColour" value={this.props.iconColour}>
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
