import React from 'react'
import styles from './BlogList.module.scss'
import classNames from 'classnames/bind'
import Blog from 'components/blog/Blog'

const cx = classNames.bind(styles)

const BlogList = ({blogs, changedBlogs, handleChangeBlogOption, handleUpdateBlogs}) => {
  const onChangeBlogOption = (changedBlog, type) => {
    handleChangeBlogOption(changedBlog, type)
  }

  const onUpdateBlogs = () => {
    handleUpdateBlogs()
  }

  const blogList = blogs.map((blog) => {
    const changedBlogIndex = changedBlogs.findIndex((changedBlog) => changedBlog.id === blog.id)
    const isChanged = changedBlogIndex !== -1 ? true : false 

    return <Blog key={`blog-${blog.id}`} blog={blog} isChanged={isChanged} onChangeBlogOption={onChangeBlogOption} />
  })

  return (
    <div className={cx('blog-list-container')}>
      <div className={cx('blog-top-bar')}>
        <div className={cx('keyword')}>키워드</div>
        <div className={cx('url')}>URL</div>
        <div className={cx('blog')}>BLOG</div>
        <div className={cx('view')}>VIEW</div>
      </div>
      <ul className={cx('blog-list')}>
        {blogList}
      </ul>
      <div className={cx('update-btn')} onClick={onUpdateBlogs}>
        <input type="button" value="변경" />
      </div>
    </div>
  )
}

export default BlogList