// create

import supabase from "../../supabase";

export async function createInquiry(form: CreateInquiry) {
  const { data, error } = await supabase
    .from("inquiry")
    .insert([form])
    .select();

  if (error) throw error;

  return data;
}
