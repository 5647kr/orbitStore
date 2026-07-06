interface Product {
  id: string;
  img: string
  created_at: string;
  title: string;
  aperture: string;
  apertureRatio: string;
  focalLength: string;
  tubeWeight: number;
  mountWeight: number;
  goto: string;
  price: number;
  category: string;
  brand: string;
  amount: number;
  desc: string
}

interface Faq {
  id: string;
  title: string;
  desc: string;
  category: string
}