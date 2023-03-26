import { useState, useEffect } from 'react';
import axios from 'axios';
import parseString from 'xml2js';
import Pagination from './Pagination';

const ITEMS_PER_PAGE = 4;

const paginate = (array, page_size, page_number) => {
  return array.slice((page_number - 1) * page_size, page_number * page_size);
};

const News = () => {
  const [newsItems, setNewsItems] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('/api/news', {
        responseType: 'text',
      });
      const xmlData = response.data;
      parseString.parseString(xmlData, (err, result) => {
        if (err) {
          console.error(err);
        } else {
          const allItems = result.rss.channel[0].item;
          const filteredItems = allItems.slice(-12);
          setNewsItems(filteredItems);
        }
      });
    };

    fetchData();
  }, []);

  return (
    <div className='news-body'>
      <h1>ULM News</h1>
      <div className='news-grid'>
        {newsItems ? (
          paginate(newsItems, ITEMS_PER_PAGE, currentPage).map(
            (item, index) => (
              <div key={index} className='news-card'>
                <img
                  src={item['media:content'][0]['media:thumbnail'][0].$.url}
                  alt={item.title}
                />
                <h2>{item.title}</h2>
                <p>{item.description}</p>
                <a href={item.link} target='_blank' rel='noopener noreferrer'>
                  Full Coverage
                </a>
              </div>
            )
          )
        ) : (
          <p>Loading...</p>
        )}
      </div>

      {newsItems && (
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(newsItems.length / ITEMS_PER_PAGE)}
          onPageChange={page => setCurrentPage(page)}
        />
      )}

      {/* <style jsx>{`
        .news-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1rem;
        }

        .news-card {
          background-color: #f8f8f8;
          padding: 1rem;
          border-radius: 0.5rem;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .news-card img {
          max-width: 100%;
          height: auto;
          border-radius: 0.5rem;
        }

        .news-card h2 {
          font-size: 1.5rem;
          margin: 1rem 0;
        }

        .news-card p {
          font-size: 1rem;
        }

        .news-card a {
          display: inline-block;
          margin-top: 1rem;
          text-decoration: none;
          color: #2d7ff9;
        }
      `}</style> */}

      <style jsx>{`
        .news-body {
          font-family: 'Georgia', serif;
          background-color: #f3dfc1;
        }

        .news-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1rem;
          padding: 1rem;
        }

        .news-card {
          background-color: #fff;
          padding: 1rem;
          border-radius: 0.5rem;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          position: relative;
        }

        .news-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="5" height="5" viewBox="0 0 5 5"%3E%3Cpath fill="%23ccc" d="M4 0h1v1H4zm0 2h1v1H4zm0 2h1v1H4zM2 0h1v1H2zm0 2h1v1H2zm0 2h1v1H2zm-2 0h1v1H0zm0-2h1v1H0zm0-2h1v1H0z"/%3E%3C/svg%3E');
          opacity: 0.15;
          z-index: -1;
        }

        .news-card img {
          max-width: 100%;
          height: auto;
          align-self: center;
          border-radius: 0.5rem;
          margin-bottom: 1rem;
        }

        .news-card h2 {
          font-size: 1.5rem;
          margin: 0 0 1rem 0;
          line-height: 1.2;
        }

        .news-card p {
          font-size: 1rem;
          line-height: 1.4;
          text-align: justify;
        }

        .news-card a {
          display: inline-block;
          margin-top: 1rem;
          text-decoration: none;
          color: #2d7ff9;
        }
      `}</style>
    </div>
  );
};

export default News;
