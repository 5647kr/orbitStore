import supabase from "../../supabase";

// read
export async function readAllEvent(
  { page, pageNum }: { page: number; pageNum: number },
) {
  const { data, error, count } = await supabase
    .from("events")
    .select("*", {count: "exact"})
    .range(page * pageNum, (page * pageNum) + pageNum - 1);

  if (error) throw error;

  const hasNextPage = count
    ? page * pageNum + (data.length || 0) < count
    : false;
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
