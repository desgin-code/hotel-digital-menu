import FoodCard from "../Card/FoodCard";

export default function CategoryListing({ data  }) {
  const renderItems = (data) => {
    return Object.keys(data).map((categoryName, i) => {
      const subCat = data[categoryName];

      // Determine if main category has direct items (array)
      const mainItems = Array.isArray(subCat) ? subCat : [];
      // Determine subcategories (object)
      const subCategories = typeof subCat === "object" && !Array.isArray(subCat) ? subCat : null;

      return (
        <div key={i} className="mb-12">
          {/* Main Category Name */}
          <h2 className="text-2xl font-bold mb-4 text-[#5c471c]">{categoryName}</h2>

          {/* Main Category Items */}
          {mainItems.length > 0 && (
            <div className="mb-6 pb-4 border-b border-gray-200/50">
              <FoodCard cat={{ items: mainItems }} />
            </div>
          )}

          {/* Subcategories */}
          {subCategories &&
            Object.keys(subCategories).map((subName, j) => (
              <div key={j} className="mb-8 pb-6 border-b border-gray-200/50">
                <h3 className="text-xl font-semibold mb-3">{subName}</h3>
                <FoodCard cat={{ items: subCategories[subName] }}  />
              </div>
            ))}
        </div>
      );
    });
  };

  return (
    <section className="food-category-listing py-3 bg-white">
      <div className="mx-auto space-y-10 max-w-[92%] md:max-w-7xl">
        {renderItems(data)}
      </div>
    </section>
  );
}
