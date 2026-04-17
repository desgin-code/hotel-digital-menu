import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Layout from "../../layouts/Layout";
import Banner from "../../layouts/Banner/Banner";
import Header from "../../layouts/Header/Header";
import CategoryTabs from "../../components/Category/CategoryTabs";
import CategoryListing from "../../components/Category/CategoryListing";

import { transformDrinksData } from "../../utils/drinksTransform";
import { transformMenuData } from "../../utils/menuTransform";
import { getAllSearchKeys } from "../../utils/getAllSearchKeys";
import { setSearchResults } from "../../redux/features/search/searchFoodSlice";


export default function IndexPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [Foods, setFoods] = useState({});
  const [Drinks, setDrinks] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();
  const searchTerm = useSelector((state) => state.searchFood.searchTerm);
  const searchResults = useSelector((state) => state.searchFood.searchResults);
  const hotel = useSelector((state) => state.hotel.hotel);

  const hotel_id = hotel?.id || null;
  

  // Fetch Foods
  const fetchAllFoodMenu = async () => {
    try {
      const response = await fetch(
        `https://manage.hotelsdigitalmenu.com/api/hotel/foods/${hotel_id}`
      );
      const result = await response.json();
      setFoods(transformMenuData(result.data));
  
    } catch (error) {
      console.error("Error fetching foods:", error);
    }
  };

  // Fetch Drinks
  const fetchAllDrinkMenu = async () => {
    try {
      const response = await fetch(
        `https://manage.hotelsdigitalmenu.com/api/hotel/drinks/${hotel_id}`
      );
      const result = await response.json();
      setDrinks(transformDrinksData(result.data));
    } catch (error) {
      console.error("Error fetching drinks:", error);
    }
  };

  // Load Data
  useEffect(() => {
    const loadData = async () => {
      await Promise.all([fetchAllFoodMenu(), fetchAllDrinkMenu()]);
      setIsLoading(false);
    };
    loadData();
  }, []);

  // Search Effect
  useEffect(() => {
    if (!searchTerm) {
      dispatch(setSearchResults([]));
      return;
    }

    const searchLower = searchTerm.toLowerCase();
    const filteredResults = [];

    const filterData = (dataObj) => {
      for (const category in dataObj) {
        const subData = dataObj[category];

        // If parent category matches search, include all items from subcategories or array
        if (category.toLowerCase().includes(searchLower)) {
          if (Array.isArray(subData)) {
            filteredResults.push({ name: category, items: subData });
          } else if (typeof subData === "object") {
            // Merge all items from subcategories
            const mergedItems = Object.values(subData).flat();
            filteredResults.push({ name: category, items: mergedItems });
          }
          continue; // skip further filtering for this category
        }

        // Otherwise, filter normally
        if (Array.isArray(subData)) {
          const matchedItems = subData.filter((item) =>
            item.title.toLowerCase().includes(searchLower)
          );
          if (matchedItems.length)
            filteredResults.push({ name: category, items: matchedItems });
        } else if (typeof subData === "object") {
          for (const sub in subData) {
            if (sub.toLowerCase().includes(searchLower)) {
              filteredResults.push({ name: sub, items: subData[sub] });
            } else {
              const matchedItems = subData[sub].filter((item) =>
                item.title.toLowerCase().includes(searchLower)
              );
              if (matchedItems.length)
                filteredResults.push({ name: sub, items: matchedItems });
            }
          }
        }
      }
    };

    filterData(Foods);
    filterData(Drinks);

    dispatch(setSearchResults(filteredResults));
  }, [searchTerm, Foods, Drinks, dispatch]);

  // Combine Foods + Drinks / Search
  let dataToRender = {};
  if (searchTerm) {
    dataToRender = searchResults.reduce((acc, cat) => {
      acc[cat.name] = cat.items || [];
      return acc;
    }, {});
  } else {
    if (activeTab === "All") dataToRender = { ...Foods, ...Drinks };
    else if (activeTab === "Foods") dataToRender = Foods;
    else if (activeTab === "Drinks") dataToRender = Drinks;
  }

  const hasResults = dataToRender && Object.keys(dataToRender).length > 0;
  const AllSearch = [...getAllSearchKeys(Foods), ...getAllSearchKeys(Drinks)];

  return (
    <Layout>
      <Banner />
      <Header allItems={AllSearch || []} />
      <CategoryTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {isLoading ? (
        <div className="text-center py-20 text-lg font-semibold text-gray-500">
          Loading menu...
        </div>
      ) : hasResults ? (
        <CategoryListing data={dataToRender } />
      ) : searchTerm ? (
        <div className="text-center py-10 text-lg font-semibold text-gray-500">
          Search result not found
        </div>
      ) : null}
    </Layout>
  );
}
