import Hero from "./(features)/hero";
import HomeProjectPreview from "./(features)/home/project-section";
import HomeStackPreview from "./(features)/home/stack-section";
import HomeWritingPreview from "./(features)/home/writing-section";

const page = () => {
  return (
    <div>
      <Hero />
      <HomeWritingPreview/>
      <HomeProjectPreview />
      <HomeStackPreview />
    </div>
  );
};

export default page;
