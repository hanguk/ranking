import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import BlogList from 'components/blog/BlogList'
import * as blogActions from 'store/modules/blog'

class BlogListContainer extends Component {
  componentDidMount () {
    const { BlogActions } = this.props
    BlogActions.initialize()
    BlogActions.getBlogList()
  }

  handleChangeBlogOption = (changedBlog, type) => {
    const { BlogActions } = this.props
    BlogActions.changeBlogOption({changedBlog, type})
  }

  handleUpdateBlogs = () => {
    const { blogs, changedBlogs, BlogActions } = this.props
    const newChangedBlogs = changedBlogs.map((changedBlog) => {
      return blogs[blogs.findIndex((blog) => blog.id === changedBlog.id)]
    })
    BlogActions.updateBlogs(newChangedBlogs)
  }

  render () {
    const { blogs, changedBlogs } = this.props
    const { handleChangeBlogOption, handleUpdateBlogs } = this

    return (
      <BlogList
        blogs={blogs}
        changedBlogs={changedBlogs}
        handleChangeBlogOption={handleChangeBlogOption}
        handleUpdateBlogs={handleUpdateBlogs}
      />
    )
  }
}

export default connect(
  (state) => ({
    blogs: state.blog.get('blogs').toJS(),
    changedBlogs: state.blog.get('changedBlogs').toJS()
  }),
  (dispatch) => ({
    BlogActions: bindActionCreators(blogActions, dispatch)
  })
)(BlogListContainer)