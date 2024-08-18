import React from 'react';
import Tilt from 'react-parallax-tilt';
import './Logo.css'
import brain from './brain.png'

const Logo= ()=>{
    return(
        <div className='ma4 mt0'>
            <Tilt className='Tilt br2 shadow-2 ' style={{width: 150}} options={{max: 55}}>
                <div className='Tilt-inner pa3' >
                   <img style={{height: '100px', width: '100px'}} alt='brain logo'src={brain}/>
                </div>
             </Tilt>
        </div>
    );

}


export default Logo;