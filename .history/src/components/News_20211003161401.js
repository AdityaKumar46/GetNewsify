import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {

    static defaultProps = {
        country: 'in',
        pageSize: 6,
        category: 'general',
    }

    // eslint-disable-next-line react/no-typos
    static PropTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
    }
    upperCaseFirst = (str) => {
        return str.charAt(0).toUpperCase() + str.substring(1);
    }

    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
        console.log("Hello im a constructor from news");
        this.state = {
            articles: [],
            loading: true,
            page: 1,
            totalResults: 0
        }
        document.title = `${this.upperCaseFirst(this.props.category)} - getNewsify`;
    }

    async updateNews() {
        this.props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pageSize=${this.props.pageSize}`
        this.setState({ loading: true });
        this.props.setProgress(30);
        let data = await fetch(url);
        this.props.setProgress(50);
        let parsedData = await data.json();
        this.props.setProgress(70);
        console.log(parsedData);
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false
        })
        this.props.setProgress(100);
    }

    async componentDidMount() {

        this.updateNews();

    }

    handlePrevClick = async () => {
        console.log("Previous");

        /**  let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3415a559da894aa390a66455e0c4112b&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`
             this.setState({loading: true})
             let data = await fetch(url);
             let parsedData=await data.json();
             this.setState({loading: false});
             console.log(parsedData);
             this.setState({
                 articles: parsedData.articles
             })
             this.setState(prevstate => ({ page: prevstate.page - 1}));
             console.log(this.state.page);
             */

        this.setState(prevstate => ({ page: prevstate.page - 1 }));
        this.updateNews();
    }

    handleNextClick = async () => {
        console.log("Next");
        if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {
            /**  let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3415a559da894aa390a66455e0c4112b&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`
             this.setState({loading: true})
             let data = await fetch(url);
             let parsedData=await data.json();
             this.setState({loading: false});
             console.log(parsedData);
             this.setState({
             articles: parsedData.articles
         })*/
            this.setState(prevstate => ({ page: prevstate.page + 1 }));
            this.updateNews();
        }
    }

    fetchMoreData = async() => {
        this.setState(prevstate => ({ page: prevstate.page + 1 }));
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pageSize=${this.props.pageSize}`
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
                <div className="text-center my-4">
                    <h1>GetNewify - Top {this.upperCaseFirst(this.props.category)} Headlines </h1>
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
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &#8594;</button>
                </div> */}

            
        </>)
    }
}

export default News