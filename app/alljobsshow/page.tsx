import HeroSection from "@/app/componente/Herosection"
import JobBoard from "./filteralljobs/page"
export default function AllJobsShow() {
    return (<>
        <section>
            <HeroSection />
        </section>
        <section>
            <JobBoard />
        </section>
    </>)
}