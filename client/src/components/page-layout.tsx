import React, { Fragment } from 'react';
import PageHeader from './page-header';

const PageLayout: React.FC = (props) => {
  return(
    <Fragment>
      <PageHeader />
      {props.children}
    </Fragment>
  )
}

export default PageLayout;