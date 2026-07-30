import { useGetCarsQuery } from '../../api/garageApi';
import { useAppSelector } from '../../app/hooks';
import CreateCarForm from './CreateCarForm';
import UpdateCarForm from './UpdateCarForm';
import CarRow from './CarRow';

function GarageView() {
  const page = useAppSelector((state) => state.garage.currentPage);
  const { data, isLoading, isError } = useGetCarsQuery({ page });

  if (isLoading) return <p>Loading garage…</p>;
  if (isError) return <p>Server error — is the mock running on :3000?</p>;

  return (
    <section className="garage">
      <h2>Garage ({data?.totalCount ?? 0})</h2>
      <CreateCarForm />
      <UpdateCarForm />
      <ul className="garage__list">
        {data?.items.map((car) => (
          <CarRow key={car.id} car={car} />
        ))}
      </ul>
    </section>
  );
}

export default GarageView;
