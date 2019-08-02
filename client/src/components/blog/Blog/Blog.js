import React, { Component } from 'react'
import styles from './Blog.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

class Blog extends Component {
  shouldComponentUpdate (nextProps, nextState) {
    return (this.props.blog.isBlog !== nextProps.blog.isBlog) ||
          (this.props.blog.isView !== nextProps.blog.isView)
  }

  render () {
    const { blog, isChanged, onChangeBlogOption } = this.props

    return (
      <li className={cx('blog', {'changed': isChanged})}>
        <div className={cx('keyword')}>
          <input type="text" value={blog.keyword} readOnly/>
        </div>
        <div className={cx('url')}>
          <input type="text" value={blog.url} readOnly/>
        </div>
        <div className={cx('blog-op')}>
          <div className={cx('option-btn', 'blog-btn')} onClick={() => onChangeBlogOption(blog, 'isBlog')}>
            <div className={cx('move-btn', { 'selected': blog.isBlog})}>
              {blog.isBlog ? 'On' : 'Off'}
            </div>
          </div>
        </div>
        <div className={cx('view-op')}>
          <div className={cx('option-btn', 'view-btn')} onClick={() => onChangeBlogOption(blog, 'isView')}>
            <div className={cx('move-btn', { 'selected': blog.isView})}>
              {blog.isView ? 'On' : 'Off'}
            </div>
          </div>
        </div>
      </li>
    )
  }
}
export default Blog