import React, {Component} from 'react';
import './App.css';
//import Clarifai from 'clarifai';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition'
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank';
import Signin from './Components/Signin/Signin'
import Register from './Components/Register/Register'

import AppParticles from './Components/Particles/Particles';
//import { useEffect, useMemo, useState } from "react";
//import Particles, { initParticlesEngine } from "@tsparticles/react";
//import { loadSlim } from "@tsparticles/slim";
//NIUEVO//
//const app = new Clarifai.App({
  //apiKey: 'da25080a0f594fbfb117ffb83bcaaf1b'
 //});
 ///////////////////////////////////////////////////////////////////////////////////////////////////
    // In this section, we set the user authentication, user and app ID, model details, and the URL
    // of the image we want as an input. Change these strings to run your own example.
    //////////////////////////////////////////////////////////////////////////////////////////////////

    // Your PAT (Personal Access Token) can be found in the Account's Security section
  const returnClarifaiRequestOptions= (imageUrl)=>{
    const PAT = '21667652913c4147be6abf57dbb3ea9c';
    // Specify the correct user_id/app_id pairings
    // Since you're making inferences outside your app's scope
    const USER_ID = 'natalykodes';       
    const APP_ID = 'test';
    // Change these to whatever model and image URL you want to use
    const MODEL_ID = 'face-detection';
    
    const IMAGE_URL = imageUrl; 
    const raw = JSON.stringify({
      "user_app_id": {
          "user_id": USER_ID,
          "app_id": APP_ID
      },
      "inputs": [
          {
              "data": {
                  "image": {
                      "url": IMAGE_URL
                  }
              }
          }
      ]
  });
 const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Authorization': 'Key ' + PAT
    },
    body: raw
};
  return requestOptions
  }


        //ANTERIOR//
const initialState={
    input: '',
    imageUrl: '',
    box: {},
    route: 'Signin',
    isSignedIn: false,
    user:{
      id: "",
      name: '',
      email: '',
      password: '',
      entries: '0',
      joined: ''
    }
  }

class App extends Component {

  constructor(){
    super();
    this.state= initialState
  }

  loadUser=(data)=>{
    this.setState({user:{
      id: data.id,
      name: data.name,
      email: data.email,
      password: data.password,
      entries: data.entries,
      joined: data.joined
    }})
  }
  calculateFaceLocation =(data)=>{
    const clarifaiFace= data.outputs[0].data.regions[0].region_info.bounding_box
    const image= document.getElementById('inputImage');
    const width= Number(image.width);
    const height= Number(image.height);
    console.log(width, height);
    return{
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height),
    }
  }


  displayFaceBox= (box)=>{
    console.log(box);
    this.setState({box: box})
  }

  onInputChange= (event)=>{
    this.setState({input: event.target.value})
  }
//ESTE ES ES EL NUEVO
//new new
onButtonSubmit = () => {
  this.setState({ imageUrl: this.state.input });

  fetch("https://api.clarifai.com/v2/models/" + 'face-detection' + "/outputs", returnClarifaiRequestOptions(this.state.input))
    .then(response => response.json())
    .then(response => {
      console.log("hi", response);
      if (response) {
        fetch('http://localhost:1000/image', { 
          method: 'put',
          headers: {'Content-type': 'application/json'},
          body: JSON.stringify({
              id: this.state.user.id
        })
      })
        .then(response=>response.json())
        .then(count=>{
          this.setState(Object.assign(this.state.user, {entries:count}))
          })
          .catch(console.log)
        }
        this.displayFaceBox(this.calculateFaceLocation(response));
      
    })
    .catch(err => console.log(err));
};
/*onButtonSubmit= ()=>{
  this.setState({imageUrl: this.state.input});
  //app.models.predict('face-detection', this.state.input)
  
  fetch("https://api.clarifai.com/v2/models/" + 'face-detection' + "/outputs", returnClarifaiRequestOptions(this.state.input))
      .then(response => response.json())
      .then(response=>{ //here is the other missing parenthesis
        console.log("hi", response)
        if (response){
          fetch('http://localhost:3000/image',{
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
              })
          })
        .then(response=>response.json())
        //.then(response=>this.displayFaceBox(this.calculateFaceLocation(response)))
        //.catch(err=>console.log(err)); 
      .then(count=>{
        this.setState(Object.assign(this.state.user,{entries:count}))
      })
    }
      this.displayFaceBox(this.calculateFaceLocation(response))
    })
      .catch(err=>console.log(err)); 
      } */ 

onRouteChange= (route)=>{
  if(route==='signout'){
    this.setState(initialState)
  } else if (route=== 'home'){
    this.setState({isSignedIn: true})
  }
  this.setState({route: route}); //CHAT antes "route"
}



  /*onButtonSubmit= ()=>{ ESTE ES EL MIO
    this.setState({imageUrl: this.state.input});
    //app.models.predict('face-detection', this.state.input)
    
    fetch("https://api.clarifai.com/v2/models/" + 'face-detection' + "/outputs", returnClarifaiRequestOptions(this.state.input))
        .then(response => response.json())
        .then(response=>this.displayFaceBox(this.calculateFaceLocation(response)))
        .catch(err=>console.log(err)); 
  }
  onRouteChange= (route)=>{
    if(route==='signout'){
      this.setState({isSignedIn: false})
    } else if (route=== 'home'){
      this.setState({isSignedIn: true})
    }
    this.setState({route: route}); //CHAT antes "route"
  }*/
   render(){
    const {isSignedIn, imageUrl, route, box}= this.state
      return (
        <div className="App">
          <AppParticles className='particles'
            //id="tsparticles"
            //particlesLoaded={particlesLoaded}
            //options={particleOptions}
          />
    
          <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
          { route === 'home' 
            ? 
            <div><Logo />
                  <ImageLinkForm 
                  onInputChange={this.onInputChange} 
                  onButtonSubmit={this.onButtonSubmit}/>
                  <Rank name={this.state.user.name} entries={this.state.user.entries}      />
                  <FaceRecognition box={box} imageUrl={imageUrl}/>
          </div>
            : (
              route === 'Signin' 
              ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/> //chat antes this.setState.
              : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            ) 
          }
        </div>
      );
    }
      
    
  };


export default App;
