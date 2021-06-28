import React from 'react'

import Feed from '../components/Feed/Feed'
import PageContainer from '../components/PageContainer/PageContainer'

const HomePage = ({category}) => (
    <PageContainer content={<Feed category={category} />} />
);

export default HomePage;