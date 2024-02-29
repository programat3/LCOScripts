if(data.series[0].fields.length > 1){
  severity = data.series[0].fields[2].values;
  code = data.series[0].fields[0].values;
  message = data.series[0].fields[1].values;
  subsystem = data.series[0].fields[3].values;
  ts = data.series[0].fields[4].values;
  allSubsystems = data.series[1].fields[0].values;
}

else{
  severity = ['No Data']
  code = ['No Data'];
  message = ['No Data'];
  subsystem = ['No Data'];
  ts = ['No Data'];
}

timeStamp = ts.map(function (value, index){
  timeFormatted = (new Date(value)).toUTCString()
  return timeFormatted
});

var valuesAll = [code,
          message,
          severity,
          subsystem,
          timeStamp            
          ];
selected_severity = ''


var tableAll = {
  type: 'table',
  visible: 'true',
  header: {
    values: [["<b>Code</b>"], ["<b>Message</b>"],
				 ["<b>Severity</b>"], ["<b>Subsystem</b>"], ["<b>ts</b>"]],
    align: "center",
    line: {width: 1, color: 'black'},
    fill: {color: "grey"},
    font: {family: "Arial", size: 20, color: "white"}
  },
  cells: {
    values: valuesAll,
    align: "center",
    fill: {
      color: [getColor(severity)]
    },
    line: {color: "black", width: 1},
     font: {family: "Arial", size: 14, color: ["black"]},
    height: 30
  },

}

function getColor(arr) 
{  var colors = arr.map(function(val, index){
    var color = '';
    switch(val){
      case 'info':
        color = 'skyblue';
        break;
      case 'warning':
        color = 'orange';
        break;
      case 'error':
        color = 'red';
        break;
      default:
        color = 'white';
        break;
    }
    return color
  })
  return colors
}

function getSpecificSubsystem(arr, subsystemV){
  vals = arr.map(function (val, index){
    if(subsystemV == ''){
      return val
    }
    else if(subsystem[index].includes(subsystemV)){
      return val
    }
  });
  final_vals = vals.filter(function( element ) {
   return element !== undefined;
  });

  if(final_vals.length > 0){
    return(final_vals)
  }
  else{
    return(['No Data'])
  }
}


function generateData(subsystemV){ 
    codeS = getSpecificSubsystem(code, subsystemV)
    messageS = getSpecificSubsystem(message, subsystemV)
    severityS = getSpecificSubsystem(severity, subsystemV) 
    subsystemS = getSpecificSubsystem(subsystem, subsystemV)
    timeStampS = getSpecificSubsystem(timeStamp, subsystemV)

    valuesS = [codeS, messageS, severityS, subsystemS, timeStampS]
    
    cells = {
        values: valuesS,
        align: "center",
        fill: {
          color: [getColor(severityS)]
        },
        line: {color: "black", width: 1},
        font: {family: "Arial", size: 14, color: ["black"]},
        height: 30
      }
    customdata = selected_severity
    return [cells,customdata]

}

function getButtons(arr){
  var buttons = []
  for(var i = 0; i < arr.length;  i++){
    if (arr[i] == ''){
      label = 'All'
    }
    else{
      label = arr[i]
    }
    button = {
      method: 'update',
      args: [{'cells': generateData(arr[i])[0]}],
      label: label
    }
    buttons.push(button)
  }
  return buttons
}

updatemenus = [ {
        yanchor: 'bottom',
        buttons: getButtons(allSubsystems)
    },
    ]

layoutTable = {
  updatemenus : updatemenus,

}

var data = [tableAll];


return{data: data, layout: layoutTable}
