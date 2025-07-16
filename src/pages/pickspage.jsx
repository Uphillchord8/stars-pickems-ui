import PickForm from '../components/pickform';

export default function PicksPage() {
  const gameId = 'YOUR_GAME_ID_HERE'; // pull dynamically as needed

  return (
    <div>
      <h2>Make Your Picks</h2>
      <PickForm gameId={gameId} />
    </div>
  );
}
