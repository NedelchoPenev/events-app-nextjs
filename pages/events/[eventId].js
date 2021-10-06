import { Fragment } from 'react';

import { getAllEvents, getEventById } from '../../helpers/eventsAPI';
import EventSummary from '../../components/event-detail/event-summary';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventContent from '../../components/event-detail/event-content';
import ErrorAlert from '../../components/ui/error-alert';

function EventDetailPage({ event }) {
  if (!event) {
    return (
      <ErrorAlert>
        <p>No event found!</p>
      </ErrorAlert>
    );
  }

  return (
    <Fragment>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </Fragment>
  );
}

export const getStaticProps = async (ctx) => {
  const id = ctx.params.eventId
  const event = await getEventById(id)

  return {
    props: {
      event: event || null
    },
    revalidate: 30
  }
}

export const getStaticPaths = async () => {
  const allEvents = await getAllEvents()
  const paths = allEvents.map(e => ({ params: { eventId: e.id } }))

  return {
    paths,
    fallback: 'blocking'
  }
}

export default EventDetailPage;
