import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from './ui/Card.jsx';
import { Button } from './ui/Button.jsx';
import hogs from '../porkers_data.js'; // Import the hogs data


// HogTile component stays the same...
const HogTile = ({ hog, onToggleDetails, showDetails, onHide }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{hog.name}</CardTitle>
        <img 
          src={hog.image} 
          alt={hog.name}
          className="w-full h-48 object-cover rounded-md mt-4"
        />
      </CardHeader>
      <CardContent>
        {showDetails && (
          <div className="space-y-2">
            <p><strong>Specialty:</strong> {hog.specialty}</p>
            <p><strong>Weight:</strong> {hog.weight} tons</p>
            <p><strong>Greased:</strong> {hog.greased ? "Yes" : "No"}</p>
            <p><strong>Highest Medal:</strong> {hog.highestMedal}</p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button 
          onClick={() => onToggleDetails(hog.name)}
          variant="outline"
          className="mr-2"
        >
          {showDetails ? "Hide Details" : "Show Details"}
        </Button>
        <Button 
          onClick={() => onHide(hog.name)}
          variant="destructive"
        >
          Hide Hog
        </Button>
      </CardFooter>
    </Card>
  );
};

// AddHogForm component stays the same...
const AddHogForm = ({ onAddHog }) => {
  // ... same code as before
};

const App = () => {
  const [allHogs, setAllHogs] = useState(hogs); // Use imported hogs data
  const [visibleHogs, setVisibleHogs] = useState(hogs.map(hog => hog.name));
  const [showDetailsFor, setShowDetailsFor] = useState([]);
  const [greasedOnly, setGreasedOnly] = useState(false);
  const [sortBy, setSortBy] = useState("name");

  const toggleDetails = (hogName) => {
    setShowDetailsFor(prev => 
      prev.includes(hogName) 
        ? prev.filter(name => name !== hogName)
        : [...prev, hogName]
    );
  };

  const hideHog = (hogName) => {
    setVisibleHogs(prev => prev.filter(name => name !== hogName));
  };

  const addHog = (newHog) => {
    setAllHogs(prev => [...prev, newHog]);
    setVisibleHogs(prev => [...prev, newHog.name]);
  };

  const filteredAndSortedHogs = allHogs
    .filter(hog => visibleHogs.includes(hog.name))
    .filter(hog => !greasedOnly || hog.greased)
    .sort((a, b) => {
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      }
      return a.weight - b.weight;
    });

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={greasedOnly}
            onChange={(e) => setGreasedOnly(e.target.checked)}
            className="h-4 w-4"
          />
          <label>Show Only Greased Hogs</label>
        </div>
        
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="name">Sort by Name</option>
          <option value="weight">Sort by Weight</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAndSortedHogs.map(hog => (
          <HogTile
            key={hog.name}
            hog={hog}
            showDetails={showDetailsFor.includes(hog.name)}
            onToggleDetails={toggleDetails}
            onHide={hideHog}
          />
        ))}
      </div>

      <AddHogForm onAddHog={addHog} />
    </div>
  );
};

export default App;