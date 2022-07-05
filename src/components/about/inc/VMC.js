import React from 'react';
import '../AboutUs.css'

function VMC(){
//this is footer for about us
    return(
            <div class="row center">  
                <div class="col s4">

                    <h6 style={{fontSize:"30px", color: "white"}}> Our Vision</h6>
                    <div className="underline mx-auto center"></div>
                    <p style={{fontSize:"20px", color: "gray"}}>
                            Using Technology to bring People closer and make their lives easier.
                    </p>
                </div>
                <div class="col s4">
                    <h6 style={{fontSize:"30px", color: "white"}}> Our Motto</h6>
                    <div className="underline mx-auto center"></div>
                    <p style={{fontSize:"20px", color: "gray"}}>
                            A journey of a thousand miles starts with a single step!
                    </p>

                </div>
                <div class="col s4">
                    <h6 style={{fontSize:"30px", color: "white"}}> Our Values</h6>
                    <div className="underline center"></div>
                    <p style={{fontSize:"20px", color: "gray"}}> 
                            Safety, Convenience and Affordability
                    </p>
                </div>

            </div>
    );

}

export default VMC;




























