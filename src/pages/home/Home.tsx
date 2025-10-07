import { EventsSection } from "../../components/eventsSection/EventsSection";
import { SectionTitle } from "../../components/sectionTitle/SectionTitle";
import { CenterBlock } from "../../components/сenterBlock/CenterBlock";
import { useTimelineStore } from "../../hooks/useTimelineStore";
import { PageWrapper } from "../../shared/PageWrapper";

export const Home: React.FC = () => {
  const { currentIndex, periods } = useTimelineStore();
  const currentPeriod = periods[currentIndex];

  return (
    <PageWrapper>
      <SectionTitle />
      <CenterBlock />
      <EventsSection events={currentPeriod.events} />
    </PageWrapper>
  );
};
