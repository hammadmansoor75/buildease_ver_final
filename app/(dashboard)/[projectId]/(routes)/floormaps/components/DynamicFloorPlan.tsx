    


import React, { useState, useEffect } from 'react';

const DynamicFloorPlan = ({data , index , plotLength , plotWidth}) => {
    const { rooms } = data;
   
    // console.log(index)
    const [scale, setScale] = useState(3); // Initial scale factor
    const [svgSize, setSvgSize] = useState({ width: 0, height: 0 });
    const [activeRoom, setActiveRoom] = useState(null);
    const [dragStart, setDragStart] = useState(null);
    const [updatedRooms, setUpdatedRooms] = useState(rooms);
    const [resizingCorner, setResizingCorner] = useState(null);
    const [resizingSide, setResizingSide] = useState(null);
    const [boundary, setBoundary] = useState([]);

    useEffect(() => {
        let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    
        Object.values(updatedRooms).forEach(room => {
            room.coordinates.forEach(([x, y]) => {
                minX = Math.min(minX, x);
                minY = Math.min(minY, y);
                maxX = Math.max(maxX, x);
                maxY = Math.max(maxY, y);
            });
        });
    
        setSvgSize({
            width: (maxX + 1) * scale,
            height: (maxY + 1) * scale
        });
    
        // Set the boundary
        setBoundary([[minX, minY], [maxX, minY], [maxX, maxY], [minX, maxY]]);
    }, [updatedRooms, scale]);

    const handleMouseDown = (e, roomName) => {
        setActiveRoom(roomName);
        setDragStart({ x: e.clientX, y: e.clientY });
        setResizingCorner(null);
        setResizingSide(null);
    };

    const handleMouseMove = (e) => {
        if (!activeRoom || !dragStart) return;

        const dx = (e.clientX - dragStart.x) / scale;
        const dy = (e.clientY - dragStart.y) / scale;

        setUpdatedRooms(prevRooms => {
            const newRooms = { ...prevRooms };
            const roomCoords = newRooms[activeRoom].coordinates;
            const newCoords = [...roomCoords];

            if (resizingCorner != null) {
                newCoords[resizingCorner] = [roomCoords[resizingCorner][0] + dx, roomCoords[resizingCorner][1] + dy];
            } else if (resizingSide != null) {
                if (resizingSide === 'bottom') {
                    newCoords[2] = [newCoords[2][0], newCoords[2][1] + dy];
                    newCoords[3] = [newCoords[3][0], newCoords[3][1] + dy];
                } else if (resizingSide === 'left') {
                    newCoords[0] = [newCoords[0][0] + dx, newCoords[0][1]];
                    newCoords[3] = [newCoords[3][0] + dx, newCoords[3][1]];
                } else if (resizingSide === 'right') {
                    newCoords[1] = [newCoords[1][0] + dx, newCoords[1][1]];
                    newCoords[2] = [newCoords[2][0] + dx, newCoords[2][1]];
                }
            } else {
                newCoords.forEach((point, index) => {
                    newCoords[index] = [point[0] + dx, point[1] + dy];
                });
            }

            newRooms[activeRoom].coordinates = newCoords;
            return newRooms;
        });

        setDragStart({ x: e.clientX, y: e.clientY });
    };

    const handleMouseUp = () => {
        setActiveRoom(null);
        setDragStart(null);
        setResizingCorner(null);
        setResizingSide(null);
    };

    const handleResizeMouseDown = (e, roomName, cornerIndex) => {
        e.stopPropagation(); // Prevent triggering drag event
        setActiveRoom(roomName);
        setDragStart({ x: e.clientX, y: e.clientY });
        setResizingCorner(cornerIndex);
    };

    const handleEdgeMouseDown = (e, roomName, side) => {
        e.stopPropagation(); // Prevent triggering corner resize event
        setActiveRoom(roomName);
        setDragStart({ x: e.clientX, y: e.clientY });
        setResizingSide(side);
    };

    const renderRooms = () => {
        const pixelsPerFoot = 18; // 50 pixels represent 1 foot
    
        return Object.entries(updatedRooms).map(([roomName, roomData]) => {
            const roomCoordinates = roomData.coordinates;
            const labelX = roomCoordinates.reduce((sum, point) => sum + point[0], 0) / roomCoordinates.length;
            const labelY = roomCoordinates.reduce((sum, point) => sum + point[1], 0) / roomCoordinates.length;
    
            // Calculate length and width in pixels
            const lengthPixels = Math.max(...roomCoordinates.map(point => point[0])) - Math.min(...roomCoordinates.map(point => point[0]));
            const widthPixels = Math.max(...roomCoordinates.map(point => point[1])) - Math.min(...roomCoordinates.map(point => point[1]));
    
            // Convert length and width from pixels to feet
            const lengthFeet = lengthPixels / pixelsPerFoot;
            const widthFeet = widthPixels / pixelsPerFoot;
    
            return (
                <g key={roomName}>
                    <text
                        x={labelX * scale} // Assuming 'scale' is for display scaling
                        y={labelY * scale}
                        textAnchor="middle"
                        fill="black"
                    >
                        {roomName}
                    </text>
                    <text
                        x={labelX * scale} // Adjust for display scaling if necessary
                        y={(labelY * scale) + 15} // Adjust as needed
                        textAnchor="middle"
                        fill="black"
                        fontSize={10}
                    >
                        {`${Math.round(lengthFeet * scale)}ft X ${Math.round(widthFeet * scale)}ft`} 
                    </text>
                </g>
            );
        });
    };
    
    const minX = Math.min(...boundary.map(point => point[0])) * scale;
    const minY = Math.min(...boundary.map(point => point[1])) * scale;
    const maxX = Math.max(...boundary.map(point => point[0])) * scale;
    const maxY = Math.max(...boundary.map(point => point[1])) * scale;

    return (
        <div className="relative" onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
            <div className='text-center'>
                <label className="block text-sm font-bold text-gray-700">Floor Plan {index}  </label>
            </div>

            <svg width={800} height={800} className="mt-5" style={{border: '3px solid #000'}}>
                {Object.entries(updatedRooms).map(([roomName, roomData], index) => (
                    <g key={index}>
                        <polygon
                            points={roomData.coordinates.map(point => `${point[0] * scale},${point[1] * scale}`).join(' ')}
                            fill="#ADD8E6"
                            stroke="#000000"
                            strokeWidth="2"
                            onMouseDown={(e) => handleMouseDown(e, roomName)}
                            className="room"
                        />
                        {roomData.coordinates.map((point, idx) => (
                            <circle
                                key={idx}
                                cx={point[0] * scale}
                                cy={point[1] * scale}
                                r={5}
                                fill="transparent"
                                onMouseDown={(e) => handleResizeMouseDown(e, roomName, idx)}
                                className="resize-handle"
                            />
                        ))}
                        <rect
                            x={(roomData.coordinates[2][0] + roomData.coordinates[3][0]) / 2 * scale - 2.5}
                            y={roomData.coordinates[2][1] * scale - 5}
                            width={5}
                            height={10}
                            fill="transparent" // Change this to the background color or make it transparent
                            onMouseDown={(e) => handleEdgeMouseDown(e, roomName, 'bottom')}
                            className="edge-handle"
                        />
                        <rect
                            x={roomData.coordinates[0][0] * scale - 5}
                            y={(roomData.coordinates[0][1] + roomData.coordinates[3][1]) / 2 * scale - 2.5}
                            width={10}
                            height={5}
                            fill="transparent" // Change this to the background color or make it transparent
                            onMouseDown={(e) => handleEdgeMouseDown(e, roomName, 'left')}
                            className="edge-handle"
                        />
                        <rect
                            x={roomData.coordinates[1][0] * scale - 5}
                            y={(roomData.coordinates[1][1] + roomData.coordinates[2][1]) / 2 * scale - 2.5}
                            width={10}
                            height={5}
                            fill="transparent" // Change this to the background color or make it transparent
                            onMouseDown={(e) => handleEdgeMouseDown(e, roomName, 'right')}
                            className="edge-handle"
                        />
                    </g>
                ))}
                <polygon
                    points={boundary.map(point => `${point[0] * scale},${point[1] * scale}`).join(' ')}
                    fill="none"
                    stroke="#000000"
                    strokeWidth="5"
                    className="boundary"
                />
            <text x={minX-25} y={(minY + maxY) / 2 - 20} fill="#000000">
    {` ${plotLength}`}
</text>
<text x={(minX + maxX) / 2} y={maxY + 20} fill="#000000">
    {` ${plotWidth}`}
</text>
                        

                {renderRooms()}
            </svg>      
             </div>
    );
};

export default DynamicFloorPlan;

