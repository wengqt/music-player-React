/**
 * Created by weng on 2017/3/30.
 */

import React from 'react';
import Paper from 'material-ui/Paper';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MusicList from './MusicList'
import RoundPaperComponent from './RoundPaperComponent';
import PlayComponent from './PlayComponent';
import {get,post} from "../http/http"
import axios from 'axios';

export default class PaperComponent extends React.Component{
    constructor(props){
        super(props);
        this.style = {
            height:800,
            width: "90%",
            margin: "2% 5%",
            textAlign: 'center',
            display: 'inline-block',

        };
        this.state= {
            musicList:[{songName:"演员",singerName:"薛之谦"},{songName:"绅士",singerName:"薛之谦"},{songName:"丑八怪",singerName:"薛之谦"}],
            currentMusic: "default",
            isPlaying:false,
            isLoading:false,

        };
        this.stopTime = 0;
        this.beforeTime = 0;
        window.cxt = new AudioContext();
        window.source = null;
        window.audioBuffer = null;

    }

    handleChangeMusic(curMusic){
        this.state.currentMusic=curMusic;
        this.setState({
            currentMusic:curMusic,
            isPlaying:true,
            isLoading:true,
        });


    }
    handlePlay(){
        let url = '../music/'+this.state.currentMusic+'.mp3';
        if(!window.AudioContext){
            alert('您的浏览器不支持AudioContext');

        }else {
            if(this.state.isPlaying) source.stop();
            axios({
                method:'get',
                url:url,
                responseType:'arraybuffer'
            })
                .then((response) => {

                    cxt.decodeAudioData(response.data,  (buffer)=> {

                        audioBuffer = buffer;
                        this.decodePlayMusic();

                        this.curLoadMusic = audioBuffer;
                        this.setState({isLoading:false});

                    },function (e) {
                        console.info('处理出错');
                    });

                });
        }
    }
    decodePlayMusic(){

        let sTime = this.stopTime;
        source = cxt.createBufferSource();
        let gainNode=  cxt.createGain();
        gainNode.connect(cxt.destination);
        source.buffer = audioBuffer;
        source.connect(gainNode);
        console.log(source.playbackRate);
        source.start(0,sTime%audioBuffer.duration);


    }
    handleControlplay(stop){

        this.stopTime = stop||cxt.currentTime-this.beforeTime;
        console.log(stop);
        if(this.state.isPlaying){
            source.stop();

        }else{

        }



    }



    render(){
        return(
            <MuiThemeProvider muiTheme = {getMuiTheme(darkBaseTheme)}>
                <Paper style={this.style} zDepth={2} children={
                    <div>
                        <div>
                            <div style={{width:"30%",display:"inline-block",float:"left",marginTop:"50px"}}>
                                <MusicList musicList={this.state.musicList} handleChangeMusic={(currMusic)=>this.handleChangeMusic(currMusic)} currentMusic={this.state.currentMusic} MusicPlay = {()=>this.handlePlay()} isLoading = {this.state.isLoading}/>
                            </div>
                            <div style={{width:"65%",display:"inline-block"}}>
                                <RoundPaperComponent musicList={this.state.musicList} currentMusic={this.state.currentMusic}/>
                            </div>
                        </div>
                        <div>
                            <PlayComponent currMusic={this.state.currentMusic} isPlaying={this.state.isPlaying} controlPlay = {(stop)=>this.handleControlplay(stop)}/>
                        </div>
                    </div>
                }/>
            </MuiThemeProvider>

        );
    }


}