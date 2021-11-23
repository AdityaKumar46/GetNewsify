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

    upperCaseFirst = (str) => {
        return str.charAt(0).toUpperCase() + str.substring(1);
    }

        //document.title = `${this.upperCaseFirst(props.category)} - getNewsify`;
    

    const updateNews = async() => {
        props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${this.state.page}&pageSize=${props.pageSize}`
        this.setState({ loading: true });
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

    useEffect(() => {
        effect
        return () => {
            this.updateNews();
        }
    }, [input])
    async componentDidMount() {

        this.updateNews();

    }

    handlePrevClick = async () => {
        console.log("Previous");
        this.setState(prevstate => ({ page: prevstate.page - 1 }));
        this.updateNews();
    }

    handleNextClick = async () => {
        console.log("Next");
        if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / props.pageSize))) {
            this.setState(prevstate => ({ page: prevstate.page + 1 }));
            this.updateNews();
        }
    }

    fetchMoreData = async() => {
        this.setState(prevstate => ({ page: prevstate.page + 1 }));
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${this.state.page}&pageSize=${props.pageSize}`
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults
        })
      };

    render() {
        console.log("hi");
        return (
            <>
                <div className="text-center my-4 mt-5">
                    <h1 style={{'margin-top': "70px"}}>GetNewify - Top {this.upperCaseFirst(props.category)} Headlines </h1>
                  {this.state.loading && <Spinner />}
                </div>
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner />}
                >

                    <div className="container">
                        <div className="row">
                            {!this.state.loading && this.state.articles.map((element) => {
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
