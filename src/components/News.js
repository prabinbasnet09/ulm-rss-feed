import { useState, useEffect } from 'react';
import axios from 'axios';
import parseString from 'xml2js';
import Pagination from './Pagination';

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
      <p className='title'>Breaking News</p>
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
                <a
                  href={item.link}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='full-coverage'
                >
                  Full Coverage &raquo;
                </a>
                <div className='flex items-center mt-5 '>
                  <p className=' font-bold '>By ULM</p>
                  <p className='ml-2'>|</p>
                  <p className='ml-2 ' style={{ color: '#840029' }}>
                    {formatDate(item.pubDate)}
                  </p>
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

// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import parseString from 'xml2js';
// import Pagination from './Pagination';

// const ITEMS_PER_PAGE = 4;

// const paginate = (array, page_size, page_number) => {
//   return array.slice((page_number - 1) * page_size, page_number * page_size);
// };

// const News = () => {
//   const [newsItems, setNewsItems] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [viewMode, setViewMode] = useState('grid');

//   const toggleViewMode = () => {
//     setViewMode(viewMode === 'grid' ? 'list' : 'grid');
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       const response = await axios.get('/api/news', {
//         responseType: 'text',
//       });
//       const xmlData = response.data;
//       parseString.parseString(xmlData, (err, result) => {
//         if (err) {
//           console.error(err);
//         } else {
//           const allItems = result.rss.channel[0].item;
//           const filteredItems = allItems.slice(-12);
//           setNewsItems(filteredItems);
//         }
//       });
//     };

//     fetchData();
//   }, []);

//   return (
//     <div className='news-body'>
//       <link
//         href='https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap'
//         rel='stylesheet'
//       />
//       <p className='title'>Breaking News</p>
//       <button onClick={toggleViewMode}>
//         Toggle View Mode ({viewMode === 'grid' ? 'List' : 'Grid'})
//       </button>
//       <div className={`news-${viewMode}`}>
//         {newsItems ? (
//           paginate(newsItems, ITEMS_PER_PAGE, currentPage).map(
//             (item, index) => (
//               <div key={index} className='news-card'>
//                 <img
//                   src={item['media:content'][0]['media:thumbnail'][0].$.url}
//                   alt={item.title}
//                 />
//                 <div className='news-card-main'>
//                   <div className='news-card-content'>
//                     <h2>{item.title}</h2>
//                     <p>{item.description}</p>
//                   </div>
//                   <a
//                     href={item.link}
//                     target='_blank'
//                     rel='noopener noreferrer'
//                     className='full-coverage'
//                   >
//                     Full Coverage &raquo;
//                   </a>
//                 </div>
//               </div>
//             )
//           )
//         ) : (
//           <p>Loading...</p>
//         )}
//       </div>

//       {newsItems && (
//         <Pagination
//           currentPage={currentPage}
//           totalPages={Math.ceil(newsItems.length / ITEMS_PER_PAGE)}
//           onPageChange={page => setCurrentPage(page)}
//         />
//       )}
//     </div>
//   );
// };

// export default News;
