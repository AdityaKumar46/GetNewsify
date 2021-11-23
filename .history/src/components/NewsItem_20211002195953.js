import React, { Component } from 'react'
import '../index.css'
const NewsItem = (props) => {
        let { title, description, imageUrl, newsUrl, author, date, source } = props;
        return (
            <div className="my-3">
                <div className="card">
                    <img src={!imageUrl ? "http://bsmedia.business-standard.com/_media/bs/img/article/2021-01/10/full/1610289005-3549.jpg" : imageUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}
                        <div>
                            <span className="badge rounded-pill bg-danger"
                                style={{ left: '86%', zIndex: '1' }}>
                                {source}
                                <span className="visually-hidden">unread messages</span>
                            </span>
                        </div>

                        </h5>
                        <p className="card-text">{description}</p>
                        <div className="card-footer">
                            <small className="text-muted">By {!author ? "Anonymous" : author} on {new Date(date).toGMTString()}</small>
                        </div>
                        <a href={newsUrl} target="blank" className="btn btn-sm btn btn-primary">Read More</a>
                    </div>
                </div>

            </div>
        )
}

export default NewsItem
