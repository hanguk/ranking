import axios from 'axios'

export const createBlog = ({keyword, url, isBlog, isView}) => axios.post('/blog/blog', {keyword, url, isBlog, isView})
export const getBlogList = () => axios.get('/blog/blog')
export const updateBlogs = (changedBlogs) => axios.patch('/blog/blog', {changedBlogs})