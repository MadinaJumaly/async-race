import { useAppDispatch } from '../../app/hooks';
import { setSort } from './winnersSlice';
import type { SortOrder, WinnersSortField } from '../../types';

interface WinnersTableHeadProps {
  sort: WinnersSortField;
  order: SortOrder;
}

function WinnersTableHead({ sort, order }: WinnersTableHeadProps) {
  const dispatch = useAppDispatch();

  const arrow = (field: WinnersSortField): string => {
    if (sort !== field) return '';
    return order === 'ASC' ? ' ▲' : ' ▼';
  };

  return (
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
  );
}

export default WinnersTableHead;
