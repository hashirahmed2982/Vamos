/*import React, { Component } from 'react';
import storage from './firebase';

class Upload extends Component {

    state = {
        image: "",
    }
    
    setImage = (e) => {
        this.setState({
            name: e,
        })
    }
    upload = ()=>{
        if(this.state.image == null)
            return;
        storage.ref(`/images/${this.state.image}`).put(this.state.image)
        .on("state_changed" , alert("success") , alert);
    }
  
    render() {
        return (
            <div className="App">
                <center>
                <input type="file" onChange={(e)=>{this.setImage(e.target.files[0])}}/>
                <button onClick={this.upload}>Upload</button>
                </center>
            </div>
        );
    }
    
}
  
export default Upload;*/