//React
import React, { useState, useEffect } from 'react';
import * as ReactDOM from 'react-dom';


function DatetimeDisplay(props:any) {

    const [currentDateValue, setCurrentDateValue] = React.useState({ 
        datevalue: new Date(props.initialValue)
      });
    
    useEffect(() => {
        setCurrentDateValue({datevalue:new Date(props.initialValue)});
      }, []);
    
    let curDate:Date = currentDateValue.datevalue;
    if(curDate == null || curDate.toString() == "Invalid Date") {
        curDate = new Date();
    }

    var isoDateTime = new Date(curDate.getTime() - (curDate.getTimezoneOffset() * 60000)).toISOString(); //for local timezone
    let scurDate = isoDateTime.substring(0, 10); //yyyy-mm-dd;
    
    function onchangefunction(param:any) {
        let newval = new Date(param.currentTarget.value);
        newval.setTime(newval.getTime() + 1 * 60 * 60 * 1000);
        props.theobj.newvalue = newval;
        setCurrentDateValue({datevalue:newval});
        console.log("onchangefunction set " + newval.toDateString());
        props.onchange();
    }

    //Calculate Diff
    let today = new Date();
    let diff = curDate.getTime() - today.getTime();
    let diffDays = Math.round(diff/(1000*60*60*24));
    let diffHours = Math.round(diff/(1000*60*60));
    console.log("diffDays: " + diffDays.toString());

    //Set color
    let scolor="gainsboro";
    if(diffDays>10) {
        scolor="gainsboro";
    }
    else if(diffDays>0) {
        scolor="aquamarine";
    }
    else {
        scolor="aquamarine";
    }

    //Set text
    let diffText = diffDays + " days";
    if(diffHours<24) {
        diffText = diffHours + " hours";
    }
    if(diffHours>0) {
        diffText = "T - " + diffText;
    }
    else if(diffHours<0){
        diffText = "T + " + diffText;
    }

    let todayStr = today.getFullYear()+"-"+today.getMonth()+"-"+today.getDate();
    let dateStr = curDate.getFullYear()+"-"+curDate.getMonth()+"-"+curDate.getDate();
    
    if(todayStr==dateStr) {
        diffText = "today";
        scolor = "lightblue";
    }
    else {
        if(diffHours<0){
            scolor="lightgreen";
            diffText="completed";
        }
    }
    
    //Set style
    let daysStyle = {fontSize:"50px", color:"cornsilk", backgroundColor:scolor, width:"97%", margin: "0px", marginLeft:"0px", padding:"0px", paddingLeft:"5px", border:"1px solid!important"};
    let inputStyle = {width:"97%"};
    let containerStyle1 = {width:"100%"};

    let datefieldName = "dateTimeDisplayPCF_dateField_" + Math.floor(Math.random() * 1000).toString();
    return (
        <div style={containerStyle1}>
            <input type="date" id={datefieldName} style={inputStyle} defaultValue={scurDate} onChange={onchangefunction}></input>
            <p style={daysStyle}>{diffText}</p>
        </div>
    );
}

export function Render(context:any, container:any, theobj:object, onchangefunction:any, initialValue:any) {
    ReactDOM.render(
            <div><DatetimeDisplay context={context} theobj={theobj} onchange={onchangefunction} initialValue={initialValue} /></div>
        , container
      );
}

