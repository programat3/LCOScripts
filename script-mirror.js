// Normalize values so they math room temperature
var airTemp = variables.temperature.current.value/1000
//Round values of X and Y for a better heatmap


//Median Vals
function median(values){

  if (values.length === 0) {
    throw new Error('Input array is empty');
  }

  // Sorting values, preventing original array
  // from being mutated.
  const results2 = values.filter(element => {
    return element !== null && element !== undefined;
    });
  values = results2.sort(function(a, b){return a - b});
  const half = Math.floor(values.length / 2);


  return results2[half]

}

//Standar dev
function standardDev(array) {
  const results2 = array.filter(element => {
    return element !== null && element !== undefined;
    });
  const n = results2.length
  const mean = results2.reduce((a, b) => a + b) / n
  return Math.sqrt(results2.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n)
}

function round(arr){
  new_arr = arr.map(function(each_element){
  return Number(Math.round(each_element))
})
return new_arr
};

function all_vals_layer1(arr){
  return arr.map(function(val,index){
    if (layer[index] == 1){
      return val
    }
  })
};

function all_vals_layer2(arr){
  return arr.map(function(val,index){
    if (layer[index] == 2){
      return val
    }
  })
};

function all_vals_layer3(arr){
  return arr.map(function(val,index){
    if (layer[index] == 3){
      return val
    }
  })
};
//Obtain Data
const x = data.series[0].fields[1].values;
const y = data.series[0].fields[2].values;
let layer = data.series[0].fields[3].values;
let temps = data.series[0].fields[4].values;
let ids = data.series[0].fields[0].values;

let z1a = all_vals_layer1(temps);
const x1 = all_vals_layer1(x);
const y1 = all_vals_layer1(y);
let z1r = z1a.map(function(val, index){
  return val-airTemp});
let labels1 = all_vals_layer1(ids);

let x2 = all_vals_layer2(x);
let y2 =all_vals_layer2(y);
let z2a = all_vals_layer2(temps);
let z2r = z2a.map(function(val, index){
  return val-airTemp});
let labels2 = all_vals_layer2(ids);

let x3 = all_vals_layer3(x);
let y3 =all_vals_layer3(y);
let z3a = all_vals_layer3(temps);
let z3r = z3a.map(function(val, index){
  return val-airTemp});
let labels3 = all_vals_layer3(ids);

//Obtain Max and Min for Absolute Plots
var all_z = z1a.concat(z2a,z3a);

var mediana = median(all_z);
var estandarDev = standardDev(all_z);


var max = mediana+(1*estandarDev);
var min = mediana-(1*estandarDev);


//Amplify width of heatmaps
x1.push(-7,7);
y1.push(-7,7);
z1r.push(NaN,NaN);
z1a.push(NaN,NaN);

x2.push(-7,7);
y2.push(-7,7);
z2r.push(NaN,NaN);
z2a.push(NaN,NaN);

x3.push(-7,7);
y3.push(-7,7);
z3r.push(NaN,NaN);
z3a.push(NaN,NaN);

//Text for the tooltips
var text1a = z1a.map(function(val, index){
  return `
    Temperature: ${Math.round(val*100)/100}
    Sensor: ${labels1[index]}
  `
});

var text1r = z1r.map(function(val, index){
  return `
    Temperature: ${Math.round(val*100)/100}
    Sensor: ${labels1[index]}
  `
});

var text2a = z2a.map(function(val, index){
  return `
    Temperature: ${Math.round(val*100)/100}
    Sensor: ${labels2[index]}
  `
});

var text2r = z2r.map(function(val, index){
  return `
    Temperature: ${Math.round(val*100)/100}
    Sensor: ${labels2[index]}
  `
});

var text3a = z3a.map(function(val, index){
  return `
    Temperature: ${Math.round(val*100)/100}
    Sensor: ${labels3[index]}
  `
});

var text3r = z3r.map(function(val, index){
  return `
    Temperature: ${Math.round(val*100)/100}
    Sensor: ${labels3[index]}
  `
});

//Labels for each plot
var annotations = [
    {
      text: 'Relative To Air Temperature',
      y: 8,
      x: 1,
      xref: 'x1',
      yref: 'y1',
      font: {
        size: 17,
        color: 'black'
      },
      align: 'center', 
      showarrow: false
    },
    {
      text: 'Absolute Temperature',
      y: 8,
      x: 1,
      xref: 'x1',
      yref: 'y4',
      font: {
        size: 17,
        color: 'black'
      },
      align: 'center', 
      showarrow: false
    },
    {
      text: 'Bottom Layer', 
      y: 7, 
      x: 0, 
      xref: 'x1',
      yref: 'y1', 
      align: 'center', 
      showarrow: false
    },
    {
      text: 'Mid Layer',
      y: 7, 
      x: 0, 
      xref: 'x2',
      yref: 'y2', 
      align: 'center', 
      showarrow: false
    },
    {
      text: 'Top Layer', 
      y: 7, 
      x: 0, 
      xref: 'x3',
      yref: 'y3', 
      align: 'center', 
      showarrow: false
    },
    {
      text: 'Bottom Layer', 
      y: 7, 
      x: 0, 
      xref: 'x4',
      yref: 'y4', 
      align: 'center', 
      showarrow: false
    },
    {
      text: 'Mid Layer',
      y: 7, 
      x: 0, 
      xref: 'x5',
      yref: 'y5', 
      align: 'center', 
      showarrow: false
    },
    {
      text: 'Top Layer', 
      y: 7, 
      x: 0, 
      xref: 'x6',
      yref: 'y6', 
      align: 'center', 
      showarrow: false
    }
];
//Variable for relative contour map
var contoursR = {
  start: -1,
  end: 1
};

var colorbarR = {
  len: 0.5,
  y: 1,
  yanchor: 'top',
  yref: 'paper'
};

// Sensors Scatter Graph
var sensors1 = {
  name: 'sensor names',
  x: x1,
  y: y1,
  xaxis: 'x1',
  yaxis: 'y1',
  type: 'scatter',
  mode: 'markers',
  textposition: 'top center',
  textfont: {
    family:  'Raleway, sans-serif'
  },
  marker: { size: 3, color: 'black' },
  showlegend: false
};

var sensors2 = {
  name: 'sensor names',
  x: x2,
  y: y2,
  xaxis: 'x2',
  yaxis: 'y2',
  type: 'scatter',
  mode: 'markers',
  text: labels2,
  textposition: 'top center',
  textfont: {
    family:  'Raleway, sans-serif'
  },
  marker: { size: 3, color: 'black' },
  showlegend: false
};

var sensors3 = {
  name: 'sensor names',
  x: x3,
  y: y3,
  xaxis: 'x3',
  yaxis: 'y3',
  type: 'scatter',
  mode: 'markers',
  text: labels2,
  textposition: 'top center',
  textfont: {
    family:  'Raleway, sans-serif'
  },
  marker: { size: 3, color: 'black' },
  showlegend: false
};
var sensors1A = {
  name: 'sensor names',
  x: x1,
  y: y1,
  xaxis: 'x4',
  yaxis: 'y4',
  type: 'scatter',
  mode: 'markers',
  textposition: 'top center',
  textfont: {
    family:  'Raleway, sans-serif'
  },
  marker: { size: 3, color: 'black' },
  showlegend: false
};

var sensors2A = {
  name: 'sensor names',
  x: x2,
  y: y2,
  xaxis: 'x5',
  yaxis: 'y5',
  type: 'scatter',
  mode: 'markers',
  text: labels2,
  textposition: 'top center',
  textfont: {
    family:  'Raleway, sans-serif'
  },
  marker: { size: 3, color: 'black' },
  showlegend: false
};

var sensors3A = {
  name: 'sensor names',
  x: x3,
  y: y3,
  xaxis: 'x6',
  yaxis: 'y6',
  type: 'scatter',
  mode: 'markers',
  text: labels2,
  textposition: 'top center',
  textfont: {
    family:  'Raleway, sans-serif'
  },
  marker: { size: 3, color: 'black' },
  showlegend: false
};
//Absolute Heatmaps
var heatmap1A = {
  type: 'heatmap',
  name: 'heat',
  text: text1a,
  hoverinfo: 'text',
  x: round(x1),
  y: round(y1),
  z: z1a,
  coloraxis: 'coloraxis',
  xaxis: 'x4',
  yaxis: 'y4',
  zsmooth: "best",
  zauto: false,
  connectgaps: true,
  xtype: 'scaled',
  visible: true
};

var heatmap2A = {
  type: 'heatmap',
  name: 'heat',
  text: text2a,
  hoverinfo: 'text',
  x: round(x2),
  y: round(y2),
  z: z2a,
  coloraxis: 'coloraxis',
  xaxis: 'x5',
  yaxis: 'y5',
  zsmooth: "best",
  zauto: false,
  connectgaps: true,
  xtype: 'scaled',
  visible: true
};

var heatmap3A = {
  type: 'heatmap',
  name: 'heat',
  text: text3a,
  hoverinfo: 'text',
  transpose: true,
  x: round(x3),
  y: round(y3),
  z: z3a,
  coloraxis: 'coloraxis',
  xaxis: 'x6',
  yaxis: 'y6',
  zsmooth: "best",
  zauto: false,
  connectgaps: true,
  xtype: 'scaled',
  visible: true
};


//Relative Heatmaps
var heatmap1R = {
  type: 'contour',
  name: 'heat',
  text: text1r,
  hoverinfo: 'text',
  x: round(x1),
  y: round(y1),
  z: z1r,
  coloraxis: 'coloraxisR',
  colorbar: colorbarR,
  xaxis: 'x1',
  yaxis: 'y1',
  zsmooth: "best",
  zauto: false,
  connectgaps: true,
  xtype: 'scaled',
  contours: contoursR
};

var heatmap2R = {
  type: 'contour',
  name: 'heat',
  text: text2r,
  hoverinfo: 'text',
  x: round(x2),
  y: round(y2),
  z: z2r,
  coloraxis: 'coloraxisR',
  colorbar: colorbarR,
  xaxis: 'x2',
  yaxis: 'y2',
  zsmooth: "best",
  zauto: false,
  connectgaps: true,
  xtype: 'scaled',
  contours: contoursR
};

var heatmap3R = {
  type: 'contour',
  name: 'heat',
  text: text3r,
  hoverinfo: 'text',
  x: round(x3),
  y: round(y3),
  z: z3r,
  coloraxis: 'coloraxisR',
  colorbar: colorbarR,
  xaxis: 'x3',
  yaxis: 'y3',
  zsmooth: "best",
  zauto: false,
  connectgaps: true,
  xtype: 'scaled',
  contours: contoursR
};

//Layout
var layout_circle ={
  annotations: annotations,
  width: '1110',
  height: '800',
  xaxis: {
    type: 'numeric'
  },
  coloraxis: {
    colorscale: 'RdBu',
    cmin: min,
    cmax: max,
    showscale: true,
  },
  coloraxisR: {
    colorscale: 'RdBu',
    showscale: true,
    colorbar:{
      len: 0.5,
      y: 0.1,
      yanchor: 'top',
      yref: 'paper'
    }
  },
  shapes:[
    {
      xref: 'x1',
      yref: 'y1',
      xsizemode:'scale',
      ysizemode:'scale',
      type: 'path',
      path: 'M 5.779 0.0844 C 5.779 3.5854 3.1458 6.4234 -0.1025 6.4234 C -3.3507 6.4234 -5.9839 3.5854 -5.9839 0.0844 C -5.9839 -3.4165 -3.3507 -6.2546 -0.1025 -6.2546 C 3.1458 -6.2546 5.779 -3.4165 5.779 0.0844 C 5.779 0.0844 5.779 0.0844 5.779 0.0844 M -9.4279 -9.315 L 9.315 -9.315 L 9.315 9.315 L -9.4279 9.315 L -9.4279 -9.315',
      fillcolor: 'white',
      line: {
        color: 'white',
        width: 0
      }
    },
    {
      xref: 'x2',
      yref: 'y2',
      xsizemode:'scale',
      ysizemode:'scale',
      type: 'path',
      path: 'M 5.779 0.0844 C 5.779 3.5854 3.1458 6.4234 -0.1025 6.4234 C -3.3507 6.4234 -5.9839 3.5854 -5.9839 0.0844 C -5.9839 -3.4165 -3.3507 -6.2546 -0.1025 -6.2546 C 3.1458 -6.2546 5.779 -3.4165 5.779 0.0844 C 5.779 0.0844 5.779 0.0844 5.779 0.0844 M -9.4279 -9.315 L 9.315 -9.315 L 9.315 9.315 L -9.4279 9.315 L -9.4279 -9.315',
      fillcolor: 'white',
      line: {
        color: 'white',
        width: 0
      }
    },
    {
      xref: 'x3',
      yref: 'y3',
      xsizemode:'scale',
      ysizemode:'scale',
      type: 'path',
      path: 'M 5.779 0.0844 C 5.779 3.5854 3.1458 6.4234 -0.1025 6.4234 C -3.3507 6.4234 -5.9839 3.5854 -5.9839 0.0844 C -5.9839 -3.4165 -3.3507 -6.2546 -0.1025 -6.2546 C 3.1458 -6.2546 5.779 -3.4165 5.779 0.0844 C 5.779 0.0844 5.779 0.0844 5.779 0.0844 M -9.4279 -9.315 L 9.315 -9.315 L 9.315 9.315 L -9.4279 9.315 L -9.4279 -9.315',
      fillcolor: 'white',
      line: {
        color: 'white',
        width: 0
      }
    } ,
    {
      xref: 'x4',
      yref: 'y4',
      xsizemode:'scale',
      ysizemode:'scale',
      type: 'path',
      path: 'M 5.779 0.0844 C 5.779 3.5854 3.1458 6.4234 -0.1025 6.4234 C -3.3507 6.4234 -5.9839 3.5854 -5.9839 0.0844 C -5.9839 -3.4165 -3.3507 -6.2546 -0.1025 -6.2546 C 3.1458 -6.2546 5.779 -3.4165 5.779 0.0844 C 5.779 0.0844 5.779 0.0844 5.779 0.0844 M -9.4279 -9.315 L 9.315 -9.315 L 9.315 9.315 L -9.4279 9.315 L -9.4279 -9.315',
      fillcolor: 'white',
      line: {
        color: 'white',
        width: 0
      }
    },
    {
      xref: 'x5',
      yref: 'y5',
      xsizemode:'scale',
      ysizemode:'scale',
      type: 'path',
      path: 'M 5.779 0.0844 C 5.779 3.5854 3.1458 6.4234 -0.1025 6.4234 C -3.3507 6.4234 -5.9839 3.5854 -5.9839 0.0844 C -5.9839 -3.4165 -3.3507 -6.2546 -0.1025 -6.2546 C 3.1458 -6.2546 5.779 -3.4165 5.779 0.0844 C 5.779 0.0844 5.779 0.0844 5.779 0.0844 M -9.4279 -9.315 L 9.315 -9.315 L 9.315 9.315 L -9.4279 9.315 L -9.4279 -9.315',
      fillcolor: 'white',
      line: {
        color: 'white',
        width: 0
      }
    } ,
    {
      xref: 'x6',
      yref: 'y6',
      xsizemode:'scale',
      ysizemode:'scale',
      type: 'path',
      path: 'M 5.779 0.0844 C 5.779 3.5854 3.1458 6.4234 -0.1025 6.4234 C -3.3507 6.4234 -5.9839 3.5854 -5.9839 0.0844 C -5.9839 -3.4165 -3.3507 -6.2546 -0.1025 -6.2546 C 3.1458 -6.2546 5.779 -3.4165 5.779 0.0844 C 5.779 0.0844 5.779 0.0844 5.779 0.0844 M -9.4279 -9.315 L 9.315 -9.315 L 9.315 9.315 L -9.4279 9.315 L -9.4279 -9.315',
      fillcolor: 'white',
      line: {
        color: 'white',
        width: 0
      }
    } 
  ],
  grid :{
    rows: 2,
    columns: 3,
    pattern: 'independent'
  }
}

config = {
  modeBarButtonsToRemove : ['zoom2d','pan2d','lasso2d','zoomIn2d','zoomOut2d','autoScale2d','resetScale2d','select2d']
}
var data = [sensors1,sensors1A, heatmap1A, heatmap1R, sensors2,sensors2A,heatmap2A, heatmap2R, sensors3,sensors3A, heatmap3A, heatmap3R];
return{data: data, layout: layout_circle, config: config}
