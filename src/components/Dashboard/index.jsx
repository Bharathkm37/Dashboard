import React, { useEffect, useState } from 'react';
import '../../style.css'
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


const Dashboard = () => {
    const [users, setUsers] = useState([]);
    const [data, setData] = useState({
      labels : [],
      datasets: [
        {
          label: 'Total Active Time',
          data: [],
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
          label: 'Total Break Time',
          data: [],
          borderColor: 'rgb(255, 165, 0)',
          backgroundColor: 'rgba(255, 165, 0, 0.5)',
        },
        {
          label: 'Total Check In Time',
          data: [],
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
        
        
      ],
    })

    useEffect(() => {
      fetch('https://jsonplaceholder.typicode.com/users')
        .then((res) => res.json())
        .then((items) => {
            
            const refactoredData = items?.map((item) => {
                const random = Math.round(Math.random() * 10);
                return {
                    ...item, 
                    totalCheckIn: random, 
                    totalBreak: Math.round(random / 2),
                    totalActive: random,
                    isCheckedIn: random % 2 === 0,
                }
            })

            setData({
              labels: refactoredData.map((item) => item.name),
              datasets: data.datasets.map((item) => {
                if(item.label === 'Total Active Time') {
                  return {
                    ...item, 
                    data: refactoredData.map((item) => item.totalActive)
                  } 
                }
                if(item.label === 'Total Check In Time') {
                  return {
                    ...item, 
                    data: refactoredData.map((item) => item.totalCheckIn)
                  } 
                }
                if(item.label === 'Total Break Time') {
                  return {
                    ...item, 
                    data: refactoredData.map((item) => item.totalBreak)
                  } 
                }
              })
            })
            setUsers(refactoredData)
        } )
        .catch((er) => console.log(er));
    }, []);

     const options = {
        indexAxis: "x",
        elements: {
          bar: {
            borderWidth: 2,
          },
        },
        responsive: true,
        plugins: {
          legend: {
            position: 'right',
          },
          tooltip:{
            callbacks:{
              label:function(
                context
              ){
                const label = context.dataset.label || "" ;
                const value = context.parsed.y;
                return `${label} : ${value} hours`

              }
            }
          }
          
        },
      };
      
      
    return (
      <>
      <h1 style={{textAlign:'center', marginBottom:'5px'}}>Team Utilization</h1>
        <div style = {{display:'flex', justifyContent:'center', alignItems:'center', height:'90%'}}>
            <Bar options={options} data={data}/>
        </div>
      </>
      
    )
}

export default Dashboard;