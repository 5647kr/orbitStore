import supabase from "../../supabase";

interface ReadAllFaq {
  page: number;
  pageNum: number;
  category: string;
}

// readAll
export async function readAllFaq({ page, pageNum, category }: ReadAllFaq) {
  let url = supabase.from("faqs").select("*", { count: "exact" });

  if (category !== "전체") {
    url = url.eq("category", category);
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
