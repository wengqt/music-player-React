/**
 * Created by weng on 2017/3/30.
 */

import React from 'react';
import AppBar from 'material-ui/AppBar';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';


export  default class AppBarComponent extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <MuiThemeProvider muiTheme = {getMuiTheme(darkBaseTheme)}>
                <AppBar
                    title="MyMusic"
                    iconElementLeft={<span></span>}
                />
            </MuiThemeProvider>
        );
    }

}
