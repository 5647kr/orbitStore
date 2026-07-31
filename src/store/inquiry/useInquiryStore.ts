import { create } from "zustand";

interface InquiryStore {
  inquiry: { id: string; category: string; title: string };
  setInquiry: (id: string, category: string, title: string) => void;
  resetInquiry: () => void;
}

export const useInquiryStore = create<InquiryStore>((set) => ({
  inquiry: { id: "", category: "", title: "" },
  setInquiry: (id, category, title) => {
    set(
      { inquiry: { id, category, title } },
    );
  },
  resetInquiry: () => {
    set({ inquiry: { id: "", category: "", title: "" } });
  },
}));
