// create

interface CreateInquiry {
  id: string;
  category: string;
  name: string;
  call: string;
  email: string;
  orderId?: string;
  title: string;
  desc: string;
}

interface ReadInquiry extends CreateInquiry {
  id: string;
  created_at: string;
  answer: string;
  inquiryId: string;
}
