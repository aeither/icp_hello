import { icp_hello_backend } from "declarations/icp_hello_backend";
import { useState } from 'react';

function App() {
  const [name, setName] = useState('');
  const [greeting, setGreeting] = useState('');
  const [names, setNames] = useState([]);
  const [showNames, setShowNames] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await icp_hello_backend.greet(name);
      setGreeting(response);
      setName('');
      // Refresh names list after submission
      await fetchNames();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchNames = async () => {
    try {
      const submittedNames = await icp_hello_backend.getSubmittedNames();
      setNames(submittedNames);
    } catch (error) {
      console.error('Error fetching names:', error);
    }
  };

  const toggleNames = async () => {
    if (!showNames) {
      await fetchNames();
    }
    setShowNames(!showNames);
  };

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h1 className="text-2xl font-bold mb-4">ICP Greeter</h1>
      
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          className="border p-2 mr-2 rounded"
          required
        />
        <button 
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Greet
        </button>
      </form>

      {greeting && (
        <div className="mb-4 p-4 bg-green-100 rounded">
          {greeting}
        </div>
      )}

      <button
        type='button'
        onClick={toggleNames}
        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
      >
        {showNames ? 'Hide Names' : 'Show Submitted Names'}
      </button>

      {showNames && names.length > 0 && (
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-2">Submitted Names:</h2>
          <ul className="list-disc pl-5">
            {names.map((name, index) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
<li key={index}>{name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;