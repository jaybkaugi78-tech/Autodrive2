import CarCard from "./CarCard";

export default function CarList({ cars }) {
  if (!cars.length) {
    return <p className="empty-state">No cars listed yet — check back soon.</p>;
  }

  return (
    <div className="car-list">
      {cars.map((car) => (
        <CarCard key={car.id} car={car} />
      ))}
    </div>
  );
}
