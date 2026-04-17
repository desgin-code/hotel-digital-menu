import CurrencySymbol from "../Currency/CurrencySymbol";

export default function ItemDetails({
  item,
  onClose,
  handleAddToCart,
  items,
  handleDecrease,
}) {
  const cartItem = items.find((i) => i.id === item.id);

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-end  pb-[60px]  " style={{ zIndex: 999999 }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-t-2xl shadow-lg w-full p-6 relative max-h-[90vh]  overflow-y-auto transition-transform transform animate-slideUp "
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black text-2xl"
        >
          ×
        </button>

        {/* Main item details */}
        <div className="flex flex-col md:flex-row gap-4 mt-4 ">
          <img
            src={item.img}
            alt={item.title}
            className="w-20 h-20 object-cover rounded-lg shadow-md"
          />

          <div className="flex flex-1 items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-1">{item.title}</h2>
              <p className="text-gray-600 mb-3">{item.desc}</p>

              <div className="flex items-center space-x-2">
                <span className="line-through text-gray-400 text-sm font-bold">
                  <CurrencySymbol /> {item.price}
                </span>
                <span className="font-bold text-[#e68900]">
                  <CurrencySymbol /> {Math.round(item.price - (item.price * (item.discount / 100)))}

                </span>

              </div>




            </div>

            {/* Add to cart */}
            <div className="flex flex-col justify-center items-center">
              {cartItem ? (
                <div className="flex items-center border-2 border-[#e68900] h-8 rounded-[15px] px-3">
                  <button
                    className="text-red-500 font-bold text-lg"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDecrease(item);
                    }}
                  >
                    -
                  </button>
                  <span className="mx-2 font-semibold">
                    {cartItem.quantity}
                  </span>
                  <button
                    className="text-[#e68900] font-bold text-lg"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(item);
                    }}
                  >
                    +
                  </button>
                </div>
              ) : (
                <button
                  className="bg-[#e68900] text-white w-10 h-10 flex items-center justify-center rounded-lg text-lg hover:bg-[#cc7700] transition"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCart(item);
                  }}
                >
                  +
                </button>
              )}
            </div>
          </div>
        </div>

        {/* More Options */}
        {item.foodOptions && item.foodOptions.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4 border-b-2 border-[#e68900] inline-block pb-1">
              More Options
            </h3>

            <div className="space-y-4 mb-10">
              {item.foodOptions.map((opt) => {
                const optCartItem = items.find((i) => i.id === opt.id);
                return (
                  <div
                    key={opt.id}
                    className="flex items-center justify-between bg-white rounded-2xl p-4 shadow-md hover:shadow-lg transition duration-300"
                  >
                    {/* Left: Image + Info */}
                    <div className="flex items-center gap-4">
                      <img
                        src={opt.img}
                        alt={opt.title}
                        className="w-12 h-12 object-cover rounded-lg shadow-sm"
                      />
                      <div className="flex flex-col">
                        <h4 className="font-semibold text-gray-800 text-base md:text-lg">
                          {opt.title}
                        </h4>
                        <div className="flex gap-3 items-center mt-1">
                          <span className="line-through text-gray-400 text-sm font-bold">
                            <CurrencySymbol /> {opt.price}
                          </span>
                          <span className="text-[#e68900] font-bold">
                            <CurrencySymbol /> {Math.round(opt.price - (opt.price * (opt.discount / 100)))}
                          </span>

                        </div>
                      </div>
                    </div>

                    {/* Right: Add to Cart */}
                    <div>
                      {optCartItem ? (
                        <div className="flex items-center border-2 border-[#e68900] rounded-full px-3 py-1 bg-white shadow-sm">
                          <button
                            className="text-red-500 font-bold text-lg px-2"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDecrease(opt);
                            }}
                          >
                            -
                          </button>
                          <span className="mx-2 font-semibold">
                            {optCartItem.quantity}
                          </span>
                          <button
                            className="text-[#e68900] font-bold text-lg px-2"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAddToCart(opt);
                            }}
                          >
                            +
                          </button>
                        </div>
                      ) : (
                        <button
                          className="bg-[#e68900] text-white w-10 h-10 flex items-center justify-center rounded-lg text-lg hover:bg-[#cc7700] transition-shadow shadow-md"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAddToCart(opt);
                          }}
                        >
                          +
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
