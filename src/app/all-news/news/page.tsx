'use client';

import React, { useEffect, useState } from 'react';
import './singleNewsPage.css';
import { useSearchParams } from 'next/navigation';
import Footer from '@/components/footer';

const NewsPage = () => {
    const searchParams = useSearchParams();
    const newsID = searchParams.get('newsID')

    const [newsId, setNewsId] = useState<any>('');

    useEffect(() => {
      if(newsID) {
        setNewsId(newsID)
      } else {
        setNewsId(null)
      }
    }, [newsID])
    

  return (
    <div className='newsPageWrapper'>
        <div className="headerSection"></div>
        <div className="newsBodySection"></div>
        <div className="moreNewsSection"></div>
        {/* <Footer /> */}
    </div>
  )
}

export default NewsPage