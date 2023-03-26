import axios from 'axios';

const newsProxy = async (req, res) => {
  try {
    const response = await axios.get('https://ulm.edu/news/rss/news.xml', {
      responseType: 'text',
    });
    res.setHeader('Content-Type', 'application/xml');
    res.status(200).send(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch XML data.' });
  }
};

export default newsProxy;
