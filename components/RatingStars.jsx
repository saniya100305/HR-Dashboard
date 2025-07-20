// components/RatingStars.jsx
export default function RatingStars({ rating }) {
  return (
    <div className="flex space-x-1 text-yellow-400 mt-2">
      {[...Array(5)].map((_, i) => (
        <span key={i}>{i < rating ? '★' : '☆'}</span>
      ))}
    </div>
  );
}
