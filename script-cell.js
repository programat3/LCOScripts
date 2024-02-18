function round(arr){
  new_arr = arr.map(function(each_element){
  return Number(each_element.toFixed(0))
})
return new_arr
};

//Obtain Data
const x = data.series[0].fields[1].values;
const y = data.series[0].fields[2].values;
let temps = data.series[0].fields[3].values;
let ids = data.series[0].fields[0].values;

let z1r = temps.map(function(val,index){
  return val/1000
});
const x1 = x;
const y1 = y;
;
let labels1 = ids;

//Amplify width of heatmaps
x1.push(-7,7);
y1.push(-7,7);
z1r.push(NaN,NaN);

var text1r = z1r.map(function(val, index){
  return `
    Temperature: ${Math.round(val*100)/100}
    Sensor: ${labels1[index]}
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
    }
];
//Variable for relative contour map
var contoursR = {
  start: -1,
  end: 1
};

var colorbarR = {
  len: 1,
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
//Layout
var layout_circle ={
  annotations: annotations,
  width: '620',
  height: '600',
  xaxis: {
    type: 'numeric'
  },
  coloraxisR: {
    colorscale: 'RdBu',
    showscale: true,
    colorbar:{
      len: 1,
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
    }
  ],
  grid :{
    rows: 1,
    columns: 1,
    pattern: 'independent'
  }
}
config = {
  modeBarButtonsToRemove : ['zoom2d','pan2d','lasso2d','zoomIn2d','zoomOut2d','autoScale2d','resetScale2d','select2d']
}
var data = [sensors1,heatmap1R];
return{data: data, layout: layout_circle, config: config}
