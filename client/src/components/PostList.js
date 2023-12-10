import axios from 'axios';
import { useState, useEffect } from 'react';

import CommentCreate from './CommentCreate.js';
import CommentList from './CommentList.js';

const PostList = () => {
	const [posts, setPosts] = useState({});

	const fetchPosts = async () => {
		const res = await axios.get('http://localhost:4000/posts');
		setPosts(res.data);
	};

	useEffect(() => {
		fetchPosts();
	}, []);

	const renderedPosts = Object.values(posts) // array of posts
		.map(post => {
			return (
				<div className='card' style={{ width: '30%', marginBottom: '20px' }} key={post.id}>
					<div className='card-body'>
						<h3>{post.title}</h3>
						<CommentList postId={post.id} />
						<CommentCreate postId={post.id} />
					</div>
				</div>
			);
		});

	return <div className='d-flex flex-row flex-wrap justify-content-between '>{renderedPosts}</div>;
};

export default PostList;
