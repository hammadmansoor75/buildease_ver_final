"use client"

import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@radix-ui/react-dropdown-menu';
import { BaggageClaim, Cuboid, DollarSign, PaintBucket, Weight } from 'lucide-react';
import React, { useState } from 'react'

const ConstructionCalculator = () => {
    const [area, setArea] = useState(0);
    const [unit, setUnit] = useState('Sqft');
    const [houseType, setHouseType] = useState('LuxuryAplusplus');

    // Conversion factor
    const MARLA_TO_SQFT = 272.251;
    const costRanges = {
        LuxuryAplusplus: { min: 3900, max: 4500 },
        LuxuryAplus: { min: 3800, max: 4400 },
        DeluxeA: { min: 3500, max: 3800 },
        GreyStructure: { min: 1950, max: 2400 },
    };

    // Convert area based on the selected unit
    const convertedArea = unit === 'Marla' ? area * MARLA_TO_SQFT : area;

    const calculateCosts = () => {
        const { min, max } = costRanges[houseType];
        const minTotalCost = (convertedArea * min )*2;
        const maxTotalCost = (convertedArea * max)*2;

        // Additional material calculations
        const cementBags = convertedArea * 0.4;
        const sandTons = convertedArea * 0.816;
        const aggregateTons = convertedArea * 0.608;
        const steelKg = convertedArea * 4;
        const paintLitres = convertedArea * 0.18;
        const bricksPcs = convertedArea * 8;
        const flooringSqFt = convertedArea * 13;

        // Costs based on max total cost for simplicity
        const cementCost = 0.164 * maxTotalCost;
        const sandCost = 0.123 * maxTotalCost;
        const aggregateCost = 0.074 * maxTotalCost;
        const steelCost = 0.246 * maxTotalCost;
        const finisherCost = 0.165 * maxTotalCost;
        const fittingCost = 0.228 * maxTotalCost;

        return {
            minTotalCost,
            maxTotalCost,
            cementBags,
            sandTons,
            aggregateTons,
            steelKg,
            paintLitres,
            bricksPcs,
            flooringSqFt,
            cementCost,
            sandCost,
            aggregateCost,
            steelCost,
            finisherCost,
            fittingCost,
        };
    };

    const {
        minTotalCost,
        maxTotalCost,
        cementBags,
        sandTons,
        aggregateTons,
        steelKg,
        paintLitres,
        bricksPcs,
        flooringSqFt,
        cementCost,
        sandCost,
        aggregateCost,
        steelCost,
        finisherCost,
        fittingCost,
    } = calculateCosts();


  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <Heading title="Estimate Cost" description="Estimate your construction using our calculator"/>
        <Separator/>

        <form className='space-y-8 w-full'>
            <div className='grid grid-cols-3 gap-8'>
                <div className="">
                        <label className='text-lg font-bold'>House Type:</label>
                        <select
                            className="border m-2 px-2 py-1 rounded-lg" 
                            value={houseType} 
                            onChange={(e) => setHouseType(e.target.value)}
                        >
                            <option value="LuxuryAplusplus">Luxury House – Category A++</option>
                            <option value="LuxuryAplus">Luxury House – Category A+</option>
                            <option value="DeluxeA">Deluxe House – Category A</option>
                            <option value="GreyStructure">Grey Structure Home</option>
                        </select>
                </div>
                <div className="">
                <label className='text-lg font-bold'>Area:</label>
                <input 
                    className="border m-2 px-2 py-1 rounded-lg"
                    type="number" 
                    value={area} 
                    onChange={(e) => setArea(Number(e.target.value))} 
                />
            </div>
            <div className="">
                <label className='text-lg font-bold'>Unit:</label>
                <select 
                    className="border m-2 px-2 py-1 rounded-lg"
                    value={unit} 
                    onChange={(e) => setUnit(e.target.value)}
                >
                    <option value="Sqft">Square Feet</option>
                    <option value="Marla">Marla</option>
                </select>
            </div>
            </div>
            {/* <Button type='submit'>Calculate</Button> */}
        </form>

        <div className="mt-5 space-y-8 w-full border p-5 rounded-xl">
            <h3 className='text-2xl font-bold'>Cost Estimates:</h3>
            <div className='grid grid-cols-3 gap-8'>

                <p className='space-x-2 flex items-center justify-center'>
                    <DollarSign className='h-7 w-7' />
                    <span className='font-bold text-lg'>Total Construction Cost:</span>
                    <span>{minTotalCost.toFixed(2)} - {maxTotalCost.toFixed(2)} Rs</span>
                </p>
                <p className='space-x-2 flex items-center'>
                    <BaggageClaim className='h-7 w-7' />
                    <span className='font-bold text-lg'>Amount of Cement Required: </span>
                    <span>{cementBags.toFixed(2)} Bags</span>
                </p>
                <p className='space-x-2 flex items-center'>
                    <DollarSign className='h-7 w-7' />
                    <span className='font-bold text-lg'>Cost of Cement: </span>
                    <span>{cementCost.toFixed(2)} Rs</span>
                </p>
                <p className='space-x-2 flex items-center'>
                    <Weight className='h-7 w-7' />
                    <span className='font-bold text-lg'>Amount of Sand Required:</span>
                    <span>{sandTons.toFixed(2)} Ton</span>
                </p>
            
                <p className='space-x-2 flex items-center'>
                    <DollarSign className='h-7 w-7' />
                    <span className='font-bold text-lg'>Cost of Sand:</span>
                    <span> {sandCost.toFixed(2)} Rs</span>
                </p>
                <p className='space-x-2 flex items-center'>
                    <Weight className='h-7 w-7' />
                    <span className='font-bold text-lg'>Amount of Aggregate Required:</span>
                    <span> {aggregateTons.toFixed(2)} Ton</span>
                </p>
                <p className='space-x-2 flex items-center'>
                    <DollarSign className='h-7 w-7' />
                    <span className='font-bold text-lg'>Cost of Aggregate: </span>
                    <span>{aggregateCost.toFixed(2)} Rs</span>
                </p>
                <p className='space-x-2 flex items-center'>
                    <Weight className='h-7 w-7' />
                    <span className='font-bold text-lg'>Amount of Steel Required: </span>
                    <span>{steelKg.toFixed(2)} Kg</span>
                </p>
                <p className='space-x-2 flex items-center'>
                    <DollarSign className='h-7 w-7' />
                    <span className='font-bold text-lg'>Cost of Steel: </span>
                    <span> {steelCost.toFixed(2)} Rs</span>
                </p>
                <p className='space-x-2 flex items-center'>
                    <PaintBucket className='h-7 w-7' />
                    <span className='font-bold text-lg'>Amount of Paint Required:  </span>
                    <span>{paintLitres.toFixed(2)} Litre</span>
                </p>
                <p className='space-x-2 flex items-center'>
                    <Cuboid className='h-7 w-7' />
                    <span className='font-bold text-lg'>Amount of Bricks Required:  </span>
                    <span>{bricksPcs.toFixed(2)} pcs</span>
                </p>
                <p className='space-x-2'>
                    <span className='font-bold text-lg'>Flooring Required: </span>
                    <span>{flooringSqFt.toFixed(2)} sq ft</span>
                </p>
                <p className='space-x-2'>
                    <span className='font-bold text-lg'>Cost of Finishers: </span>
                    <span>{finisherCost.toFixed(2)} Rs</span>
                </p>
                <p className='space-x-2 flex items-center'>
                    <DollarSign className='h-7 w-7' />
                    <span className='font-bold text-lg'>Cost of Fittings: </span>
                    <span>{fittingCost.toFixed(2)} Rs</span>
                </p>
            </div>        
        </div>
      </div>
    </div>
  )
}

export default ConstructionCalculator
