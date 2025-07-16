import { useEffect, useState } from 'react';
import api from '../api/api';

export default function Leaderboard() {
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    api.get('/leaderboard')
      .then(res => setLeaders(res.data))
      .catch(console.error);
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>User</th>
          <th>Points</th>
        </tr>
      </thead>
      <tbody>
        {leaders.map((u, i) => (
          <tr key={u._id}>
            <td>{u.username}</td>
            <td>{u.points}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
