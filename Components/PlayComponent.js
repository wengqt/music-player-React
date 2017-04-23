/**
 * Created by weng on 2017/3/31.
 */

import React from 'react';
import Slider from 'material-ui/Slider';
import FlatButton from 'material-ui/FlatButton';

export default class PlayComponent extends React.Component{
    constructor(props){
        super(props);


    }








    render(){
        return(

            <div>
                <div style={{height:10}}>
                    {this.props.currMusic!="default"?this.props.currMusic:null}
                </div>
                <div style={{width:'25%',display:'inline-block',float:'left',height:'50px'}}>
                    <FlatButton label="<" primary={true} />
                    <FlatButton label={this.props.isPlaying?'||':'|>'} primary={true} onTouchTap={()=>this.props.controlPlay()}/>
                    <FlatButton label=">" primary={true} />
                </div>
                <div style={{width:'65%',display:'inline-block',height:'50px',float:'left'}}>
                    <Slider disabled={!this.props.isPlaying} />
                </div>

            </div>
        )
    }




}

