import { Rate } from "antd";
import { Link } from "react-router-dom";

export const renderProducts = (products) => (
  <div className="flex flex-wrap justify-around">
    {products.map((product) => (
      <Link
        to={`/product-detail/${product.id}`}
        key={product.id}
        className="relative w-1/5 m-4 text-center rounded-lg shadow-md"
        // onClick={() => onClick(product.id)}
      >
        {product.discount > 0 ? (
          <div className="absolute px-4 py-5 font-bold text-yellow-300 bg-red-500 rounded-full right-5">
            -<span>{product.discount}</span>%
          </div>
        ) : (
          ""
        )}
        <img
          src={
            product.image === null || product.image === ""
              ? "https://cdn.shopify.com/s/files/1/0761/8769/7443/files/DielacGrowPlus_S2_1400_1.png?v=1699324909&width=2000&height=2000&crop=center"
              : product.image
          }
          alt={product.name}
          className="mx-auto"
        />
        <p className="mx-10 mt-2">{product.name}</p>
        <div className="flex items-center justify-center mt-2 space-x-2">
          <Rate disabled defaultValue={product.rating || 5} />
          <span>({product.reviews || 0})</span>
        </div>
        {product.discount > 0 ? (
          <div className="gap-4 mt-2 text-xl font-bold text-red-500">
            <s>{product.price} VND</s> <span>{product.onDiscountPrice}</span>{" "}
            VND
          </div>
        ) : (
          <div className="mt-2 text-xl font-bold text-red-500">
            {product.price} VND
          </div>
        )}

        {/* <div className="text-gray-500 line-through">{product.price} VND</div> */}
      </Link>
    ))}
  </div>
);
