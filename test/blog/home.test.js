/**
 * @description index test
 * @author Zhenhan Li
 */

const server = require('../server')
const { CIRI_COOKIE } = require('../testUserInfo')

// store tweet id
let BLOG_ID = ''

test('create index tweet, should succeed', async () => {
    // define test content
    const content = 'auto created tweet_' + Date.now()
    const image = '/xxx.png'

    // begin test 
    const res = await server.post('/api/blog/create')
                            .send({
                                content,
                                image
                            })
                            .set('cookie', CIRI_COOKIE)

    expect(res.body.errno).toBe(0)
    expect(res.body.data.content).toBe(content)
    expect(res.body.data.image).toBe(image)

    // record tweet id
    BLOG_ID = res.body.data.id

})


// load first page
test('home page, first page', async () => {
    const res = await server
                    .get(`/api/blog/loadMore/0`)
                    .set('cookie', CIRI_COOKIE)  // set cookie
    expect(res.body.errno).toBe(0)
    const data = res.body.data
    expect(data).toHaveProperty('isEmpty')
    expect(data).toHaveProperty('blogList')
    expect(data).toHaveProperty('pageSize')
    expect(data).toHaveProperty('pageIndex')
    expect(data).toHaveProperty('count')
})