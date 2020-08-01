/**
 * @description personal profile unit test
 * @author Zhenhan Li
 */

const server = require('../server')
const { CIRI_COOKIE, CIRI_USER_NAME } = require('../testUserInfo')

test('test first profile, should succeed', async () => {
    const res = await server.get(`/api/profile/loadMore/${CIRI_USER_NAME}/0`)
                            .set('cookie', CIRI_COOKIE)
    expect(res.body.errno).toBe(0)

    const data = res.body.data 
    expect(data).toHaveProperty('isEmpty')
    expect(data).toHaveProperty('blogList')
    expect(data).toHaveProperty('pageSize')
    expect(data).toHaveProperty('pageIndex')
    expect(data).toHaveProperty('count')
})

