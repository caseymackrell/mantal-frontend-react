import '../../App.css'
import './homeFeed.css'
import React, { useState, useEffect } from 'react';



function HomeFeed() {
  
const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pageNumber, setPageNumber] = useState(0);
  const [limit, setLimit] = useState(12);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:3000/workout`);
        const result = await response.json();
        setWorkouts(result.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    }
    fetchData();
  }, [pageNumber, limit]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div>
      {workouts.map((workout) => (
        <div key={workout._id}>
          <h3>{workout.name}</h3>
          <p>{workout.description}</p>
        </div>
      ))}
    </div>
  );
}

export default HomeFeed