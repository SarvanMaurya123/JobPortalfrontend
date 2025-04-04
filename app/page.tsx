import JobSection from "@/app/allpages/home/joblatest/page";
import HeroSection from "@/app/allpages/home/page";
import SearchToNewslatter from "./allpages/home/search/page";
import JobCategories from "./allpages/home/jobcategury/page";

export default function Home() {
  return (
    <>
      <section>
        <HeroSection />
      </section>
      <section>
        <JobSection />
      </section>
      <section>
        <JobCategories />
      </section>
      <section>
        <SearchToNewslatter />
      </section>

    </>
  );
}
