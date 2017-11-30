import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <h1 className="App-title">Welcome to React</h1>
//         </header>
//         <p className="App-intro">
//           To get started, edit <code>src/App.js</code> and save to reload.
//         </p>
//       </div>
//     );
//   }
// }

//function App(props){
//  return <div>dan rocks</div>
//}

class WeeDiv extends React.Component{
  render(){
      let cl = "wee";
      if(this.props.c==="green"){
        cl = "wee green";
      }
      return(<div className={cl}></div>)
  }
}


class App extends React.Component{
  constructor (){
    super();
    this.timer =this.timer.bind(this);
    this.stop =this.stop.bind(this);
    this.handlekeydown = this.handlekeydown.bind(this)
    //this.state.arr =new [][];
    this.state={arr : [],    
      x:10,
      y:10,
      d:"down",
      rate:1000,

    };

    for (var i=0 ;i<20 ; i++){
        const col = [];
        for (var j=0 ;j<30 ; j++){
            col.push(0);
        }          
        this.state.arr.push(col);
    }
    
    console.log("constructor time")
  }

  componentWillMount() {
    document.addEventListener("keydown",this.handlekeydown.bind(this));
  }

  componentWillUnMount() {
    clearInterval(this.state.intervalId);
  }

  componentDidMount() {
    
    var intervalId = setInterval(this.timer, this.state.rate);
    // store intervalId in the state so it can be accessed later:
    this.setState({intervalId: intervalId});
  }

  timer() {
    
    var newR = JSON.parse(JSON.stringify(this.state.arr));
    var newY = this.state.y;
    var newX =this.state.x;
    
    switch (this.state.d) {
      case "left":
      newX = this.state.x -1;
      break;
      case "up":
      newY = this.state.y -1;
      break;
      case "right":
      newX = this.state.x +1;
      break;
      case "down":
      newY = this.state.y +1;
        break;
    }
    

    var newRate = this.state.rate<51?this.state.rate:this.state.rate-50;
    newR[this.state.y][this.state.x]=1;    
    console.log(this.state.d);
    this.setState({y: newY, x:newX, rate:newRate,arr:newR});
 
  
    //clearInterval(this.state.intervalId);
    //var intervalId = setInterval(this.timer, this.state.rate);
   
    //this.setState({intervalId: intervalId});
  }

stop(){
  clearInterval(this.state.intervalId);

}

handlekeydown(event){
  console.log(event.keyCode);
  switch (event.keyCode) {
    case 37:
    this.setState({d:"left"});
    break;
    case 38:
    this.setState({d:"up"});
    break;
    case 39:
    this.setState({d:"right"});
    break;
    case 40:
    this.setState({d:"down"});
    break;
    default:
      break;
  }
}

  render(){
    const r = this.state.arr;
    var row = [];

    for(var i=0; i<r.length; i++ ){   
      const col = []; 
       for (var j=0 ;j<r[i].length ; j++){
        if(r[i][j]===0){
          col.push(<WeeDiv c='red'  key={i+"_"+j}  />);  
          
          }
          else{
            col.push(<WeeDiv c='green' key={i+"_"+j} />);  
          }
          
        
      }   
      row.push(<br key={i}/>);
      row.push(col);
    }    

    return (
    
    <div>  
    <button onClick={this.stop}>stop</button>
      {row}
         </div>);

  }

}

export default App;
//ReactDOM.render(<App />, document.getElementById('root'));
//registerServiceWorker();
