/**
 * Created by weng on 2017/3/30.
 */

import React from 'react';
import Paper from 'material-ui/Paper';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';


export default class RoundPaperComponent extends React.Component{
    constructor(props){
        super(props);
        this.circleStyle={
                height:300,
                width: 300,
                margin: "10% 5%",
                textAlign: 'center',
                display: 'inline-block'
            };

        this.smallCircleStyle ={
            height:150,
            width: 150,
            textAlign: 'center',
            display: 'inline-block',
            margin:75,
            overflow:"hidden"
        };




    }
    render(){
        return(
            <Paper style={this.circleStyle} zDepth={4} className="ani" children={
                <Paper style={this.smallCircleStyle} zDepth={1} circle={true} children={
                    <img src={'./music/'+this.props.currentMusic+'.jpg'}  style={{height:150, width: 150, textAlign: 'center',}}
                    />}
                />} circle={true}
            />
        );
    }




}
