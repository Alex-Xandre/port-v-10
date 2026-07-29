import Hero from "./(features)/hero";
import HomeProjectPreview from "./(features)/home/project-section";
import HomeStackPreview from "./(features)/home/stack-section";

const page = () => {
  return (
    <div>
      <Hero />
      <HomeProjectPreview />
      <HomeStackPreview />
    </div>
  );
};

export default page;
