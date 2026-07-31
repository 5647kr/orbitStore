import supabase from "../../supabase";

// create
export async function createInquiry(form: CreateInquiry) {
  const { data, error } = await supabase
    .from("inquiry")
    .insert([form])
    .select();

  if (error) throw error;

  return data;
}

// read 회원
interface ReadAllInquiry {
  page: number;
  pageNum: number;
  name: string;
  call: string;
}

export async function readAllInquiry(
  { page, pageNum, name, call }: ReadAllInquiry,
) {
  const { data, error, count } = await supabase
    .from("inquiry")
    .select("*", { count: "exact" })
    .eq("name", name)
    .eq("call", call)
    .order("created_at", { ascending: false })
    .range(page * pageNum, (page * pageNum) + pageNum - 1);

  if (error) throw error;

  const hasNextPage = count
    ? page * pageNum + (data.length || 0) < count
    : false;
  const nextPage = hasNextPage ? page + 1 : undefined;

  return { data, nextPage };
}
