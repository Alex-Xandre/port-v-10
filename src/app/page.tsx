import Hero from "./(features)/hero";
import HomeCta from "./(features)/home/cta-section";
import HomeProjectPreview from "./(features)/home/project-section";
import HomeStackPreview from "./(features)/home/stack-section";
import HomeWritingPreview from "./(features)/home/writing-section";

const page = () => {
  return (
    <div>
      <Hero />
      <HomeProjectPreview />
      <HomeWritingPreview />

      <HomeStackPreview />
      <HomeCta />
    </div>
  );
};

export default page;
