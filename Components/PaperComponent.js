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

let timeInterval = null;
let lrcObj ={};

if('webkitAudioContext' in window) {
    window.cxt = new webkitAudioContext();
}else{
    window.cxt = new AudioContext();
}
export default class PaperComponent extends React.Component{
    constructor(props){
        super(props);
        this.style = {
            height:650,
            width: "90%",
            margin: "2% 5%",
            textAlign: 'center',
            display: 'inline-block',

        };
        this.state= {
            musicList:[{songName:"演员",singerName:"薛之谦",idx:0},{songName:"绅士",singerName:"薛之谦",idx:1},{songName:"丑八怪",singerName:"薛之谦",idx:2}],
            currentMusic: "default",
            isPlaying:false,
            isLoading:false,
            runTime:0,
            sourceLength:100,
            curIdx:-1,
            gainValue:0.5

        };


        window.source = null;
        window.audioBuffer = null;
        window.gainNode=  cxt.createGain();


    }
    componentWillUnmount(){
        clearInterval(timeInterval);
    }
    handleChangeMusic(curMusic,idx){
        console.log(curMusic)
        console.log(idx)
        this.state.currentMusic=curMusic;
        this.setState({
            currentMusic:curMusic,
            isPlaying:true,
            isLoading:true,
            curIdx:idx
        });


    }
    handlePlay(){
        let url = '../music/'+this.state.currentMusic+'.mp3';
        let lrcUrl ='../music/'+this.state.currentMusic+'.lrc';
        if(!window.AudioContext & !window.webkitAudioContext){
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
                        clearInterval(timeInterval);

                        audioBuffer = buffer;



                        this.setState({
                            runTime:0,
                        });
                        this.decodePlayMusic();
                        this.setState({

                            isLoading:false,
                            sourceLength:source.buffer.duration
                        });
                    },function (e) {
                        console.info('处理出错');
                    });

                });
            axios({
                method:'get',
                url:lrcUrl
            })
                .then((res)=>{
                    console.log(res);
                    let lrc = res.data.split("\n");

                    for(let i=0;i<lrc.length;i++){
                        let lyric = decodeURIComponent(lrc[i]);
                        let timeReg = /\[\d*:\d*((\.|\:)\d*)*\]/g;
                        let timeRegExpArr = lyric.match(timeReg);
                        if(!timeRegExpArr)continue;
                        let context = lyric.replace(timeReg,'');

                        for(let k = 0,h = timeRegExpArr.length;k < h;k++) {
                            let t = timeRegExpArr[k];
                            let min = Number(String(t.match(/\[\d*/i)).slice(1)),
                                sec = Number(String(t.match(/\:\d*/i)).slice(1));
                            let ltime = min * 60 + sec;
                            lrcObj[ltime] = context;
                        }
                    }
                    console.log(lrcObj);
                })

        }
    }
    decodePlayMusic(){
        this.setState({
            isPlaying:true
        })  ;
        let sTime = this.state.runTime;
        source = cxt.createBufferSource();



        source.buffer = audioBuffer;

        source.connect(gainNode);
        gainNode.connect(cxt.destination);
        // console.log(source.playbackRate);
        // console.log(sTime);
        source.start(0,sTime%source.buffer.duration);

        timeInterval= setInterval(
            ()=>{
                if(this.state.isPlaying){

                    this.setState({
                        runTime : this.state.runTime+0.3,
                        curLrc : lrcObj[Math.round(this.state.runTime)]?lrcObj[Math.round(this.state.runTime)]:this.state.curLrc
                    });

                     if(this.state.runTime>=this.state.sourceLength){
                         this.setState({
                             runTime : 0
                         })
                         this.handleNext();
                     }
                }
            },300
        )


    }
    handleControlplay(stop){
        if(this.state.currentMusic == 'default'){
            this.handleNext();
        }else{
            if(stop){
                clearInterval(timeInterval);
                source.stop();
                this.setState({
                    runTime:stop
                });
                this.decodePlayMusic();
            }else{
                if(this.state.isPlaying){
                    clearInterval(timeInterval);
                    source.stop();
                    this.setState({
                        isPlaying:!this.state.isPlaying
                    })  ;

                }else{
                    this.decodePlayMusic();
                }
            }
        }


    }
    handleChangeVoice(value){
        this.setState({
            gainValue:value
        })
        gainNode.gain.value = value;
    }
    handleNext(){
        let id=this.state.curIdx+1;
        if(id>=this.state.musicList.length){
            id=0;
        }
        let nextMusic = this.state.musicList[id];
        // console.log(id);
        this.handleChangeMusic(nextMusic.songName,id);
        this.handlePlay();
    }
    handlePre(){
        let id=this.state.curIdx-1;
        if(id<0){
            id=this.state.musicList.length-1;
        }
        let nextMusic = this.state.musicList[id];
        // console.log(id);
        this.handleChangeMusic(nextMusic.songName,id)
        this.handlePlay();
    }






    render(){
        return(
            <MuiThemeProvider muiTheme = {getMuiTheme(darkBaseTheme)}>
                <Paper style={this.style} zDepth={2} children={
                    <div>
                        <div>
                            <div style={{width:"30%",display:"inline-block",float:"left",marginTop:"50px"}}>
                                <MusicList musicList={this.state.musicList} handleChangeMusic={(currMusic,idx)=>this.handleChangeMusic(currMusic,idx)} currentMusic={this.state.currentMusic} MusicPlay = {()=>this.handlePlay()} isLoading = {this.state.isLoading}/>
                            </div>
                            <div style={{width:"65%",display:"inline-block"}}>
                                <RoundPaperComponent musicList={this.state.musicList} currentMusic={this.state.currentMusic} curLrc = {this.state.curLrc} isPlaying={this.state.isPlaying}/>
                            </div>
                        </div>
                        <div>
                            <PlayComponent
                                currMusic={this.state.currentMusic}
                                isPlaying={this.state.isPlaying}
                                controlPlay = {(stop)=>this.handleControlplay(stop)}
                                runTime = {this.state.runTime}
                                sourceTime = {this.state.sourceLength}
                                nextMusic ={()=>this.handleNext()}
                                preMusic ={()=>this.handlePre()}
                                handleChangeVoice={(value)=>this.handleChangeVoice(value)}
                                gainValue  = {this.state.gainValue}/>
                        </div>
                    </div>
                }/>
            </MuiThemeProvider>

        );
    }


}