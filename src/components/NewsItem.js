import React from 'react'

const NewsItem = (props) => {
    let {title,description,imageUrl,newsUrl,publishedAt,author,source} = props;
    return (
      <div className='my-3'>
        <div className="card">
            <img src={imageUrl} className="card-img-top" alt="..."/>
                <div className="card-body">
                  <div>
                    <h5 className="card-title">{title}...<span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left:'77%', zIndex:'1'}} >
    {source}
  </span>      </h5></div>
                    <p className="card-text">{description}...</p>
                    <p className="card-text"><small className="text-body-secondary">By {author} on {new Date(publishedAt).toGMTString()}</small></p>
                    <a href={newsUrl} target="blank" className="btn btn-sm btn-dark">Go somewhere</a>
                </div>
        </div>
      </div>
    )
}

export default NewsItem
