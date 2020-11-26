import React from 'react';
import Img from './Img';
import NoImgs from './NoImgs';
import InfiniteScroll from "react-infinite-scroll-component";

const ImgList = props => {
	const fetchMoreData = () => {
		props.fetchMoreData();
	};

	const results = props.data;
	let imgs;
	if (results.length > 0) {
		imgs = results.map(img =>
			<Img
				url={img.urls.thumb}
				user={img.user.links.html}
				name={img.user.name}
				link={img.links.html}
				key={img.id}
			/>
		);
	} else {
		imgs = <NoImgs />;
	}
	return (
		<ul className="img-list">
		<InfiniteScroll
          dataLength={results.length}
          hasMore={true}
          next={fetchMoreData}
          loader={results.length ===0 ?<div>Please check your query</div> :<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
			{imgs}
		</InfiniteScroll>	
		</ul>
	);
};

export default ImgList;