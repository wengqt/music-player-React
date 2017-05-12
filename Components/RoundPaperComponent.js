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



        this.state={
            showPic:true
        }



    }
    handleClick(){
        if(this.props.isPlaying){
            this.setState({
                showPic:!this.state.showPic
            })
        }

    }

    render(){
        return(
            <div>
            <Paper style={{

                display: this.state.showPic?'inline-block':'none',
                animationPlayState:this.props.isPlaying?"running":"paused",
                webkitAnimationPlayState:this.props.isPlaying?"running":"paused"
            }} zDepth={4} className="ani" children={
                    <Paper className="smallCir" zDepth={1} circle={true} children={
                        <img className="smallImg" src={'./music/'+this.props.currentMusic+'.jpg'}  style={{textAlign: 'center',}}/>
                    }/>
                } circle={true} onTouchTap={()=>this.handleClick()}
            />
                <div className="lrc" onTouchTap={()=>this.handleClick()} style={{display: this.state.showPic?'none':'inline-block',}}>
                    {this.props.curLrc}
                </div>
            </div>
        );
    }




}
