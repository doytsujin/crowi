// @flow
import React from 'react';

import UserPicture from 'components/User/UserPicture'
import PageListMeta from './PageListMeta'
import PagePath from './PagePath'

type Props = {
  page: Object,
  linkTo?: string,
  excludePathString?: string,
  isActive?: boolean,
  children?: React.Element,
};

export default class Page extends React.Component {
  props: Props;
  render() {
    const { page, linkTo, excludePathString, isActive, children, ...props } = this.props
    const link = linkTo === '' ? page.path : linkTo
    const active = this.props.isActive ? 'active' : ''
    return (
      <li className={`page-list-li ${active}`} {...props}>
        {children}
        <UserPicture user={page.revision.author} />
        <a className="page-list-link" href={link}>
          <PagePath page={page} excludePathString={excludePathString} />
        </a>
        <PageListMeta page={page} />
      </li>
    )
  }
}

Page.defaultProps = {
  page: {},
  linkTo: '',
  excludePathString: '',
  isActive: false,
}
