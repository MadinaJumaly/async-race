import { useEffect } from 'react';
import { useGetCarsQuery, useGenerateCarsMutation } from '../../api/garageApi';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { setGaragePage } from './garageSlice';
import { CARS_PER_PAGE } from '../../constants';
import CreateCarForm from './CreateCarForm';
import UpdateCarForm from './UpdateCarForm';
import CarRow from './CarRow';
import Pagination from '../../components/Pagination';
import RaceControls from '../race/RaceControls';

function GarageView() {
  const dispatch = useAppDispatch();
  const page = useAppSelector((state) => state.garage.currentPage);
  const { data, isLoading, isError } = useGetCarsQuery({ page });
  const [generateCars, { isLoading: isGenerating }] = useGenerateCarsMutation();

  const total = data?.totalCount ?? 0;
  const cars = data?.items ?? [];

  useEffect(() => {
    if (!isLoading && cars.length === 0 && total > 0 && page > 1) {
      dispatch(setGaragePage(page - 1));
    }
  }, [cars.length, total, page, isLoading, dispatch]);

  if (isLoading) return <p>Loading garage…</p>;
  if (isError) return <p>Server error — is the mock running on :3000?</p>;

  return (
    <section className="garage">
      <h2>Garage ({total})</h2>
      <CreateCarForm />
      <UpdateCarForm />
      <button type="button" onClick={() => generateCars()} disabled={isGenerating}>
        {isGenerating ? 'Generating…' : 'Generate Cars'}
      </button>
      <RaceControls cars={cars} />
      {cars.length === 0 ? (
        <p className="garage__empty">No cars in the garage.</p>
      ) : (
        <ul className="garage__list">
          {cars.map((car) => (
            <CarRow key={car.id} car={car} />
          ))}
        </ul>
      )}
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
