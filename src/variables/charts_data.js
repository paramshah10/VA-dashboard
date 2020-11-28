import { fetchedChartsData, addOveralls } from 'lib/redux/actions/charts';
import React from 'react'
import { connect } from 'react-redux';

// Colors
var colors = {
    gray: {
        100: "#f6f9fc",
        200: "#e9ecef",
        300: "#dee2e6",
        400: "#ced4da",
        500: "#adb5bd",
        600: "#8898aa",
        700: "#525f7f",
        800: "#32325d",
        900: "#212529"
    },
    theme: {
        default: "#172b4d",
        primary: "#5e72e4",
        secondary: "#f4f5f7",
        info: "#11cdef",
        success: "#2dce89",
        danger: "#f5365c",
        warning: "#fb6340"
    },
    black: "#12263F",
    white: "#FFFFFF",
    transparent: "transparent"
};

const config = require('../lib/firebase');

const firebase = require("firebase/app");
require("firebase/firestore");

firebase.initializeApp(config.default);
let db = firebase.firestore();

let global_data = {
  "stress_bar": {
    "day": [],
    "week": [],
    "month": []
  },
  "sleep": {
    "week": {
      "total": [],
      "awake": [],
      "light": [],
      "deep": [],
    },
    "month": {
      "total": [],
      "awake": [],
      "light": [],
      "deep": [],
    }
  },
  "stress_pie_score": {
    "week": [],
    "month": [],
  },
  "stress_pie_type": {
    "week": [],
    "month": [],
  },
  "stress_bar_score": {
    "week": [],
    "month": [],
  },
  "stress_bar_type": {
    "week": [],
    "month": [],
  },
  "stress_management": {
    "week": [],
    "month": []
  }
}

// Example 1 of Chart inside src/views/Index.js (Sales value - Card)
let chartExample1 = {
    options: {
      scales: {
        yAxes: [
          {
            gridLines: {
              color: colors.gray[900],
              zeroLineColor: colors.gray[900]
            },
            ticks: {
              callback: function(value) {
                if (!(value % 5)) {
                  return value;
                }
              }
            }
          }
        ]
      },
      tooltips: {
        callbacks: {
          label: function(item, data) {
            var label = data.datasets[item.datasetIndex].label || "";
            var yLabel = item.yLabel;
            var content = "";
  
            if (data.datasets.length > 1) {
              content += label;
            }
  
            // content += '$' + yLabel + 'k';
            content += yLabel;
            return content;
          }
        }
      }
    },
    data1: canvas => {//Stress score by day
      return {
        labels: ["12am", "3am", "6am", "9am", "12am", "3pm", "6pm", "9pm", "12am"],
        datasets: [
          {
            label: "Stress Score by Day",
            data: global_data["stress_bar"]["day"] //[3, 0, 0, 3, 12, 22, 14, 10, 4]
          }
        ]
      };
    },
    data2: canvas => {//Stress score by week
      return {
        labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        datasets: [
          {
            label: "Stress Score by Week",
            data: global_data["stress_bar"]["week"]//[20, 18, 15, 20, 21, 24, 19]
          }
        ]
      };
    },
    data3: canvas => {//Stress score by month
      return {
        labels: ["1st", "2nd", "4th", "6th", "8th", "10th", "12th", "14th", "16th", "18th", "20th", "22nd", "24th", "26th", "28th", "30th"],
        datasets: [
          {
            label: "Stress Score by Month",
            data: global_data["stress_bar"]["month"]//[10, 16, 18, 15, 20, 21, 24, 19, 13, 14, 11, 20, 21, 24, 19, 13]
          }
        ]
      };
    }
};
  
  // Example 2 of Chart inside src/views/Index.js (Total orders - Card)
let chartExample2 = {
options: {
    scales: {
    yAxes: [
        {
        ticks: {
            callback: function(value) {
            if (!(value % 2)) {
                //return '$' + value + 'k'
                return value;
            }
            }
        },
        stacked: true,
        }
    ],
    xAxes: [{
      stacked: true,
    }]
    },
    tooltips: {
        callbacks: {
            label: function(item, data) {
            var label = data.datasets[item.datasetIndex].label || "";
            var yLabel = item.yLabel;
            var content = "";
            if (data.datasets.length > 1) {
                content += label;
            }
            content += " " + yLabel;
            return content;
            }
    }
    }
},
data1: canvas => {//Sleep by week
    return {
    labels: ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"],
    datasets: [
        {
          label: "Awake",
          data: global_data["sleep"]["week"]["awake"], //[0.2, 0.7, 0.5, 0.3, 0.9, 0.2, 0.3],
          maxBarThickness: 10,
          backgroundColor: "#A91E2A"
        },
        {
          label: "Light Sleep",
          data: global_data["sleep"]["week"]["light"], //[2.2, 2, 2.5, 2.3, 2.9, 2.2, 2.3],
          maxBarThickness: 10,
          backgroundColor: '#FEB300', //"#673AB7",
        },
        {
          label: "Deep Sleep",
          data: global_data["sleep"]["week"]["deep"],//[4.2, 4, 4.5, 4.3, 4.1, 4.2, 4.3],
          maxBarThickness: 10,
          backgroundColor: "#0dd406",
        },
    ]
    };
},
data2: canvas => { //sleep by month
    return {  
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
        {
          label: "Awake",
          data: global_data["sleep"]["month"]["awake"],//[0.2, 0.3, 0.1, 0.5],
          maxBarThickness: 10
        },
        {
          label: "Light Sleep",
          data: global_data["sleep"]["month"]["light"],//[2.2, 2.4, 2.1, 2.5],
          maxBarThickness: 10
        },
        {
          label: "Deep Sleep",
          data: global_data["sleep"]["month"]["deep"],//[4.2, 4.7, 4.1, 4.5],
          maxBarThickness: 10
        },
    ]
    };
}
};

let chartExample3 = {
    options: {
        legend: {
        display: true,
        position: "bottom",
        labels: {
            usePointStyle: true,
            padding: 20
        }
        },
        tooltips: {
            callbacks: {
                label: function(item, data) {
                    return data.labels[item.index].substring(0, data.labels[item.index].search('[(]')) + ": " + data.datasets[item.datasetIndex].data[item.index];
                }
        }
        },
      responsive: true,
      maintainAspectRatio: false,
    },

    data1: canvas => {
        return {
        labels: ["Very High (20-25)", "High (15-20)", "Moderate (10-15)", "Low (0-15)"],
        datasets: [
            {
            label: "Stress count by score in the past month",
            data: global_data["stress_pie_score"]["week"],//[1, 5, 4, 7],
            backgroundColor: [
                "#A91E2A",
                '#ff4242',
                '#002867',
                '#DCDCDC'
                ],
            }
        ],
        }
    },

    data2: canvas => {
        return {
        labels: ["Very High (20-25)", "High (15-20)", "Moderate (10-15)", "Low (0-15)"],
        datasets: [
            {
            label: "Stress count by score in the past month",
            data: global_data["stress_pie_score"]["month"],//[3, 25, 61, 15],
            backgroundColor: [
                "#A91E2A",
                '#ff4242',
                '#002867',
                '#DCDCDC'
                ],
            }
        ],
        innerWidth: 100,
        }
    }
}

let chartExample4 = {
  options: {
    legend: {
    display: true,
    position: "bottom",
    labels: {
        usePointStyle: true,
        padding: 20
    }
    },
    tooltips: {
        callbacks: {
            label: function(item, data) {
                return data.labels[item.index] + ": " + data.datasets[item.datasetIndex].data[item.index];
            }
    }
    },
    responsive: true,
    maintainAspectRatio: false,
  },

  data1: canvas => {
      return {
      labels: ["Work (Admin)", "Work (Field)" , "Social", "Family", "Financial"],
      datasets: [
          {
          label: "Stress count by category in the past month",
          data: global_data["stress_pie_type"]["week"],//[2, 4, 1, 2, 3],
          backgroundColor: [
            "#0dd406",
            '#A91E2A',
            '#002867',
            '#DCDCDC',
            '#FEB300',
            // "#f79216",
            ],
          }
      ]
      }
  },

  data2: canvas => {
      return {
      labels: ["Work (Admin)", "Work (Field)" , "Social", "Family", "Financial"],
      datasets: [
          {
          label: "Stress count by category in the past month",
          data: global_data["stress_pie_type"]["month"],//[7, 13, 10, 5, 15],
          backgroundColor: [
            "#0dd406",
            '#A91E2A',
            '#002867',
            '#DCDCDC',
            '#FEB300',
            // "#f79216",
            ],
          }
      ]
      }
    }
  }

let chartExample5 = {
  options: {
    scales: {
      yAxes: [
        {
          gridLines: {
            color: colors.gray[900],
            zeroLineColor: colors.gray[900]
          },
          ticks: {
            callback: function(value) {
              return value;
            }
          }
        }
      ]
    },
    tooltips: {
      callbacks: {
        label: function(item, data) {
          var label = data.datasets[item.datasetIndex].label || "";
          var yLabel = item.yLabel;
          var content = "";

          if (data.datasets.length > 1) {
            content += label;
          }

          // content += '$' + yLabel + 'k';
          content += yLabel;
          return content;
        }
      }
    }
  },
  data1: canvas => {//sleep score by week
    return {
      labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      datasets: [
        {
          label: "Sleep by Week",
          data: global_data["sleep"]["week"]["total"],//[6.6, 6.7, 7.5, 7.2, 7.9, 6.8, 6.9]
        }
      ]
    };
  },
  data2: canvas => {//sleep score by month
    return {
      labels: ["1st", "2nd", "4th", "6th", "8th", "10th", "12th", "14th", "16th", "18th", "20th", "22nd", "24th", "26th", "28th", "30th"],
      datasets: [
        {
          label: "Sleep by Month",
          data: global_data["sleep"]["month"]["total"],//[7.5, 6.9, 7.2, 8, 8.1, 6.1, 6.4, 6.9, 7, 8, 7.6, 7.7, 8.1, 6.9, 7.3, 7.5]
        }
      ]
    };
  }
};
  
  // Example 2 of Chart inside src/views/Index.js (Total orders - Card)
let chartExample6 = {
options: {
    scales: {
    yAxes: [
        {
        ticks: {
            callback: function(value) {
            if (!(value % 5)) {
                //return '$' + value + 'k'
                return value;
            }
            }
        },
        stacked: true,
        }
    ],
    xAxes: [{
      stacked: true,
    }]
    },
    tooltips: {
        callbacks: {
            label: function(item, data) {
            var label = data.datasets[item.datasetIndex].label || "";
            var yLabel = item.yLabel;
            var content = "";
            if (data.datasets.length > 1) {
                content += label;
            }
            content += " " + yLabel;
            return content;
            }
    }
    }
},
data1: canvas => {
    return {
    labels: ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"],
    datasets: [
        {
            label: "Stress Management Activites Minutes",
            data: global_data["stress_management"]["week"],//[13, 25, 41, 15, 35, 21, 28],
        }
    ]
    };
},
data2: canvas => {
    return {  
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
        {
            label: "Stress Management Activites Minutes",
            data: global_data["stress_management"]["month"]//[13, 25, 21, 28],
        }
    ]
    };
}
};

let chartExample7 = {
    options: {
        scales: {
            yAxes: [
                {
                ticks: {
                    callback: function(value) {
                        return value;
                    }
                },
                stacked: true,
                }
            ],
            xAxes: [{
              stacked: true,
            }]
        },
        tooltips: {
            callbacks: {
                label: function(item, data) {
                    return data.datasets[item.datasetIndex].data[item.index];
                }
            }
        },
      responsive: true,
      maintainAspectRatio: false,
    },

    data1: canvas => {
        return {
        labels: ["Very High (20-25)", "High (15-20)", "Moderate (10-15)", "Low (0-10)"],
        datasets: [
            {
            label: "Stress count by score in the past month",
            data: global_data["stress_bar_score"]["week"],//[1, 5, 4, 7],
            backgroundColor: [
              "#A91E2A",
              '#ff4242',
              '#002867',
              '#DCDCDC'
              ],
            }
        ],
        }
    },

    data2: canvas => {
        return {
        labels: ["Very High (20-25)", "High (15-20)", "Moderate (10-15)", "Low (0-10)"],
        datasets: [
            {
            label: "Stress count by score in the past month",
            data: global_data["stress_bar_score"]["month"],//[3, 25, 61, 15],
            backgroundColor: [
              "#A91E2A",
              '#ff4242',
              '#002867',
              '#DCDCDC'
              ],
            }
        ],
        innerWidth: 100,
        }
    }
}

let chartExample8 = {
  options: {
    scales: {
        yAxes: [
            {
            ticks: {
                callback: function(value) {
                if (!(value % 1)) {
                    return value;
                }
                }
            },
            stacked: true,
            }
        ],
        xAxes: [{
          stacked: true,
        }]
        },
    tooltips: {
        callbacks: {
            label: function(item, data) {
                return data.datasets[item.datasetIndex].data[item.index];
            }
    }
    },
    responsive: true,
    maintainAspectRatio: false,
  },

  data1: canvas => {
      return {
      labels: ["Work (Admin)", "Work (Field)" , "Social", "Family", "Financial"],
      datasets: [
          {
          label: "Stress count by category in the past month",
          data: global_data["stress_bar_type"]["week"],//[2, 4, 1, 2, 3],
          backgroundColor: [
            "#0dd406",
            '#A91E2A',
            '#002867',
            '#FEB300',
            '#DCDCDC',
            ],
          }
      ]
      }
  },

  data2: canvas => {
      return {
      labels: ["Work (Admin)", "Work (Field)" , "Social", "Family", "Financial"],
      datasets: [
          {
          label: "Stress count by category in the past month",
          data: global_data["stress_bar_type"]["month"],//[7, 13, 10, 5, 15],
          backgroundColor: [
              "#0dd406",
              '#A91E2A',
              '#002867',
              '#FEB300',
              '#DCDCDC',
              ],
          }
      ]
      }
    }
  }

/* dummy class to do basically the same thing that the previous code was doing
   but inside a class. This is to prevent premature running of the getChartData
   function when this file is loaded by the browser.
   
   Problem: since the function was not in a component, it ran as soon as the file
   loaded (when the website is loaded) and this makes it run when the credentials 
   needed to pull data from firstore are not yet available.

   Solution: put the code in a dummy class so that it is only loaded when the parent
   class loads (and when the data needed is available). Put the class in any of the top
   level components and this is good to go
*/
class ChartsData extends React.Component {
  getChartData = async () => {
    const uid = localStorage.getItem("uid")
  
    var docRef = db.collection("users").doc(uid).collection("charts")
    var doc = await docRef.get()
  
    doc.docs.map(doc => {global_data[doc.id] = doc.data()})
  
    global_data["stress_bar_score"] = global_data["stress_pie_score"]
    global_data["stress_bar_type"] = global_data["stress_pie_type"]

    this.props.fetchedChartsData()
    this.props.addOveralls(global_data["overalls"])
  }

  async componentDidMount() {
    await this.getChartData()
  }

  render() {
    return (
      <></>
    )
  }
}

const mapDispathToProps = (dispatch) => {
  return {
    addOveralls: (data) => dispatch(addOveralls(data)),
    fetchedChartsData: () => dispatch(fetchedChartsData())
  }
};

export default connect(
 null,
 mapDispathToProps
)(ChartsData);

export {
  chartExample1, 
  chartExample2, 
  chartExample3, 
  chartExample4, 
  chartExample5, 
  chartExample6, 
  chartExample7, 
  chartExample8
}