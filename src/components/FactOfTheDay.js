import '../App.css';
import React from 'react';
import { connect } from  'react-redux';

class FactOfTheDay extends React.Component {
    render() {
        const facts = [
            {
                fact: "The world’s largest performing rock band included 953 musicians.",
                description: "The Beijing Contemporary Music Academy achieved this record on June 16, 2016. They performed in the city of Tianjin, China. The band included 349 singers, 154 guitarists, and 151 drummers. 100 bassists also took part in the performance, along with 100 keyboard players, and 98 players of wind instruments."
            },
            {
                fact: "Japan’s Folk Music and Dance Association assembled the world’s largest shamisen ensemble.",
                description: "The shamisen is a traditional Japanese musical instrument that looks like a violin. The 1,911 participants all used the Tsugaru Shamisen in their performance. It took place in Tokyo, Japan, on October 23, 2016, and lasted 6 minutes and 5 seconds."
            },
            {
                fact: "Simon Desorgher assembled the most number of chimes as a single musical instrument.",
                description: "Also known as tubular bells, Simon Desorgher’s instrument included 120 aluminum tubes. The tubes have various lengths tuned to musical scales. The longest tube measures 4,877 mm long, while the shortest is 473 mm long."
            },
            {
                fact: "David Stanley and The Music Man Project assembled the world’s biggest triangle ensemble.",
                description: "The triangle is a musical instrument made by bending a metal bar into a triangle. It’s played by tapping the triangle with a metal rod. The ensemble included 1,521 players on October 15, 2017. They performed as part of the London Palladium’s Music is Magic concert."
            },
            {
                fact: "The world’s longest concert by multiple artists took place from March 17 to April 5, 2017.",
                description: "The concert was part of Canada’s celebration of their country’s 150th anniversary. Participants included the Epidemic Music Group. It lasted  for 453 hours, 54 minutes, and 40 seconds."
            },
            {
                fact: "The song Despacito holds seven world records of its own.",
                description: "We mentioned Daddy Yankee’s performance in the hit song Despacito only a short while ago. Well, like its performer, the song has world records of its own. Despacito holds the record for the world’s most viewed online video. It is also the most viewed music video online, and the most viewed duet YouTube video."
            },
            {
                fact: "Elvis Presley is still the best-selling solo artist in the world.",
                description: "We’re sure you’ve heard of Elvis Presley, also known as the King of Rock and Roll. You might also think of him as old-fashioned, as the height of his career was from the 1950s to the 1960s. And by then, his glory days were long past. Well, here’s a surprise among music facts for you. With over 1 billion sales worldwide, the King is still the best-selling solo artist in the world. And he’s not as old-fashioned as you might think. Ever heard of the song Can’t Help Falling in Love? Yeah, Elvis sang that."
            },
            {
                fact: "There are 8 notes in music.",
                description: "You could call notes the alphabet of music. They’re used to write notations which tell musicians how to perform a piece. There are 8 notes, though there are two ways to read the first seven. In most countries, they’re read as Do-Re-Mi-Fa-Sol-La-Si. In Britain and Holland, they are instead substituted with the first 7 letters of the alphabet. The eighth note is always called the octave."
            },
            {
                fact: "There are five types of musical instruments.",
                description: "How to play these five types of musical instruments? Percussion instruments are struck. String instruments have their strings strummed. Both woodwind and brass instruments get blown. Keyboard instruments have their keys pressed."
            },
            {
                fact: "Music began to step away from religion in the Renaissance.",
                description: "Music in the Middle Ages was predominantly for use in church services. The Renaissance changed all that. The printing press made it easier to produce and spread musical compositions. This was unlike the Middle Ages, where everything was handmade. The Renaissance also saw the rise of Humanism. Under its influence, musicians experimented with new instruments and styles. Musical pieces moved away from religious themes to secular ones. The most important of those was opera, born as a Renaissance revival of Ancient Greek theater."
            }
        ]
        
        const randomElement = new Date().getDate() % facts.length;
        return(
            <div style={{marginBottom: '80px'}}>
                <h4 style={{textAlign: 'left', marginLeft: '15px'}}>Music Fact Of The Day</h4>
                <div className="factOfTheDayCard">
                    <p style={{marginBottom: '30px', fontSize: '21px', color: '#01961a'}}>{facts[randomElement].fact}</p>
                    <p>{facts[randomElement].description}</p>
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

export default connect(mapStateToProps)(FactOfTheDay);
