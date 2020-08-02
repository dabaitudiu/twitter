/**
 * @description user relation unit test
 * @author Zhenhan Li
 */

const server = require('../server')
const { getFans, getFollowers } = require('../../src/controller/user-relation')
const {
    CIRI_ID,
    CIRI_USER_NAME,
    CIRI_COOKIE,
    AA_ID,
    AA_USER_NAME,
    AA_COOKIE
} = require('../testUserInfo')

// pre-work: unfollow
test('unfollow first. should success.', async () => {
    const res = await server.post('/api/profile/unFollow')
                            .send({ userId: AA_ID})
                            .set('cookie', CIRI_COOKIE)
    expect(1).toBe(1)
})

// follow
test('ciri follow aa, should success', async () => {
    const res = await server.post('/api/profile/follow')
                            .send({userId: AA_ID})
                            .set('cookie', CIRI_COOKIE)
    expect(res.body.errno).toBe(0)
})

// get follower list
test('retrieve aa\'s followers', async () => {
    const result = await getFans(AA_ID)
    const { count, userList:fansList } = result.data
    const hasUserName = fansList.some(fanInfo => {
        return fanInfo.userName === CIRI_USER_NAME
    })
    expect(count > 0).toBe(true)
    expect(hasUserName).toBe(true)
})

// retrieve following
test('retrieve ciri\'s following list, should have aa', async () => {
    const result = await getFollowers(CIRI_ID)
    const { count, followersList } = result.data 
    const hasUserName = followersList.some(followerInfo => {
        return followerInfo.userName === AA_USER_NAME
    })
    expect(count > 0).toBe(true)
    expect(hasUserName).toBe(true)
})

// test get at list
test('get ciri\'s at list, should success', async ()=> {
    const res = await server.get('/api/user/getAtList')
                            .set('cookie', CIRI_COOKIE)
    const atList = res.body
    const hasUserName = atList.some(item => {
        // 'nickName - userName'
        return item.indexOf(`- ${AA_USER_NAME}`) > 0
    })
    expect(hasUserName).toBe(true)
})


// unfollow
test('test unfollow: ciri unfollow aa', async () => {
    const res = await server.post('/api/profile/unFollow')
                            .send({ userId: AA_ID})
                            .set('cookie', CIRI_COOKIE)
    expect(res.body.errno).toBe(0)
})


