/**
 * @description at relation test
 * @author Zhenhan Li
 */
const server = require('../server')
const { CIRI_COOKIE, AA_COOKIE, AA_USER_NAME } = require('../testUserInfo')

let BLOG_ID

test('ciri creates a tweet, @aa, should succeed', async () => {
    const content = 'autocreated @aa - ' + AA_USER_NAME
    const res = await server
        .post('/api/blog/create')
        .send({
            content
        })
        .set('cookie', CIRI_COOKIE)
    expect(res.body.errno).toBe(0)

    // record tweet id
    BLOG_ID = res.body.data.id
})

test('get aa\'s  @ list（first page），should have recent created tweet', async () => {
    const res = await server
        .get('/api/atMe/loadMore/0') // list
        .set('cookie', AA_COOKIE)
    expect(res.body.errno).toBe(0)
    const data = res.body.data
    const blogList = data.blogList
    const isHaveCurBlog = blogList.some(blog => blog.id === BLOG_ID)
    expect(isHaveCurBlog).toBe(true)
})
