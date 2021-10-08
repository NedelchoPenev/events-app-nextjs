export const getFeaturedEvents = async () => {
  const data = await fetch('https://pizza-app-db-default-rtdb.firebaseio.com/events.json?orderBy="isFeatured"&equalTo=true&print=pretty')
  const eventsJson = await data.json()
  const events = []
  for (let key in eventsJson) {
    events.push({ id: key, ...eventsJson[key] })
  }

  return events
}

export const getAllEvents = async () => {
  const data = await fetch('https://pizza-app-db-default-rtdb.firebaseio.com/events.json')
  const eventsJson = await data.json()
  const events = []
  for (let key in eventsJson) {
    events.push({ id: key, ...eventsJson[key] })
  }

  return events
}

export const getEventById = async (id) => {
  const data = await fetch(`https://pizza-app-db-default-rtdb.firebaseio.com/events.json?orderBy="$key"&equalTo="${id}"&print=pretty`)
  const eventJson = await data.json()
  let event
  for (let key in eventJson) {
    event = { id: key, ...eventJson[key] }
  }

  return event
}