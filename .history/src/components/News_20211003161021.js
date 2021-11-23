import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";


const News = (props) => {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)

    const upperCaseFirst = (str) => {
        return str.charAt(0).toUpperCase() + str.substring(1);
    }

    //document.title = `${this.upperCaseFirst(props.category)} - getNewsify`;


    const updateNews = async () => {
        props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page}&pageSize=${props.pageSize}`
        setLoading(true);
        props.setProgress(30);
        let data = await fetch(url);
        props.setProgress(50);
        let parsedData = await data.json();
        props.setProgress(70);
        console.log(parsedData);
        setArticles(parsedData.articles);
        setLoading(false);
        setTotalResults(parsedData.totalResults);
        props.setProgress(100);
    }

updateNews();


    const fetchMoreData = async() => {
        setPage(prevstate => ({ page: prevstate.page + 1 }))
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page}&pageSize=${props.pageSize}`
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        setArticles(articles.concat(parsedData.articles));
        setTotalResults(parsedData.totalResults)
    };

    return (
        <>
            <div className="text-center my-4 mt-5">
                <h1 style={{ 'margin-top': "70px" }}>GetNewify - Top {upperCaseFirst(props.category)} Headlines </h1>
                {loading && <Spinner />}
            </div>
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Spinner />}
            >

                <div className="container">
                    <div className="row">
                        {!loading && articles.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""}
                                    imageUrl={element.urlToImage}
                                    newsUrl={element.url}
                                    author={element.author}
                                    date={element.publishedAt}
                                    source={element.source.name}
                                />
                            </div>
                        })}
                    </div>
                </div>
            </InfiniteScroll>
            {/* <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Prev</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &#8594;</button>
                </div> */}


        </>)

}


News.defaultProps = {
    country: 'in',
    pageSize: 6,
    category: 'general',
}

// eslint-disable-next-line react/no-typos
News.PropTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
}

export default News
