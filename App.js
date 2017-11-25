import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

function GirdCell(props) {
  var style = 
  {
    width: 20,
    height: 20,
    backgroundColor: props.cell,
    borderRadius: 3,
    borderWidth: 0.5,
    borderColor: "#d6d7da" 
  };
  return <View style={style} />;
}

function GridRow(props) {
  return <View >
          {
            props.row.map( (cell, index) => {
              return <GirdCell key={index} cell={cell} />;
            })
          }
        </View>;
}

function GirdScreen(props) {
  var style = { flex: 1, flexDirection: "row" };
  return <View style={style}>
      {
        props.gird.map( (row, index)=>{
          return <GridRow key={index} row={row} />;
        })
      }
    </View>;
}

class Game extends React.Component {
  constructor(props){
    super(props);
    var gird = [];
    for (let i = 0; i < 30; i++) {
      gird.push(new Array(30).fill('steelblue'));
    }
    this.state = {gird:gird}
  }
  
  render() {
    return <GirdScreen gird = {this.state.gird}/>;
  }
}

export default Game;