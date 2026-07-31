import supabase from "../../supabase";

// read
export async function readAllEvent(
  { page, pageNum }: { page: number; pageNum: number },
) {
  const from = page * pageNum;
  const to = from + pageNum - 1;

  const { data, error, count } = await supabase
    .from("events")
    .select("*", { count: "exact" })
    .range(from, to);

  if (error) throw error;

  const hasNextPage = count ? from + (data.length || 0) < count : false;
  const nextPage = hasNextPage ? page + 1 : undefined;

  return { data, nextPage };
}

export async function readEvent({ id }: { id: string }) {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;

  return data;
}

export async function readOpenEvent() {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .range(8, 11);

  if (error) throw error;

  return data;
}
