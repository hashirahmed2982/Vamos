import React from 'react';
import '../AboutUs.css'
import img1 from "../images/vamos1.png";

function Slider (){
    return(
        <div className="row center">
            <div className="col s12 ">
            <div className="card ">
                <div className="card-image">
                <img src={img1} />
                
            </div>
            </div>
        </div>
        </div>
    );
}

export default Slider;