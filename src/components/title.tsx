export default function Title({ title }: { title: string }) {
  return (
    <h1 className=" text-xl font-semibold text-text-primary md:text-4xl font-script">
      {title}
    </h1>
  );
}
