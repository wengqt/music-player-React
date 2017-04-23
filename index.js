/**
 * Created by weng on 2017/3/30.
 */
import React from 'react';
import ReactDom from 'react-dom';
import AppBar from './Components/AppBar';
import injectTapEventPlugin from 'react-tap-event-plugin';
import PaperComponent from './Components/PaperComponent'


injectTapEventPlugin();
ReactDom.render(
    <div>
        <AppBar/>
        <PaperComponent style={{margin:"0 auto"}} />
    </div>,document.getElementById("root")

);
