import { useState, useEffect } from 'react';
import axios from 'axios';
import parseString from 'xml2js';
import Pagination from './Pagination';
import Image from 'next/image';

const ulmImage = '/ulm.png';
const ITEMS_PER_PAGE = 3;

const paginate = (array, page_size, page_number) => {
  return array.slice((page_number - 1) * page_size, page_number * page_size);
};

const News = () => {
  const [newsItems, setNewsItems] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const formatDate = dateString => {
    const days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    const date = new Date(dateString);
    const day = days[date.getDay()];
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    const dateNumber = date.getDate();

    return `${day}, ${dateNumber} ${month} ${year}`;
  };

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
      <link
        href='https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap'
        rel='stylesheet'
      />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Image
          src={ulmImage}
          alt='Ulm'
          width={300}
          height={300}
          style={{ display: 'block', margin: 'auto' }}
        />
      </div>

      <p className='title'>Breaking News</p>
      <div className='news-grid'>
        {newsItems ? (
          paginate(newsItems, ITEMS_PER_PAGE, currentPage).map(
            (item, index) => (
              <div key={index} className='news-card'>
                <Image
                  src={item['media:content'][0]['media:thumbnail'][0].$.url}
                  alt={item.title}
                  width={100}
                  height={100}
                  layout='responsive'
                />
                <h2>{item.title}</h2>
                <p>{item.description}</p>
                <a
                  href={item.link}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='full-coverage'
                >
                  Full Coverage &raquo;
                </a>
                <div className='mt-5 '>
                  <p style={{ color: '#840029' }}>{formatDate(item.pubDate)}</p>
                </div>
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
    </div>
  );
};

export default News;
