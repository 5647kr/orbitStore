interface Event {
  id: string;
  created_at: string;
  title: string;
  desc: string;
  startDate: string;
  endDate: string;
  category: string;
  img: string;
  participate: { id: number; step: string }[];
  rewards: { id: number; desc: string }[];
  notes: { id: number; desc: string }[];
}
