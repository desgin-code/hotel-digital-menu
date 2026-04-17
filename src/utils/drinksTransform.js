export const transformDrinksData = (apiData) => {
  const Drinks = {};

  apiData.forEach((category) => {
    if (category.drinks && category.drinks.length > 0) {
      Drinks[category.title] = category.drinks.map((drink) => ({
        id: drink.id,
        title: drink.title,
        discount: drink.discount,
        price: parseFloat(drink.price || 0),
        img: drink.image
          ? `https://manage.hotelsdigitalmenu.com/public/uploads/hotel/drink/${drink.image}`
          : "",
      }));
    }
  });

  return Drinks;
};
