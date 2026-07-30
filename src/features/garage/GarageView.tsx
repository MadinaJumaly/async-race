import { useGetCarsQuery } from '../../api/garageApi';

function GarageView() {
  const { data, isLoading, isError } = useGetCarsQuery({ page: 1 });

  if (isLoading) return <p>Loading garage…</p>;
  if (isError) return <p>Server error — is the mock running on :3000?</p>;

  return (
    <section className="garage">
      <h2>Garage ({data?.totalCount ?? 0})</h2>
      <ul>
        {data?.items.map((car) => (
          <li key={car.id} style={{ color: car.color }}>
            {car.name}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default GarageView;
