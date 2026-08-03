export default function Title({ title }: { title: string }) {
  return (
    <h1 className="max-w-xl text-2xl leading-snug text-neutral-900 dark:text-neutral-100 md:text-3xl italic">
      {title}
    </h1>
  );
}
