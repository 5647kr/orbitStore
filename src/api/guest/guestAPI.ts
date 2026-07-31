import supabase from "../../supabase";

export async function readGuestInquiry(form: ReadGuest) {
  let url = supabase.from("inquiry").select("*");

  if (form.id && form.name && form.call) {
    url = url
      .eq("id", form.id)
      .eq("name", form.name)
      .eq("call", form.call)
      .order("created_at", { ascending: false });
  } else if (form.name && form.call) {
    url = url
      .eq("name", form.name)
      .eq("call", form.call)
      .order("created_at", { ascending: false });
  }

  const { data, error } = await url;

  if (error) throw error;

  return data;
}

export async function readGuestOrder(form: ReadGuest) {
  let url = supabase.from("orders").select("*");

  if (form.id && form.name && form.call) {
    url = url
      .eq("id", form.id)
      .eq("buyerName", form.name)
      .eq("buyerCall", form.call);
  } else if (form.name && form.call) {
    url = url
      .eq("buyerName", form.name)
      .eq("buyerCall", form.call);
  }

  const { data, error } = await url;

  if (error) throw error;

  return data;
}
