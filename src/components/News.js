import React, { useEffect,useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


const News  = (props) => {
  const [articles,setArticles] = useState([]);
  const [loading,setLoading] = useState(true);
  const [page,setPage] = useState(1);
  const [totalResults,setTotalResults] = useState(0);


  const capitalizeFirstLetter = (string)=>{
    return string.charAt(0).toUpperCase() + string.slice(1);

  }

  const updateNews = async () => {
    props.setProgress(0);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    props.setProgress(100);
  }

  useEffect(()=>{
    document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`
    updateNews(); 
  },[]);

  const handleNextClick = async ()=>{
    setPage(page+1);
    updateNews();
  }

  const handlePreviousClick = async ()=>{
    setPage(page-1);
    updateNews();
  }

  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
    setPage(page+1);
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
  };

    return (
      <div className="container my-3">
        <h1 className="text-center" style={{margin:"24px 0px"}}>NewsMonkey - Top {capitalizeFirstLetter(props.category)} Headlines</h1>
        {loading && <Spinner/>}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader=<Spinner/>>
        <div className='container'>
        <div className="row">
        { articles.map((element,index)=>{
          return <div className="col-md-3" key = {index} >
            <NewsItem title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,88):""} imageUrl={element.urlToImage?element.urlToImage:"https://entrackr.com/storage/2019/01/Angel-Tax.jpg"} newsUrl={element.url?element.url:""} publishedAt={element.publishedAt?element.publishedAt:""} author={element.author?element.author:"Unknown"} source={element.source.id?element.source.id:""}></NewsItem>
          </div>
        })}</div>
        </div>
        </InfiniteScroll>
      </div>
    )
}

News.defaultProps = {
  country: 'in',
  pageSize: 8,
  category: 'general'
}

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string
}

export default News
