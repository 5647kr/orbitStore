export default function Hero({
  title,
  subTitle,
}: {
  title: string;
  subTitle: string;
}) {
  return (
    <section className="py-10 px-4 bg-(--surface) border-b border-(--line) mb-10">
      <div className="w-full max-w-7xl mx-auto">
        <h2 className="fraunces text-3xl font-bold mb-2">{title}</h2>
        <p className="text-(--ink-soft) font-light">{subTitle}</p>
      </div>
    </section>
  );
}
