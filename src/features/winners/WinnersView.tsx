import { useGetWinnersQuery } from '../../api/winnersApi';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { setWinnersPage, setSort } from './winnersSlice';
import { WINNERS_PER_PAGE } from '../../constants';
import Pagination from '../../components/Pagination';
import WinnerRow from './WinnerRow';

function WinnersView() {
  const dispatch = useAppDispatch();
  const { currentPage, sort, order } = useAppSelector((state) => state.winners);
  const { data, isLoading } = useGetWinnersQuery({ page: currentPage, sort, order });

  if (isLoading) return <p>Loading winners…</p>;

  const winners = data?.items ?? [];
  const total = data?.totalCount ?? 0;
  const arrow = (field: 'wins' | 'time') =>
    sort === field ? (order === 'ASC' ? ' ▲' : ' ▼') : '';

  return (
    <section className="winners">
      <h2>Winners ({total})</h2>
      <table className="winners__table">
        <thead>
          <tr>
            <th>№</th>
            <th>Car</th>
            <th>Name</th>
            <th className="winners__sortable" onClick={() => dispatch(setSort('wins'))}>
              Wins{arrow('wins')}
            </th>
            <th className="winners__sortable" onClick={() => dispatch(setSort('time'))}>
              Best time (s){arrow('time')}
            </th>
          </tr>
        </thead>
        <tbody>
          {winners.map((winner, i) => (
            <WinnerRow
              key={winner.id}
              winner={winner}
              index={(currentPage - 1) * WINNERS_PER_PAGE + i + 1}
            />
          ))}
        </tbody>
      </table>
      <Pagination
        page={currentPage}
        totalCount={total}
        perPage={WINNERS_PER_PAGE}
        onChange={(next) => dispatch(setWinnersPage(next))}
      />
    </section>
  );
}

export default WinnersView;
