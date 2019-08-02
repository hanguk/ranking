import React from 'react'
import styles from './BlogRegistration.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

const BlogRegistration = ({keyword, url, isBlog, isView, handleChangeInput, handleChangeRegOption, handleSubmit}) => {
  const onChangeInput = (e) => {
    const { name, value } = e.target
    handleChangeInput(name, value)
  }

  const onChangeRegOption = (type) => {
    handleChangeRegOption(type)
  }

  const onSubmit = () => {
    handleSubmit({keyword, url, isBlog, isView})
  }

  return (
    <div className={cx('blog-rs-form')}>
      <div className={cx('input-box')}>
        <input type="text" name="keyword" value={keyword} placeholder="키워드" onChange={onChangeInput} />
        <input type="text" name="url" value={url} placeholder="https://blog.namer.com/example" onChange={onChangeInput} />
      </div>
      <div className={cx('option-box')}>
        <div>블로그</div>
        <div className={cx('option-btn', 'blog-btn')} onClick={() => onChangeRegOption('isBlog')}>
          <div className={cx('move-btn', { 'selected': isBlog})}>
            {isBlog ? 'On' : 'Off'}
          </div>
        </div>
        <div>뷰</div>
        <div className={cx('option-btn', 'view-btn')} onClick={() => onChangeRegOption('isView')}>
          <div className={cx('move-btn', { 'selected': isView})}>
            {isView ? 'On' : 'Off'}
          </div>
        </div>
      </div>
      <div className={cx('submit')} onClick={onSubmit}>등록</div>
    </div>
  )
}

export default BlogRegistration