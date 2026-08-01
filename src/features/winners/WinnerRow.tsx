import { useGetCarQuery } from '../../api/garageApi';
import CarIcon from '../../components/CarIcon';
import type { Winner } from '../../types';

interface WinnerRowProps {
  winner: Winner;
  index: number;
}

function WinnerRow({ winner, index }: WinnerRowProps) {
  const { data: car } = useGetCarQuery(winner.id);

  return (
    <tr>
      <td>{index}</td>
      <td>{car ? <CarIcon color={car.color} size={40} /> : '—'}</td>
      <td>{car?.name ?? '—'}</td>
      <td>{winner.wins}</td>
      <td>{winner.time.toFixed(2)}</td>
    </tr>
  );
}

export default WinnerRow;