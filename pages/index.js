import { getFeaturedEvents } from '../helpers/eventsAPI'
import EventList from '../components/events/event-list';

function HomePage({ featuredEvents }) {
  return (
    <div>
      <EventList items={featuredEvents} />
    </div>
  );
}

export const getStaticProps = async () => {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: {
      featuredEvents
    }
  }
}

export default HomePage;
