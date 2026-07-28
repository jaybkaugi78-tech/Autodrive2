import { Link } from "react-router-dom";

export default function CarCard({ car, currentUserId, isAdmin, onDelete }) {
  const canDelete = onDelete && (car.seller_id === currentUserId || isAdmin);

  function handleDeleteClick(e) {
    e.preventDefault();  // stop the card's own Link from navigating
    e.stopPropagation();
    if (window.confirm("Delete this listing?")) {
      onDelete(car.id);
    }
  }

  return (
    <Link to={`/cars/${car.id}`} className="car-card">
      <div
        className="car-card__media"
        style={
          car.image_url
            ? { backgroundImage: `url(${car.image_url})`, backgroundSize: "cover", backgroundPosition: "center" }
            : undefined
        }
      >
        {!car.image_url && <span>{car.year}</span>}
      </div>
      <div className="car-card__body">
        <h3>
          {car.make} {car.model}
        </h3>
        <p className="car-card__price">${Number(car.price).toLocaleString()}</p>
        <p className="car-card__meta">{Number(car.mileage).toLocaleString()} mi</p>
        {canDelete && (
          <button className="car-card__delete" onClick={handleDeleteClick}>
            Delete
          </button>
        )}
      </div>
    </Link>
  );
}