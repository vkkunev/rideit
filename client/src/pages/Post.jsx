import React from 'react'

import PageContainer from '../components/PageContainer/PageContainer'
import CreatePost from '../components/CreatePost/CreatePost'

const Post = () => (
    <PageContainer content={<CreatePost />} />
);

export default Post;