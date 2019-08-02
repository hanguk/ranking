const client = require('cheerio-httpcli')

// function test () {
//   const blogs = [
//     {
//       url: 'https://m.blog.naver.com/sannyten/221597870671',
//       keyword: '분당맞춤정장',
//       options: [
//         {
//           type: 'blog',
//         },
//         {
//           type: 'view'
//         }
//       ]
//     }, {
//       url: 'https://m.blog.naver.com/pianoez/221546603912',
//       keyword: '분당맞춤정장',
//       options: [
//         {
//           type: 'blog',
//         },
//         {
//           type: 'view'
//         }
//       ]
//     }
//   ]

//   getBlogRanking(blogs)
//     .then((rankedBlogs) => {
//       console.log(JSON.stringify(rankedBlogs))
//     })
//     .catch ((error) => {
//       throw err
//     })
// }

exports.getBlogRanking = (blogs) => {
  const rankedBlogs = []

  return new Promise(async (resolve, reject) => {
    for (let i in blogs) {
      const { url, keyword, options } = blogs[i]
  
      for (let j in options) {
        try {
          blogs[i].options[j].isRankingIn = await getBlogMainRanking(url, keyword, options[j].type)
          blogs[i].options[j].ranking = await getRanking(url, keyword, options[j].type)
        } catch (error) {
          console.error(error)
          reject(error)
        }
      }
  
      rankedBlogs.push(blogs[i])
      if (parseInt(i) === parseInt(blogs.length - 1)) {
        resolve(rankedBlogs)
      }
    }
  })
}

function getBlogMainRanking (url, keyword, type) {
  const param = {}
  let targetUrl, selector

  if (type === 'blog') {
    targetUrl = `https://search.naver.com/search.naver?sm=top_hty&fbm=1&ie=utf8&query=${encodeURIComponent(keyword)}`
    selector = 'ul.type01 li.sh_blog_top a.sh_blog_title'
  } else if (type === 'view') {
    targetUrl = `https://m.search.naver.com/search.naver?sm=top_hty&fbm=1&ie=utf8&query=${encodeURIComponent(keyword)}`
    selector = 'section.sp_nreview li._svp_item a.api_txt_lines'
  }

  client.set('headers', {
    'user-agent' : 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36',
    'Accept-Charset': 'utf-8'
  })

  return new Promise((resolve, reject) => {
    client.fetch(targetUrl, param, function (err, $, res) {
      if (err) {
        reject(err)
      }
    
      $(selector).each(function (index, item) {
        if (unifyUrl($(item).attr('href')) === unifyUrl(url)) {
          resolve(true)
        }
      })

      resolve(false)
    });
  })
}

function getRanking (url, keyword, type) {
  const param = {}
  let targetUrl, selector

  if (type === 'blog') {
    targetUrl = `https://m.search.naver.com/search.naver?where=m_blog&start=1&sm=mtb_viw.all&query=${encodeURIComponent(keyword)}&nso=`
    selector = 'ul.lst_total li._item div.total_wrap a.api_txt_lines'
  } else if (type === 'view') {
    targetUrl = `https://m.search.naver.com/search.naver?where=m_view&start=1&sm=mtb_jum&query=${encodeURIComponent(keyword)}`
    selector = 'ul.lst_total li._svp_item div.total_wrap a.api_txt_lines'
  }

  client.set('headers', {
    'user-agent' : 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36',
    'Accept-Charset': 'utf-8'
  })

  return new Promise((resolve, reject) => {
    client.fetch(targetUrl, param, function (err, $, res) {
      if (err) {
        reject(err)
      }
    
      $(selector).each(function (index, item) {
        if (unifyUrl($(item).attr('href')) === unifyUrl(url)) {
          resolve(index + 1)
        }
      })

      resolve(-1)

      // getRanking(url, selector, blogUrl, count).then(() => {
      //   resolve()
      // })
    });
  })
}

function unifyUrl (url) {
  let replacedUrl = url
  replacedUrl = replacedUrl.replace(/m.blog/gi, 'blog')
  replacedUrl = replacedUrl.replace(/\?Redirect=Log&logNo=/gi, '/')
  return replacedUrl
}

// var client = require('cheerio-httpcli')

// let url = `https://m.search.naver.com/search.naver?where=m_view&sm=mtb_jum&start=1&query=${encodeURIComponent(keyword)}`
// var param = {}
// const selector = 'ul.lst_total li._svp_item div.total_wrap a.api_txt_lines'

// client.set('headers', {
//   'user-agent' : 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36',
//   'Accept-Charset': 'utf-8'
// })

// client.fetch(url, param, function (err, $, res) {
//   if (err) {
//     console.log(err)
//     return
//   }

//   $(selector).each(function (index, item) {
//     console.log($(item).attr('href'))
//   })
// })