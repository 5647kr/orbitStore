import supabase from "../supabase";

export async function fetchData(
  fetchType: string,
  category?: string,
  sort?: string,
) {
  let url = supabase.from(fetchType).select("*");

  // 제품 조회
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

export async function fetchCheckout({ name, call, buyerId, orderId }: {
  name?: string;
  call?: string;
  buyerId?: string;
  orderId?: string;
}) {
  let url = supabase.from("orders").select("*");

  if (buyerId) {
    url = url.eq("buyerId", buyerId);
  } else if (orderId && name && call) {
    url = url.eq("id", orderId).eq("buyerName", name).eq("buyerCall", call);
  } else if (name && call) {
    url = url.eq("buyerName", name).eq("buyerCall", call);
  }

  const { data, error } = await url;

  if (error) throw error;

  return { data };
}

export async function fetchInQuiry(
  { id, name, call, email }: {
    id?: string;
    name: string;
    call: string;
    email?: string;
  },
) {
  let url = supabase.from("inquiry").select("*");

  if (name && call && email) {
    // 회원용
    url = url.eq("name", name).eq("call", call).eq("email", email);
    // 비회원 하나 조회
  } else if (id && name && call) {
    url = url.eq("inquiryId", id).eq("call", call).eq("email", email);
    // 비회원 전체 조회
  } else if (name && call) {
    url = url.eq("name", name).eq("call", call);
  }

  const { data, error } = await url;

  if (error) throw error;

  return { data };
}
