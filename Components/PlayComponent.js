/**
 * Created by weng on 2017/3/31.
 */

import React from 'react';
import Slider from 'material-ui/Slider';
import FlatButton from 'material-ui/FlatButton';

export default class PlayComponent extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            runTime :0,
            sourceLength:0
        }

    }

    componentWillReceiveProps(){
        this.setState({
            runTime :this.props.runTime,
            sourceLength:this.props.sourceTime
        })
    }
    handleProcessChange(e,value){
        this.props.controlPlay(value);

    }

    showTime(time){
        if(time == 100){
            var min = '00';
            var sec = '00';
        }else{
            var min=0;
            var sec=0;
            sec = Math.round(time);

            exchangetime();

            function exchangetime() {
                if(sec>=60){
                    min++;
                    sec=sec-60;
                    exchangetime();
                }
            }
            if(min.toString().length ==1){
                min = '0'+min
            }
            if(sec.toString().length ==1){
                sec = '0'+sec
            }
        }

        return {min:min,sec:sec}

    }
    handleVoice(e,value){
        this.props.handleChangeVoice(value);
    }



    render(){
        let standerdTime  =this.showTime(this.props.runTime);
        let standerdLength =this.showTime(this.props.sourceTime);
        return(

            <div>
                <div style={{height:20}}>
                    {this.props.currMusic!="default"?this.props.currMusic:null}
                </div>
                <div className="play">
                    <div className="threeAndVoice" >
                        <div className="threeButton">
                            <FlatButton label="<" primary={true} onTouchTap={()=>this.props.preMusic()} />
                            <FlatButton label={this.props.isPlaying?'||':'|>'} primary={true} onTouchTap={()=>this.props.controlPlay()}/>
                            <FlatButton label=">" primary={true} onTouchTap={()=>this.props.nextMusic()}/>
                        </div>
                        <div style={{width:'80%',marginLeft:"10%"}}>
                            <Slider defaultValue = {this.props.gainValue}  min={0} max={1} onChange={(e,value)=>this.handleVoice(e,value)} />
                        </div>

                    </div>
                    <div style={{width:'65%',display:'inline-block',height:'50px'}}>
                        <Slider disabled={!this.props.isPlaying} value = {this.props.runTime}  min={0} max={this.props.sourceTime} onChange={(e,value)=>this.handleProcessChange(e,value)} />
                        <p style={{textAlign:"center",marginTop:0}}>{standerdTime.min}:{standerdTime.sec}/{standerdLength.min}:{standerdLength.sec}</p>
                    </div>
                </div>


            </div>
        )
    }




}

