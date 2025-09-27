export default function WishListCard({ item, onRemove, onAddToCart, onView }) {
  return (
    <div className="border rounded-xl p-3 hover:shadow-sm transition">
      <div className="aspect-video overflow-hidden rounded-md bg-gray-50">
        {item.image_url ? (
          <img src={item.image_url} alt={item.title} loading="lazy" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full" />
        )}
      </div>

      <div className="mt-3">
        <div className="text-sm text-gray-500">#{item.product_id}</div>
        <div className="font-medium mt-1 line-clamp-2">{item.title || "Item"}</div>
        <div className="mt-1 text-sm text-gray-600">
          {item.price != null ? `${item.price} JOD` : ""}
        </div>
      </div>

      <div className="flex gap-2 mt-4">
        <button onClick={onView} className="px-3 py-2 rounded-lg border w-full">View Details</button>
        <button onClick={onRemove} className="px-3 py-2 rounded-lg border w-full">Remove</button>
      </div>

      <button onClick={onAddToCart} className="mt-2 w-full px-3 py-2 rounded-lg border">Add to Cart 🛒</button>
    </div>
  );
}
