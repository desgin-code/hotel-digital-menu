const BASE_URL = "https://manage.hotelsdigitalmenu.com/public/uploads/hotel/menu/foodItem";

export const transformMenuData = (apiData) => {
  const menu = {};

  apiData.forEach((category) => {
    const categoryObj = {};

    // Process sub-categories with items
    if (Array.isArray(category.sub_categories) && category.sub_categories.length > 0) {
      category.sub_categories.forEach((sub) => {
        if (Array.isArray(sub.items) && sub.items.length > 0) {
          categoryObj[sub.title] = sub.items.map((item) => ({
            id: item.id,
            title: item.name,
            discount: item.discount,
            price: parseFloat(item.price || 0),
            img: item.image ? `${BASE_URL}/${item.image}` : "",
            desc: item.desc || "",
            foodOptions: Array.isArray(item.food_options)
              ? item.food_options.map((opt) => ({
                id: opt.id,
                title: opt.title,
                discount: opt.discount,
                price: parseFloat(opt.price || 0),
                img: opt.image
                  ? `https://manage.hotelsdigitalmenu.com/public/uploads/hotel/menu/foodOption/${opt.image}`
                  : "",
                quantity: opt.quantity || 1,
              }))
              : [],
          }));
        }
      });
    }

    // Process top-level items
    if (Array.isArray(category.items) && category.items.length > 0) {
      categoryObj[""] = category.items.map((item) => ({
        id: item.id,
        title: item.name,
        discount: item.discount,
        price: parseFloat(item.price || 0),
        img: item.image ? `${BASE_URL}/${item.image}` : "",
        desc: item.desc || "",
        foodOptions: Array.isArray(item.food_options)
          ? item.food_options.map((opt) => ({
            id: opt.id,
            title: opt.title,
            discount: opt.discount,
            price: parseFloat(opt.price || 0),
            img: opt.image
              ? `https://manage.hotelsdigitalmenu.com/public/uploads/hotel/menu/foodOption/${opt.image}`
              : "",
            quantity: opt.quantity || 1,
          }))
          : [],
      }));
    }

    if (Object.keys(categoryObj).length > 0) {
      if (Object.keys(categoryObj).length === 1 && categoryObj[""]) {
        menu[category.title] = categoryObj[""];
      } else {
        menu[category.title] = categoryObj;
      }
    }
  });

  return menu;
};