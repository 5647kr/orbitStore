import supabase from "../supabase";

export async function fetchData(
  fetchType: string,
  category?: string,
  sort?: string,
) {
  let url = supabase.from(fetchType).select("*");

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

  const { data, error } = await url;

  if (error) {
    throw error;
  }

  return { data };
}

export async function fetchOneData(fetchType: string, id: string) {
  const { data, error } = await supabase
    .from(fetchType)
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;

  return data;
}

export async function insertData<T extends InsertInquiry | InsertPayment>(
  fetchType: string,
  form: T,
) {
  const { data, error } = await supabase
    .from(fetchType)
    .insert([form])
    .select();

  if (error) throw { data: null, error };

  return { data: data as T[], error: null };
}
