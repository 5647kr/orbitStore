import supabase from "../../supabase";

interface ReadAllOrder {
  page: number;
  pageNum: number;
  id: string;
  name: string;
  call: string;
}

export async function readAllOrder(
  { page, pageNum, id, name, call }: ReadAllOrder,
) {
  const { data, error, count } = await supabase
    .from("orders")
    .select("*", {
      count: "exact",
    })
    .eq("buyerId", id)
    .eq("buyerName", name)
    .eq("buyerCall", call)
    .range(page * pageNum, (page * pageNum) + pageNum - 1);

  if (error) throw error;

  const hasNextPage = count
    ? page * pageNum + (data.length || 0) < count
    : false;
  const nextPage = hasNextPage ? page + 1 : undefined;

  return { data, nextPage };
}
