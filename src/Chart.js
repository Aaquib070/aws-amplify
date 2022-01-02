import { Bar } from 'react-chartjs-2';

const Chart =(props)=> {
    const fontStack = '-apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';
    const data = {
      labels: props.data.map((candidate) => ( candidate.name )),
      datasets: [{
        label: false,
        data: props.data.map((candidate) => ( candidate.votes )),
        backgroundColor: ['#CC1F1A', '#DE751F', '#1F9D55', '#2779BD']
      }]
    };
    const options = {
      title:     { display: false },
      legend:    { display: false },
      tooltips:  { enabled: false },
      responsive: true,
      layout:    { padding: { top: 10 } },
      scales: {
        xAxes: [{gridLines: {display: false }, ticks: {fontStyle: 'bold', fontColor: '#3D4852', fontFamily: fontStack}}],
        yAxes: [{ticks: {beginAtZero: true, maxTicksLimit: 6, fontStyle: 'normal', fontColor: '#3D4852', fontFamily: fontStack}}]
      }
    }
    return (
      <Bar data={data} width={100} height={50} options={options} />
    );
  }

  export default Chart