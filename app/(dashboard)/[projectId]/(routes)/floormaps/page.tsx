"use client"

import React, { CSSProperties, useState } from 'react';
import axios from 'axios';
import DynamicFloorPlan from './components/DynamicFloorPlan'; // Update the path as per your component's location
import {HashLoader, FadeLoader} from 'react-spinners'
import { Heading } from '@/components/ui/heading';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';




// import React from 'react';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import YourNewPage from './path/to/YourNewPage';
// import ConstructionCalculator from './path/to/ConstructionCalculator';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         {/* other routes */}
//         <Route path="/Cost" element={<ConstructionCalculator />} />
//       </Routes>
//     </Router>
//   );
// }



// export default App;
//i.5
// if spt {blows per foot}
//  5-15 4 frameElement
//  15+ 5 feet  


const App = () => {
  const [input, setInput] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [floorPlanData, setFloorPlanData] = useState([
   
   
  
  ]);
  const [plotLength, setPlotLength] = useState(0);
  const [plotWidth, setPlotWidth] = useState(0);
  // ...

  const handleLengthChange = (e) => {
    setPlotLength(e.target.value);
  };

  const handleWidthChange = (e) => {
    setPlotWidth(e.target.value);
  };


  const generateFloorMap = async () => {
    try {
      // Start loading
      setLoading(true);

      // Clear the floor plan data
      setFloorPlanData([]);

      const response = await axios.post(`https://cbb4-154-81-228-171.ngrok-free.app/generate-floor-map`, { prompt:input });
      console.log(response)
      setFloorPlanData(JSON.parse(response.data).results);

      // Stop loading
      setLoading(false);
    } catch (err) {
      console.error('Error fetching floor map:', err);

      // Stop loading in case of error
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };

  // const handleSubmit = async () => {
  //   try {
  //     setLoading(true);
  //     const response = await axios.post('http://127.0.0.1:5000/generate-floor-plan', {
  //       prompt: input
  //     });

  //     console.log(response.data)
  //     setFloorPlanData(response.data.results); // Update this line
  //     setLoading(false);
  //   } catch (error) {
  //     setLoading(false);
  //     console.error('Error fetching data:', error);
  //   }
  // };

  return (
<>
  <div className="flex-col justify-center items-center space-y-4 p-8 pt-6">
    <Heading title='Generate Floor Maps' description='Build floor plans of your choice'></Heading>
    <div className='form-floormaps'>
    <Input
      type="text"
      value={input}
      onChange={handleInputChange}
      placeholder="Enter prompt"
      className="border p-2 rounded w-1/2 m-4"
      style={{color: 'black'}}
    />
    <div className='flex items-center gap-10'>
    <Label>Length of Plot (Sqft)</Label>
     <Input
        type="number"
        value={plotLength}
        onChange={handleLengthChange}
        placeholder="Enter plot length"
        className="border p-2 rounded w-1/3 m-4"
        style={{color: 'black'}}
      />
      </div>
      <div className='flex items-center gap-12'>
       <Label>Width of Plot (Sqft)</Label>
      <Input
        type="number"
        value={plotWidth}
        onChange={handleWidthChange}
        placeholder="Enter plot width"
        className="border p-2 rounded w-1/3 m-4"
        style={{color: 'black'}}
      />
      </div>
    <Button onClick={generateFloorMap} className="mt-4">Submit</Button>
    </div>
  </div>
  {isLoading && <div className='flex justify-center items-center shadow'><FadeLoader cssOverride={override} color="#36d7b7" size={80} /></div>}
  <div className="grid grid-cols-2 justify-center items-center gap-4 p-20">
    
    {floorPlanData && (
      <>
         {floorPlanData.map((floorPlan, index) => (
        <DynamicFloorPlan key={index} index={index+1}  data={floorPlan} plotLength={plotLength} plotWidth={plotWidth} className="my-4 shadow-lg rounded-lg"/>
      ))}
      </>
    )}
  </div>
</>
  );
};

export default App;