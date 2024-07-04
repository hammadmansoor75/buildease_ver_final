"use client";
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import React, { useState , useEffect, ChangeEvent} from 'react';
import Item from './components/Item';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import CostItem from './components/CostItem';
import './index.css'
import {Construction,Home,Banknote} from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import Image from 'next/image';
import house from '@/images/house_cost.jpg'


type RoomDimension = {
  length : number,
  width : number,
  wallsvolume : number
}

const ConstructionCalculator = () => {
    // const [Rooms, setRoom0s] = useState(0);
    // const [unit, setUnit] = useState('Sqft');
    // const [houseType, setHouseType] = useState('LuxuryAplusplus');
    const [houseType, setHouseType] = useState('5 Marla');
    //rooms dimensions
    const [roomDimensions, setRoomDimensions] = useState<RoomDimension[]>([]);

    //covered area for  lanter
    const [coveredArea, setCoveredArea] = useState('50%');
    const [totalWallVolume , setTotalWallVolume] = useState(0);
    const [totalBricks , setTotalBricks] = useState(0);
    const [GreyCement , setGreyCement] = useState(0)
    const [GreySand , setGreySand] = useState(0)
    const [foundationBricks , setfoundationBricks] = useState(0);
    const [foundationCement , setfoundationCemet] = useState(0);
    const [foundationSand , setfoundationSand] = useState(0);
    const [SPT , setSPT] = useState(0)
    const [showInput, setShowInput] = useState(false);


    const [totalPaint , setTotalPaint] = useState(0)
    //  let CostPerCementBag = 1200;
     let CostPerSandCubicFeet = 44;
     let CostPerAggregateCubicFeet = 170;
    //  let CostPerKgofSteel =  230;
    //  let CostPerBrick = 20;
     const [CostPerCementBag, SetCostPerCementBag] = useState(0);
     const [CostPerKgOfSteel, SetCostPerKgOfSteel] = useState(0);
     const [CostPerBrick, SetCostPerBrick] = useState(0);
     const [CementCost ,  setCementCost] = useState(0);
     const [SandCost ,  setSandCost] = useState(0);
     const [AggregateCost ,  setAggregateCost] = useState(0);
     const [SteelCost ,  setSteetCost] = useState(0);
     const [BrickCost  , setBrickCost]  = useState(0)
     const [totalCost, setTotalCost] = useState(0);
     const [story, setStory] = useState('Single');
     const [toTalNumberOfTiles , setTotalNumberOfTiles] = useState(0)
     const [TileWidth, setTileWidth] = useState(0);
    const [TileLength, setTilteLength] = useState(0);
    const[PriceOfPerTile  , setPriceOfPerTile] =  useState(120)
    const [TotalCostOfTile , setTotalCostOfTile] = useState(0)
    const[TotalCostOfPaint , setTotalCostOfPaint] = useState(0)
    const [TotalLabourCost , setLabourCost]  = useState(0)
    const  [CementPlastring ,setCementPlastring] = useState(0)
    const  [SandPlastring ,setSandPlastring] = useState(0)
    const  [CostCementPlastring ,setCostCementPlastring] = useState(0)
    const  [CostSandPlastring ,setCostSandPlastring] = useState(0)


// Update total cost whenever any of the individual costs change
// function totalCostCalculate(){
//   let newTotalCost = CementCost + SandCost + AggregateCost + SteelCost + BrickCost+TotalCostOfTile+TotalCostOfPaint +TotalLabourCost ;

//     newTotalCost  = newTotalCost*1.25
  
//   setTotalCost(newTotalCost);

// }


  
    const [rooms, setRooms] = useState<number>(1);
    const [SlabResult , setSlabResult] = useState({cement:0,sand:0,aggregate:0,steel:0});

    // //area checks
    const [errorMessage, setErrorMessage] = useState("");
        let totalArea : number;
    switch(houseType) {
      case '5 Marla':
        //272 sq ft for 1 marla
        totalArea = 1350-(70+187);
        console.log(totalArea);
        break;
      case '10 Marla':
        totalArea = coveredArea === '100%' ? 2700  : 2475;
        
        break;
      case '1 Kanal':
        totalArea = coveredArea === '100%' ? 6600 : '75'? 4950:3300;
        break;
      default:
        totalArea = 0;
    }

    


    const handleRoomDimensionChange = (
      index: number,
      dimension: keyof RoomDimension,
      value: number
    ) => {
      let newRoomDimensions = [...roomDimensions];
    
      if (!newRoomDimensions[index]) {
        newRoomDimensions[index] = { length: 0, width: 0, wallsvolume : 0 };
      }
    
      newRoomDimensions[index][dimension] = value;
    
      // Calculate walls volume when both length and width are available
      if (newRoomDimensions[index].length && newRoomDimensions[index].width) {
        newRoomDimensions[index].wallsvolume =
          2 * (newRoomDimensions[index].length * 12) +
          2 * (newRoomDimensions[index].width * 12) * 0.75;
      }
    
      setRoomDimensions(newRoomDimensions);
    };
/*...*/




        
  
    
    


   

    const [paintOption, setPaintOption] = useState(false);

    const handlePaintOptionChange = (event: ChangeEvent<HTMLInputElement>) => {
      setPaintOption(event.target.checked);
    };

    const getRoomLimits = (houseType : string) => {
      switch (houseType) {
        case '5 Marla':
          return { min: 2, max: 3 };
        case '10 Marla':
          return { min: 3, max: 7 };
        case '1 Kanal':
          return { min: 4, max: 10 };
        default:
          return { min: 1, max: 1 };
      }
    };
    const { min, max } = getRoomLimits(houseType);


    useEffect(() => {
      let totalRoomArea = roomDimensions.reduce((total, room) => total + (room.length * room.width), 0);
      if (totalRoomArea > totalArea) {
          setErrorMessage("The total area of the rooms cannot exceed the total covered area.");
      } else {
          setErrorMessage("");
      }
  }, [roomDimensions, totalArea]);

  //Calculating Total Wall volume
  const calculateTotalWallVolume = () =>{
    //map the roomDimension array
    const WallVolume = roomDimensions.reduce((total, room) => {
      return total + room.wallsvolume;
    }, 0);
    setTotalWallVolume(WallVolume);
    return WallVolume;
  }

  const calculateTheBricks = () =>{
    const WallVolume = calculateTotalWallVolume();
    const inCubicmeter = WallVolume*0.0283;
    let bricks = inCubicmeter*500;
    console.log("total volume of wall " + inCubicmeter)
    console.log("Number of Bricks " + bricks)
    if(houseType ===  "1 Kanal"){
      bricks = bricks+6940;
    }
    if(houseType ===  "5 Marla"){
      bricks = bricks+1200;
    }
    if(houseType ===  "10 Marla"){
      bricks = bricks+2000;
    }
    bricks = bricks+2000;
    setTotalBricks(bricks)
  }
  const calculateCementSand = () =>{
    const WallVolume = calculateTotalWallVolume();
    const inCubicmeter = WallVolume*0.0283;
    //motar sand and  cement mixture 1:6
    const cement  = 1/7*(0.3*inCubicmeter);
    const cementBags = cement/0.035;
    const sand  = 6/7*(0.3*inCubicmeter);
    // console.log("Cement Bags " + cementBags);
    const sandCubicft = sand *35.3147;
    setGreyCement(cementBags);
    setGreySand(sandCubicft)
    

  }
  
  const calculateTheSlab = ()=>{
    
    const slabTickness = 0.5;
    const cementBagConstant = 1.25;
    const dryWetConstant = 1.54; //dry to wet ratio for concrete
    
    let SlabtotalArea = 0
    if(houseType === '5 Marla'){
      SlabtotalArea = totalArea+(70+187);
    }
    if(houseType === '10 Marla'){
      SlabtotalArea = totalArea+(70+187);
    }
    if(houseType === '1 Kanal'){
      SlabtotalArea = totalArea+(70+187);
    }
    
    console.log("totalArea" +  SlabtotalArea);
    let slabVolume =   SlabtotalArea*slabTickness;
    
    let concreteVolume = slabVolume*dryWetConstant;
    console.log("concreteVolume"  + concreteVolume)
    const cementQualtity = (1/7)*concreteVolume;
    const cement = cementQualtity/cementBagConstant;
    const sand = (2/7)*concreteVolume;
    const aggregate = (4/7)*concreteVolume;
    const OnePercent =  0.01 *(slabVolume/(3.28*3.28*3.28));
    const steel  = 2850*OnePercent;

    setSlabResult({cement,sand,aggregate,steel});
    calculateFoundationTheBricks()
    calculateFoundationCementSand()
    calculateTheBricks()
    calculateCementSand()
    calculatePlastring()
   
    CalculateCostOfCement()
    CalculateCostOfSand()
    CalculateCostOfAggregatte()
    CalculateCostOfSteel()
    calculateTheBricksCost()
    LabourCost()
    if (paintOption) {
      calculatePaint();
      costOfPaint();
      calculateTileAmount()
      costOfTiles()
  }
  calculateTotalCost()
  // totalCostCalculate()
   
  }
  const CalculateCostOfCement = ()=>{
    
     const totalCement = GreyCement+SlabResult.cement+CementPlastring + foundationCement ;
     setCementCost(totalCement*CostPerCementBag);
  }
  //calculate the Sand price
  const CalculateCostOfSand = ()=>{
    
    const totalSand = GreySand+SlabResult.sand+ SandPlastring +  foundationSand;
    setSandCost(totalSand*CostPerSandCubicFeet);
 }
 //calculate Aggregate
 const CalculateCostOfAggregatte = ()=>{
    
  const totalAggregate = SlabResult.aggregate;
  setAggregateCost(totalAggregate*CostPerAggregateCubicFeet);
}
//calculate Steel
const CalculateCostOfSteel = ()=>{
    
  const totalSteel= SlabResult.steel;
  setSteetCost(totalSteel*CostPerKgOfSteel);
  console.log("Cost of Steel:"  + SteelCost)
}
//calculate Bricks cost
function calculateTheBricksCost(){
  const cost  = (totalBricks+foundationBricks)*CostPerBrick;
  setBrickCost(cost)

}

function calculateBrickPriceWRTQuantity(quantity:string){
  const quantityNum = Number(quantity);
  const price = quantityNum * CostPerBrick;
  return price

}

//calculate the amount of paint 
function calculatePaint(){
  const surfaceArea = totalWallVolume/0.75;
  const aroundSurfaceArea = surfaceArea*2;
  setTotalPaint(aroundSurfaceArea/70)

}
//calculate the  cost of the paint 
function costOfPaint(){
 const cPaint = 550*totalPaint;
 console.log("Price of Paint"+ cPaint)
  setTotalCostOfPaint(cPaint)
}
//calculate the amount of tiles
function calculateTileAmount() {
  let SlabtotalArea = 0
    if(houseType === '5 Marla'){
      SlabtotalArea = totalArea+(70+187);
    }
    if(houseType === '10 Marla'){
      SlabtotalArea = totalArea+(70+187);
    }
    if(houseType === '1 Kanal'){
      SlabtotalArea = totalArea+(70+187);
    }
    const areaOFTile = TileLength*TileWidth;
    setTotalNumberOfTiles(SlabtotalArea/areaOFTile)
}

//calculate the Cost for tiles 
function costOfTiles(){
  const cTiles = PriceOfPerTile*toTalNumberOfTiles;
  setTotalCostOfTile(cTiles)
}
//calculate Laboure cost
function LabourCost(){
  let SlabtotalArea = 0
    if(houseType === '5 Marla'){
      SlabtotalArea = totalArea+(70+187);
    }
    if(houseType === '10 Marla'){
      SlabtotalArea = totalArea+(70+187);
    }
    if(houseType === '1 Kanal'){
      SlabtotalArea = totalArea+(70+187);
    }
   setLabourCost(SlabtotalArea*400) 
}
function calculatePlastring(){
  const PlasterArea = totalWallVolume/0.75;
  // const AreaINMeter  = PlasterArea * 0.09290304
  console.log("Plater area"+ PlasterArea)
  let volumeofMotar = PlasterArea/2
  volumeofMotar = volumeofMotar+(volumeofMotar*0.3)
  let DryVolume = volumeofMotar+(volumeofMotar*0.25)
  const cement = (((DryVolume*1)/7)*0.035)
  const  newCement = cement+(cement*0.3)
 
  setCementPlastring(newCement)
  setCostCementPlastring(newCement*CostPerCementBag)
  const sand = ((DryVolume)/9)
  const sandincft = sand
  setSandPlastring(sandincft)
  setCostSandPlastring(sandincft*CostPerSandCubicFeet)


}
const PlasteringCementCost = CementPlastring * CostPerCementBag;
const PlasteringSandCost = SandPlastring * CostPerSandCubicFeet;
const TotalPlasteringCost = PlasteringCementCost + PlasteringSandCost;
const FoundationCementCost = foundationCement * CostPerCementBag;
const FoundationSandCost = foundationSand * CostPerSandCubicFeet;
const FoundationBricksCost = foundationBricks * CostPerBrick;
const TotalFoundationCost = FoundationCementCost + FoundationSandCost + FoundationBricksCost;
function calculateTotalCost (){
  const newTotalCost = CementCost + SandCost + AggregateCost + SteelCost + BrickCost + TotalCostOfTile + TotalCostOfPaint + TotalLabourCost + TotalPlasteringCost + TotalFoundationCost;
  setTotalCost(newTotalCost);
}

//calculat Foundation cement and sand
const calculateFoundationCementSand = () =>{
  const WallVolume = calculateTotalWallVolume();
  let perimeter = (WallVolume/12)/0.75;
  let height = 4
  
    if(SPT>= 16 && SPT<=30){
        height = 6
    }

     
  
  const foundationVolume = perimeter*height*1.5;
  const inCubicmeter = foundationVolume*0.0283;
  //motar sand and  cement mixture 1:6
  const cement  = 1/7*(0.3*inCubicmeter);
  const cementBags = cement/0.035;
  const sand  = 6/7*(0.3*inCubicmeter);
  // console.log("Cement Bags " + cementBags);
  const sandCubicft = sand *35.3147;
  setfoundationCemet(cementBags);
  setfoundationSand(sandCubicft)
  

}

const calculateFoundationTheBricks = () =>{
  const WallVolume = calculateTotalWallVolume();
  let perimeter = (WallVolume/12)/0.75;
  let height = 4
  
    if(SPT>= 16 && SPT<=30){
        height = 6
    }
  const inCubicmeter = perimeter*0.0283;
  let bricks = inCubicmeter*500;
  console.log("total volume of wall " + inCubicmeter)
  console.log("Number of Bricks " + bricks)
  if(houseType ===  "1 Kanal"){
    bricks = bricks+6940;
  }
  if(houseType ===  "10 Marla"){
  bricks=bricks+2000}
  if(houseType ===  "5 Marla"){
  bricks=bricks+1200
  }
  bricks = bricks +2000
  setfoundationBricks(bricks)
}

const handleHouseTypeChange = (e : React.ChangeEvent<HTMLSelectElement>) => {
  setHouseType(e.target.value)
}


    return (
        <div className="flex-1 space-y-4 p-8 pt-6 justify-center">
            <Heading title="Estimate Cost" description="Estimate your construction using our calculator"/>
            <Separator/>

            {/* Form */}
            <div className='main-container'>
              
            <div className='form-container'>
              <Heading title='Construction Cost Calculator' description='Estimate your cost' />
              <Separator className='mb-5'/>
              <div className="input-group">
                <Label className='text-lg label'>House Size:</Label>
                <Select value={houseType} onValueChange={(value) => setHouseType(value)}>
                  <SelectTrigger className='w-1/4'>
                    <SelectValue placeholder="Select House Size"></SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                      <SelectItem value='5 Marla'>5 Marla</SelectItem>
                      <SelectItem value='10 Marla'>10 Marla</SelectItem>
                      <SelectItem value='1 Kanal'>1 Kanal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
      <div className="input-group">
                <Label className='text-lg label'>Rooms:</Label>
                <Select value={String(rooms)} onValueChange={(value) => setRooms(Number(value))}>
                  <SelectTrigger className='w-1/4 ml-9'>
                    <SelectValue placeholder={rooms}></SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                  {[...Array(max - min + 1).keys()].map((value) => 
                    <SelectItem key={value + min} value={value + min}>{value + min}</SelectItem>
                  )}
                  </SelectContent>
                </Select>
      </div>


      

      {/* for 1 kanal and 10 marla area option */}
      {['1 Kanal', '10 Marla'].includes(houseType) && (
        <div className="input-group">
          <Label className='text-lg label'>Total Covered Area:</Label>
          <Select value={coveredArea} onValueChange={(value) => setCoveredArea(value)}>
                  <SelectTrigger className='w-1/6'>
                    <SelectValue placeholder={rooms}></SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {houseType === '1 Kanal' && <SelectItem value="50%">50%</SelectItem>}
                    <SelectItem value="75%">75%</SelectItem>
                    <SelectItem value="100%">100%</SelectItem>
                  </SelectContent>
                </Select>
        </div>
      )}
      

      {/* for the length and the width of the rooms */}

      <div className=''>
        {/* ... your existing JSX ... */}
        {Array.from({ length: rooms }, (_, index) => (
          <div className='' key={index}>
            <label className='text-lg'>Room {index + 1} Length (ft):</label>
            <input className='border m-2 px-2 py-1 rounded-lg w-20 h-9' type="number" onChange={(e) => handleRoomDimensionChange(index, 'length', e.target.value)} />
            <label className='text-lg'>Room {index + 1} Width (ft):</label>
            <input className='border m-2 px-2 py-1 rounded-lg w-20 h-9' type="number" onChange={(e) => handleRoomDimensionChange(index, 'width', e.target.value)} />
          </div>
        ))}
      </div>
    {errorMessage && <div className="error">{errorMessage}</div>}

        {/* Display error message
          {errorMessage && <div className="error">{errorMessage}</div>} */}

      
        <div className="input-group">
          <Label className='text-lg label'>Stories:</Label>
          <Select value={story} onValueChange={(value) => setStory(value)}>
                  <SelectTrigger className='w-1/4 ml-9'>
                    <SelectValue placeholder={story}></SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='Single'>Single</SelectItem>
                    <SelectItem value='Double'>Double</SelectItem>
                  </SelectContent>
          </Select>
        </div>

          <div className='input-group'>
            <Label className='text-lg label'>Cost Per Brick:</Label>
            <input className='border m-2 px-2 py-1 rounded-lg w-20 h-9' type="number" onChange={(e) => SetCostPerBrick(e.target.value)} />
          </div>

          <div className='input-group'>
            <Label className='text-lg label'>Cost Per Kg of Steel:</Label>
            <input className='border m-2 px-2 py-1 rounded-lg w-20 h-9' type="number" onChange={(e) => SetCostPerKgOfSteel(e.target.value)} />
          </div>

          <div className='input-group'>
            <Label className='text-lg label'>Cost Per Cement Bag:</Label>
            <input className='border m-2 px-2 py-1 rounded-lg w-20 h-9' type="number" onChange={(e) => SetCostPerCementBag(e.target.value)} />
          </div>

          <div className='input-group'>
            <Label className='text-lg label'>
            <input
              type="checkbox"
              className='border m-2 px-2 py-1 rounded-lg'
              onChange={() => setShowInput(!showInput)}
            />
            Soil Test
            </Label>
          </div>

          {showInput && (
        <div className='input-group'>
          <Label className='text-lg label'>
            SPT Value:
          </Label>
          <input type="number" className='border m-2 px-2 py-1 rounded-lg w-20 h-9' onChange={e => setSPT(e.target.value)}/>
        </div>
      )}

      <div className="input-group">
              <Label className='text-lg label'>
                <input 
                  className='border m-2 px-2 py-1 rounded-lg'
                  type="checkbox" 
                  checked={paintOption} 
                  onChange={handlePaintOptionChange} 
                />
                <span>Furnishing Options</span>
              </Label>
      </div>

      {paintOption && (
  <>
   
    <div className="">
      <Label className='text-lg label'>Tile Size:</Label>
      <div>
      <input className="border m-2 px-2 py-1 rounded-lg ml-4" type="text" placeholder="Width in ft" onChange={(e) => setTileWidth(e.target.value)} />
      <input className="border m-2 px-2 py-1 rounded-lg"  type="text" placeholder="Length in ft" onChange={(e) => setTilteLength(e.target.value)} />
      </div>
      
    </div>

    <div className='input-group'>
      <Label className='text-lg label'>Tile Price:</Label>
      <div>
      <input className="border m-2 px-2 py-1 rounded-lg"  type="text" placeholder="Cost per unit" onChange={(e) => setPriceOfPerTile(e.target.value)} />
      </div>
    </div>
    
  </>
)}

 <Button disabled={!!errorMessage} className="flex justify-center mt-4 w-1/2" onClick={calculateTheSlab} >
          Calculate Cost
        </Button>

        </div>

        
        </div>


        {/* Results */}
       
       <div >
        <Heading title="Results" description=''></Heading>
        <Separator className='mb-7'/>
        {/* <Item title='Foundation' description='It includes the cost breakdown of the foundation of the house' cost='20000'/> */}
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'><span><Construction/></span>Foundation</CardTitle>
            <CardDescription>Quantity breakdown of foundation material of the house</CardDescription>
          </CardHeader>
          <CardContent className=''>
            <Item title='Bricks' quantity={(story === 'Double' ? foundationBricks * 2.15 : foundationBricks).toFixed(2)} quantityUnit='Bricks' />
            <Item title='Cement' quantity={Math.round(story === 'Double' ? foundationCement * 2.15 : foundationCement)} quantityUnit='Bags' />
            <Item title="Sand" quantity={(story === 'Double' ? foundationSand * 2.15 : foundationSand).toFixed(2)} quantityUnit='Cubic Feet'/>
          </CardContent>
        </Card>

        <Card className='mt-5'>
          <CardHeader>
            <CardTitle className='flex gap-2 items-center'><span><Home/></span>Gray Structure</CardTitle>
            <CardDescription>Quantity breakdown of the gray structure material including slab, masnory, and plastering</CardDescription>
          </CardHeader>
          <CardContent>
            <div>
              <h3 className='text-3xl font-bold text-gray-700'>Slab</h3>
              <Item title="Cement" quantity= {(story === 'Double' ? SlabResult.cement * 2.15 : SlabResult.cement).toFixed(2)} quantityUnit='Bags'/>
              <Item title="Sand" quantity={(story === 'Double' ? SlabResult.sand * 2.15 : SlabResult.sand).toFixed(2)} quantityUnit='Cubic Feet'/>
              <Item title="Aggregate" quantity={(story === 'Double' ? SlabResult.aggregate * 2.15 : SlabResult.aggregate).toFixed(2)} quantityUnit='Cubic Feet' />
              <Item title="Steel" quantity={(story === 'Double' ? SlabResult.steel * 2.15 : SlabResult.steel).toFixed(2)} quantityUnit='Cubic Feet' />
            </div>
            <div>
              <h3 className='text-3xl font-bold text-gray-700'>Masnory</h3>
              <Item title="Bricks" quantityUnit='Bricks' quantity={(story === 'Double' ? totalBricks * 2.15 : totalBricks).toFixed(2)} />
              <Item title="Cement" quantityUnit='Bags' quantity={Math.round(story === 'Double' ? GreyCement * 2.15 : GreyCement)}  />
              <Item title="Sand" quantityUnit='Cubic Feet' quantity={(story === 'Double' ? GreySand * 2.15 : GreySand).toFixed(2)}/>
            </div>

            <div>
            <h3 className='text-3xl font-bold text-gray-700'>Plastering</h3>
            <Item title="Cement" quantityUnit='Bags' quantity={Math.round(story === 'Double' ? CementPlastring * 2.15 : CementPlastring)}  />
            <Item title='Sand' quantityUnit='Cubic Feet' quantity={(story === 'Double' ? SandPlastring * 2.15 : SandPlastring).toFixed(2)}></Item>
            </div>
          </CardContent> 
        </Card>


        <Card className='mt-5'>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'><span><Banknote/></span>Cost</CardTitle>
            <CardDescription>Cost breakdown of the materials and labor</CardDescription>
          </CardHeader>
          <CardContent>
            <CostItem title="Cement Cost" cost={(story === 'Double' ? CementCost * 2.15 : CementCost).toFixed(2)}></CostItem>
            <CostItem title="Sand Cost" cost={(story === 'Double' ? SandCost * 2.15 : SandCost).toFixed(2)} ></CostItem>
            <CostItem title="Aggregate Cost" cost={(story === 'Double' ? AggregateCost * 2.15 : AggregateCost).toFixed(2)}/>
            <CostItem title="Steel Cost" cost={(story === 'Double' ? SteelCost * 2.15 : SteelCost).toFixed(2)}  />
            <CostItem title="Bricks Cost" cost={(story === 'Double' ? BrickCost * 2.15 : BrickCost).toFixed(2)} />
            <CostItem title="Total Labor Cost" cost={(story === 'Double' ? TotalLabourCost * 2.15 : TotalLabourCost).toFixed(0)}/>
          </CardContent>
        </Card>
        
        <Card className="mt-5">
          <CardHeader className='flex-row items-center justify-between'>
            <div >
            <CardTitle className='flex items-center gap-2'><span><Banknote/></span>Total Cost</CardTitle>
            <CardDescription>Total Cost of the House</CardDescription>
            </div>
            <p className="text-3xl font-bold">{(story === 'Double' ? totalCost * 2 : totalCost).toFixed(2)}{' '}PKR </p>
            
          </CardHeader>
        </Card>

        
        
        {paintOption ? (
          <>

            <Card className='mt-5'>
              <CardHeader>
                <CardTitle>Finishing</CardTitle>
                <CardDescription>Cost breakdown of finishing</CardDescription>
              </CardHeader>
              <CardContent>
                <Item title='Paint' quantityUnit='Litre' quantity={(story === 'Double' ? totalPaint * 2.15 :  totalPaint).toFixed(2)}></Item>
                <Item title="Tiles" quantityUnit='Tiles' quantity={(story === 'Double' ? toTalNumberOfTiles * 2.15 : toTalNumberOfTiles).toFixed(2)}/>
                <CostItem title='Cost of Paint' cost={(story === 'Double' ? TotalCostOfPaint * 2.15 : TotalCostOfPaint).toFixed(2)} ></CostItem>
                <CostItem title="Cost of Tiles" cost={(story === 'Double' ? TotalCostOfTile * 2.15 : TotalCostOfTile).toFixed(2)}></CostItem>
              </CardContent>
            </Card>

            <Card className="mt-5">
              <CardHeader className='flex-row items-center justify-between'>
                <div >
                <CardTitle className='flex items-center gap-2'><span><Banknote/></span>Total Cost with Furnishing</CardTitle>
                <CardDescription>Total Cost of the House with furnishing</CardDescription>
                </div>
                <p className="text-3xl font-bold">{(story === 'Double' ? totalCost * 2.15 : totalCost).toFixed(2)}{' '}PKR </p>
                
              </CardHeader>
            </Card>
          </>
        ) : null}



       </div>
           
        </div>
    );
};

export default ConstructionCalculator;




