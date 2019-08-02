import React from 'react'
import styles from './ManageBlogTemplate.module.scss'
import classNames from 'classnames/bind'
import BlogRegistrationContainer from 'containers/blog/BlogRegistrationContainer'
import BlogListContainer from 'containers/blog/BlogListContainer'

const cx = classNames.bind(styles)

const ManageBlogTemplate = () => {
  return (
    <div className={cx('blog-template')}>
      <div className={cx('blog-rs-container')}>
        <BlogRegistrationContainer />
      </div>
      <div className={cx('blog-list-container')}>
        <BlogListContainer />
      </div>
    </div>
  )
}

export default ManageBlogTemplate