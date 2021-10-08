import { connectDatabase, insertDocument, getAllDocuments } from '../../../helpers/db-util'

const handler = async (req, res) => {
  const eventId = req.query.eventId
  let client;

  try {
    client = await connectDatabase();
  } catch (error) {
    res.status(500).json({ message: 'Connecting to the database failed!' });
    return;
  }

  if (req.method === 'POST') {
    const { email, name, text } = req.body;

    if (!email || !email.includes('@') || name.trim() === '' || text.trim() === '') {
      res.status(422).json({ message: 'Invalid input.' });
      return;
    }

    const newComment = { email, name, text, eventId }

    try {
      await insertDocument(client, 'comments', newComment);
      res.status(201).json({ message: 'Comment added!', comment: newComment });
    } catch (error) {
      res.status(500).json({ message: 'Inserting data failed!' });
      return;
    }
  } else if (req.method === 'GET') {
    try {
      const comments = await getAllDocuments(client, 'comments', { _id: -1 }, eventId)
      res.status(200).json({ comments });
    } catch (error) {
      res.status(500).json({ message: 'Failed loading data!' });
      return;
    }
  }

  client.close();
}

export default handler