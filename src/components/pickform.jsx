import { useState, useEffect } from 'react';
import api from '../api/api';

export default function PickForm({ gameId }) {
  const [players, setPlayers] = useState([]);
  const [firstGoalId, setFirstGoalId] = useState('');
  const [gwGoalId, setGwGoalId] = useState('');

  // Fetch available players
  useEffect(() => {
    api.get(`/players`) // adjust endpoint if needed
      .then(res => setPlayers(res.data))
      .catch(console.error);
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    api.post('/picks', {
      gameId,
      firstGoalPlayerId: firstGoalId,
      gwGoalPlayerId: gwGoalId
    })
    .then(res => alert('Pick submitted!'))
    .catch(err => alert(err.response.data.error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <select onChange={e => setFirstGoalId(e.target.value)} required>
        <option value="">First Goal</option>
        {players.map(p => (
          <option key={p._id} value={p._id}>{p.name}</option>
        ))}
      </select>
      <select onChange={e => setGwGoalId(e.target.value)} required>
        <option value="">Game-Winning Goal</option>
        {players.map(p => (
          <option key={p._id} value={p._id}>{p.name}</option>
        ))}
      </select>
      <button type="submit">Submit Picks</button>
    </form>
  );
}
