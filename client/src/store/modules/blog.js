import { createAction, handleActions } from 'redux-actions'

import { Map, List, fromJS } from 'immutable'
import { pender } from 'redux-pender'

import * as api from 'lib/api'

const INITIALIZE = 'blog/INITIALIZE'
const CHANGE_INPUT = 'blog/CHANGE_INPUT'
const CHANGE_REG_OPTION = 'blog/CHANGE_REG_OPTION'
const CREATE_BLOG = 'blog/CREATE_BLOG'
const GET_BLOG_LIST = 'blog/GET_BLOG_LIST'
const CHANGE_BLOG_OPTION = 'blog/CHANGE_BLOG_OPTION'
const UPDATE_BLOGS = 'blog/UPDATE_BLOG'

export const initialize = createAction(INITIALIZE)
export const changeInput = createAction(CHANGE_INPUT)
export const changeRegOption = createAction(CHANGE_REG_OPTION)
export const createBlog = createAction(CREATE_BLOG, api.createBlog)
export const getBlogList = createAction(GET_BLOG_LIST, api.getBlogList)
export const changeBlogOption = createAction(CHANGE_BLOG_OPTION)
export const updateBlogs = createAction(UPDATE_BLOGS, api.updateBlogs)

const initialState = Map({
  blogInfo: Map({
    keyword: '',
    url: '',
    isBlog: false,
    isView: false
  }),
  blogs: List([]),
  changedBlogs: List([])     //블로그 리스트에서 옵션을 바꾼 블로그의 원본값 저장. 후에 저장버튼 클릭시 이배열안의 블로그를 참조하여 blogs리스트에서 실제로 값이 바뀐 블로그 찾아냄
})

export default handleActions({
  [INITIALIZE]: () => initialState,
  [CHANGE_INPUT]: (state, action) => {
    let { name, value } = action.payload

    if (name === 'url') {
      value = value.replace(/m.blog/gi, 'blog')
      value = value.replace(/\?Redirect=Log&logNo=/gi, '/')
    }

    return state.setIn(['blogInfo', name], value)
  },
  [CHANGE_REG_OPTION]: (state, action) => {
    const type = action.payload
    return state.updateIn(['blogInfo', type], status => !status)
  },
  ...pender({
    type: CREATE_BLOG
  }),
  ...pender({
    type: GET_BLOG_LIST,
    onSuccess: (state, action) => {
      const { data } = action.payload

      const blogs = data.map((blog) => ({
        ...blog,
        createdAt: new Date(blog.createdAt),
        updatedAt: new Date(blog.updatedAt)
      }))

      return state.set('blogs', fromJS(blogs))
    }
  }),
  [CHANGE_BLOG_OPTION]: (state, action) => {
    const { changedBlog, type } = action.payload
    const blogIndex = state.get('blogs').findIndex((blog) => blog.get('id') === changedBlog.id)
    const changedBlogIndex = state.get('changedBlogs').findIndex((blog) => blog.get('id') === changedBlog.id)

    const stateChangedBlogs = state.updateIn(['blogs', blogIndex, type], status => !status)

    //blog의 값을 변경할때 state의 blogs의 상태를 변경함과 동시에 changedBlogs에 원본값 저장. 혹시 변경된 옵션이 원본값과 같을시 changedBlogs에서 해당 blog객체 삭제
    if (changedBlogIndex === -1) {
      return stateChangedBlogs.set('changedBlogs', state.get('changedBlogs').push(fromJS(changedBlog)))
    } else {
      if (state.getIn(['changedBlogs', changedBlogIndex]).get('isBlog') !== stateChangedBlogs.getIn(['blogs', blogIndex, 'isBlog']) || state.getIn(['changedBlogs', changedBlogIndex]).get('isView') !== stateChangedBlogs.getIn(['blogs', blogIndex, 'isView'])) {
        return stateChangedBlogs
      } else {
        return stateChangedBlogs.set('changedBlogs', state.get('changedBlogs').splice(changedBlogIndex, 1))
      }
    }
  },
  ...pender({
    type: UPDATE_BLOGS
  })
}, initialState)