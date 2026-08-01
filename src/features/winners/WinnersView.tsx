import { useGetWinnersQuery } from '../../api/winnersApi';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { setWinnersPage } from './winnersSlice';
import { WINNERS_PER_PAGE } from '../../constants';
import Pagination from '../../components/Pagination';
import WinnerRow from './WinnerRow';
import WinnersTableHead from './WinnersTableHead';

function WinnersView() {
  const dispatch = useAppDispatch();
  const { currentPage, sort, order } = useAppSelector((state) => state.winners);
  const { data, isLoading } = useGetWinnersQuery({ page: currentPage, sort, order });

  if (isLoading) return <p>Loading winners…</p>;

  const winners = data?.items ?? [];
  const total = data?.totalCount ?? 0;

  return (
    <section className="winners">
      <h2>Winners ({total})</h2>
      <table className="winners__table">
        <WinnersTableHead sort={sort} order={order} />
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
