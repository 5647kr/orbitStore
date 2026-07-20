import { Link } from "react-router";

export function ProductItem(product: Product) {
  return (
    <div className="flex flex-col">
      {/* 이미지 */}
      <div
        className="w-full aspect-square bg-(--surface) mb-4 flex justify-center items-center p-5 relative before:absolute before:w-4.5 before:h-4.5 before:top-2.5 before:left-2.5 before:border-t-2 before:border-l-2 before:border-(--navy) before:transition-all before:duration-250
      
      after:absolute after:w-4.5 after:h-4.5 after:bottom-2.5 after:right-2.5 after:border-b-2 after:border-r-2 after:border-(--navy) after:transition-all after:duration-250
      
      hover:before:w-6 hover:before:h-6 hover:before:border-(--brass)
      hover:after:w-6 hover:after:h-6 hover:after:border-(--brass)
      "
      >
        <Link
          to={`/product/${product.id}`}
          target="_blank"
          className="block w-full h-full"
        >
          <img
            src={product.img}
            alt={product.title}
            className="w-full h-full align-top"
          />
        </Link>
      </div>

      <div className="flex flex-col gap-2">
        <span className="ibm text-xs text-(--muted)">{product.category}</span>
        <h3>
          <Link
            to={`/product/${product.id}`}
            target="_blank"
            className="fraunces w-full text-lg text-(--ink) overflow-hidden text-ellipsis whitespace-nowrap"
          >
            {product.title}
          </Link>
        </h3>
        <span className="text-xs text-(--ink-soft)">
          {product.aperture}mm · f/{product.apertureRatio} ·{" "}
          {product.focalLength}
        </span>
        <strong className="text-base font-semibold">
          ₩{product.price.toLocaleString("ko-KR")}
        </strong>
      </div>
      <Link
        to={`/product/${product.id}`}
        target="_blank"
        className="block mt-3.5 border border-(--navy) py-2 px-4 text-center hover:bg-(--navy) hover:text-(--bg)"
      >
        상세보기
      </Link>
    </div>
  );
}

export function EventItem() {
  return <div>Event</div>;
}
