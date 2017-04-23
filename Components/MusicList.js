/**
 * Created by weng on 2017/3/30.
 */
import React from 'react';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';





export default class ListExampleSimple extends React.Component{
    constructor(props){
        super(props);

    }
    handleChange(cur){

        if(this.props.currentMusic==cur) {


        }else{
            this.props.handleChangeMusic(cur);
            if(!this.props.isLoading){
                this.props.MusicPlay();

            }
        }

    }

    render(){
        return(
            <div>
                <Subheader>Music</Subheader>
                <Divider />
                <List>

                    {
                    this.props.musicList.map((item,indx)=><ListItem primaryText={item.songName} key={indx} onTouchTap={()=>this.handleChange(item.songName)}/>)
                }




                </List>

            </div>
        );
    }
}



