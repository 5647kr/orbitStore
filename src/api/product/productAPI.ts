import supabase from "../../supabase";

interface ReadAllProduct {
  page: number;
  pageNum: number;
  category: string;
  sort: string;
}

// readAll
export async function readAllProduct(
  { page, pageNum, category, sort }: ReadAllProduct,
) {
  let url = supabase.from("products").select("*", { count: "exact" });

  if (category !== "전체") {
    url = url.eq("category", category);
  }

  if (sort === "최신순") {
    url = url.order("created_at", { ascending: false });
  } else if (sort === "높은가격순") {
    url = url.order("price", { ascending: false });
  } else if (sort === "낮은가격순") {
    url = url.order("price", { ascending: true });
  }

  const from = page * pageNum;
  const to = from + pageNum - 1;
  url = url.range(from, to);

  const { data, error, count } = await url;

  if (error) throw error;

  const hasNextPage = count ? from + (data.length || 0) < count : false;
  const nextPage = hasNextPage ? page + 1 : undefined;

  return { data, nextPage };
}

// read
export async function readProduct({ id }: { id: string }) {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;

  return data;
}
