import React, {useState} from 'react';
import logo from './logo.svg';
import * as queries from './graphql/queries';
import * as mutations from './graphql/mutations';
import * as subscriptions from './graphql/subscriptions';
import Amplify,{API, graphqlOperation } from 'aws-amplify';
import aws_exports from './aws-exports';
//import Chart from './Chart';
//import Batsman from './Batsman';
import { Bar } from 'react-chartjs-2';
import './App.css';


Amplify.configure(aws_exports);
const App = () => {
  const [batsmans,setbatsmans] = useState([]);

  React.useEffect(()=>{
    if(batsmans.length === 0) {
      API.graphql(graphqlOperation(queries.listBatsmans)).then(res => {
        console.log(res.data.listBatsmans.items);
        setbatsmans(res.data.listBatsmans.items)
      })
    }
    

    // API.graphql(graphqlOperation(subscriptions.onAddRun)).subscribe({
    //   next: (runAdded) => {
    //     let batsmanList = batsmans;
    //     console.log(batsmanList);
    //     const id = runAdded.value.data.onAddRun.id
    //     const score = runAdded.value.data.onAddRun.runs
    //     const row = batsmanList.findIndex( batsman => batsman.id === id );
    //     console.log('row', row, score);
    //     batsmanList[row].runs = score;
    //     setbatsmans(batsmanList)
    //     console.log("state:", batsmanList)
    //   }
    // })


  },[])

  React.useEffect(() => {
    const subscription = API.graphql(
      graphqlOperation(subscriptions.onAddRun)
    ).subscribe({
        next: data => {
          const { value: { data: { onAddRun } }} = data
          const batsmanList = [...batsmans]
          const row = batsmanList.findIndex( batsman => batsman.id === onAddRun.id );
         batsmanList[row].runs = onAddRun.runs;
          setbatsmans(batsmanList)
        }
    })

    return () => subscription.unsubscribe()
  }, [batsmans])

  const fontStack = '-apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';
  
  const batsmanColors = ["skyblue", "orange", "lightgreen"];

  const data = {
    labels: batsmans.map((candidate) => ( candidate.name )),
    //labels: ["Aaq","Saq","Ish"],
    datasets: [{
      label: 'Runs Scored',
      data: batsmans.map((candidate) => ( candidate.runs )),
      //data: [10,4,7],
      backgroundColor: batsmanColors
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

 

  const handleSubmit = async (id) => {
    const addRun = {
      id
    };
    await API.graphql(graphqlOperation(mutations.addRun, {input: addRun}));
  };

  return (
    <div className="App">
        <div className="container mx-auto md:w-3/5 px-3">
          
          <h1>Batsman Scores :</h1>
          <div className="flex py-2">
            { batsmans.map((batsman,idx) =>
              <button
              style={{width:'200px',backgroundColor:batsmanColors[idx]}}
              onClick={() =>
                handleSubmit(batsman.id)
              }
              >
              <b>{batsman.name}</b> 
              <p className="py-1">
                <b>{batsman.runs}</b></p>
            </button>
            )}
          </div>
        </div>
        <div className="container mx-auto md:w-3/5 px-3" style={{margin: '0 auto',width: '50%'}}>
          <h1 className="text-lg text-grey-darkest py-6">Live updates</h1>
          <Bar data={data} options={options}/>
        </div>
      </div>
  );
}





export default App;
