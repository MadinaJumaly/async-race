import { useGetCarsQuery, useGenerateCarsMutation } from '../../api/garageApi';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { setGaragePage } from './garageSlice';
import { CARS_PER_PAGE } from '../../constants';
import CreateCarForm from './CreateCarForm';
import UpdateCarForm from './UpdateCarForm';
import CarRow from './CarRow';
import Pagination from '../../components/Pagination';

function GarageView() {
  const dispatch = useAppDispatch();
  const page = useAppSelector((state) => state.garage.currentPage);
  const { data, isLoading, isError } = useGetCarsQuery({ page });
  const [generateCars, { isLoading: isGenerating }] = useGenerateCarsMutation();

  if (isLoading) return <p>Loading garage…</p>;
  if (isError) return <p>Server error — is the mock running on :3000?</p>;

  const total = data?.totalCount ?? 0;

  return (
    <section className="garage">
      <h2>Garage ({total})</h2>
      <CreateCarForm />
      <UpdateCarForm />
      <button type="button" onClick={() => generateCars()} disabled={isGenerating}>
        {isGenerating ? 'Generating…' : 'Generate Cars'}
      </button>
      <ul className="garage__list">
        {data?.items.map((car) => (
          <CarRow key={car.id} car={car} />
        ))}
      </ul>
      <Pagination
        page={page}
        totalCount={total}
        perPage={CARS_PER_PAGE}
        onChange={(next) => dispatch(setGaragePage(next))}
      />
    </section>
  );
}

export default GarageView;
