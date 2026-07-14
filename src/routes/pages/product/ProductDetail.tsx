import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { fetchOneData } from "../../../api/fetchData";
import { ProductDetailSkeleton } from "../../../components/Skeleton";
import { Copy, Minus, Plus } from "lucide-react";
import { useCartStore } from "../../../store/useCartStore";
import { useCheckoutStore } from "../../../store/useCheckoutStore";
import { useAuthStore } from "../../../store/useAuthStore";
import { useCompareStore } from "../../../store/useCompareStore";

export default function ProductDetail() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState<Product>();
  const { id } = useParams();
  const [count, setCount] = useState(1);
  const { addItem } = useCartStore();
  const { setOrderItem } = useCheckoutStore();
  const navigate = useNavigate();
  const { isLoggedIn } = useAuthStore();
  const { compareId, addProduct } = useCompareStore();

  useEffect(() => {
    if (!id) return;
    const loadData = async () => {
      try {
        setIsLoading(true);
        setError(false);

        const product = await fetchOneData("product", id);

        setData(product);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [id]);

  const handleDecrease = () => {
    if (count <= 1) return;
    setCount((count) => count - 1);
  };

  const handleIncrease = () => {
    setCount((count) => count + 1);
  };

  if (isLoading || !data) return <ProductDetailSkeleton />;

  if (error) {
    window.alert("제품 정보를 불러올 수 없습니다.");
  }

  const handleAddCart = () => {
    addItem({
      id: data?.id,
      img: data?.img,
      title: data?.title,
      price: data?.price,
      category: data?.category,
      aperture: data?.aperture,
      apertureRatio: data?.apertureRatio,
      quantity: count,
    });

    if (isLoggedIn) {
      if (
        window.confirm("장바구니에 담겼습니다. 장바구니로 이동하시겠습니까?")
      ) {
        navigate("/cart");
      } else {
        return;
      }
    } else {
      window.alert("로그인이 필요합니다. 로그인페이지로 이동합니다.");
      navigate("/login?redirect=/cart");
    }
  };

  const handleCheckout = () => {
    setOrderItem([
      {
        id: data?.id,
        img: data?.img,
        title: data?.title,
        price: data?.price,
        category: data?.category,
        aperture: data?.aperture,
        apertureRatio: data?.apertureRatio,
        quantity: count,
      },
    ]);

    if (isLoggedIn) {
      navigate("/checkout");
    } else {
      window.alert("로그인이 필요합니다. 로그인페이지로 이동합니다.");
      navigate("/login?redirect=/checkout");
    }
  };

  return (
    <section className="py-10">
      <div className="max-w-7xl p-5 mx-auto">
        {/* 네비게이션 */}
        <div className="mb-5">
          <span className="flex gap-px text-xs lg:text-sm">
            홈&nbsp; / &nbsp;<Link to="/product">제품</Link>&nbsp; /&nbsp;{" "}
            {data.title}
          </span>
        </div>

        {/* 제품 정보란 */}
        <div className="flex gap-16">
          {/* 이미지 */}
          <div
            className="w-full max-w-125 max-h-125 aspect-square bg-(--surface) mb-4 flex justify-center items-center relative before:absolute before:w-4.5 before:h-4.5 before:top-2.5 before:left-2.5 before:border-t-2 before:border-l-2 before:border-(--navy) before:transition-all before:duration-250
      
      after:absolute after:w-4.5 after:h-4.5 after:bottom-2.5 after:right-2.5 after:border-b-2 after:border-r-2 after:border-(--navy) after:transition-all after:duration-250
      
      hover:before:w-6 hover:before:h-6 hover:before:border-(--brass)
      hover:after:w-6 hover:after:h-6 hover:after:border-(--brass)
      "
          >
            <img src={data.img} alt={data.title} />
          </div>

          <div className="w-full">
            {/* 카테고리 */}
            <div className="flex items-center justify-between">
              <span className="text-xs lg:text-sm text-(--brass)">
                {data.brand}&nbsp; · &nbsp;
                {data.category}
              </span>
              <button
                type="button"
                className={`flex items-center gap-2 border py-2.5 px-5 hover:border-(--navy) text-xs ${compareId.includes(data.id) ? "border-(--brass) bg-(--brass-soft)" : "border-(--line) bg-(--bg)"}`}
                onClick={() => addProduct(data)}
              >
                <Copy strokeWidth={1} size={16} stroke="var(--navy)" />
                {compareId.includes(data.id) ? "비교함에 담김" : "비교함 담기"}
              </button>
            </div>
            {/* 제품명 */}
            <h2 className="fraunces mt-2.5 text-3xl">{data.title}</h2>
            {/* 가격 */}
            <strong className="fraunces block text-3xl mt-4.5">
              ₩{data.price.toLocaleString("ko-KR")}
            </strong>
            {/* 설명 */}
            <p className="fz-sm break-keep mt-4.5 text-(--ink-soft)">
              {data.desc}
            </p>
            {/* 스펙 */}

            <div className="mt-8 border-t border-(--line)">
              <ul>
                <li className="py-3.5 border-b border-(--line) flex justify-between items-center">
                  <span className="text-sm text-(--ink-soft)">
                    구경 (APERTURE)
                  </span>
                  <p className="text-sm font-semibold">{data.aperture}mm</p>
                </li>
                <li className="py-3.5 border-b border-(--line) flex justify-between itens-center">
                  <span className="text-sm text-(--ink-soft)">
                    초점거리 (FOCAL LENGTH)
                  </span>
                  <p className="text-sm font-semibold">{data.focalLength}mm</p>
                </li>
                <li className="py-3.5 border-b border-(--line) flex justify-between itens-center">
                  <span className="text-sm text-(--ink-soft)">
                    초점비 (FOCAL RATIO)
                  </span>
                  <p className="text-sm font-semibold">
                    {data.apertureRatio}mm
                  </p>
                </li>
                <li className="py-3.5 border-b border-(--line) flex justify-between itens-center">
                  <span className="text-sm text-(--ink-soft)">
                    무게 (WEIGHT)
                  </span>
                  <p className="text-sm font-semibold">
                    {(data.mountWeight + data.tubeWeight).toFixed(2)}kg
                  </p>
                </li>
                <li className="py-3.5 border-b border-(--line) flex justify-between itens-center">
                  <span className="text-sm text-(--ink-soft)">
                    GOTO 지원 (GOTO)
                  </span>
                  <p className="text-sm font-semibold">{data.goto}</p>
                </li>
              </ul>
            </div>
            {/* 버튼들 */}
            <div className="mt-8 flex gap-3.5">
              <div className="flex-1 border border-(--line) flex items-center">
                <button
                  type="button"
                  onClick={handleDecrease}
                  disabled={count <= 1}
                  className="flex-1 h-full flex justify-center items-center"
                >
                  <Minus />
                </button>
                <span className="flex-1 text-center">{count}</span>
                <button
                  type="button"
                  onClick={handleIncrease}
                  disabled={count > data.amount - 1}
                  className="flex-1 h-full flex justify-center items-center"
                >
                  <Plus />
                </button>
              </div>
              <button
                type="button"
                className="flex-1 border border-(--line) py-3.5 px-7 text-sm hover:border-(--brass) hover:text-(--brass)"
                onClick={handleAddCart}
              >
                장바구니
              </button>
              <button
                type="button"
                onClick={handleCheckout}
                className="flex-1 border border-(--brass) bg-(--brass) text-(--bg) py-3.5 px-7 text-sm"
              >
                바로 구매
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
