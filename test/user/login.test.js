/**
 * @description user api test
 * @author Zhenhan Li
 */

const server = require('../server')

// user info
const userName = `u_${Date.now()}`
const password = `p_${Date.now()}`
const testUser = {
    userName,
    password,
    nickName: userName,
    gender: 1
}

// store cookie
let COOKIE = ''

// register
test(' register a user, should success ', async () => {
    const res = await server.post('/api/user/register')
                            .send(testUser)
    expect(res.body.errno).toBe(0)
})

// duplicate register
test('duplicate register should fail', async () => {
    const res = await server.post('/api/user/register')
                            .send(testUser)
    expect(res.body.errno).not.toBe(0)
})

// query: if user exist
test('check registered username, should exist', async() => {
    const res = await server.post('/api/user/isExist')
                            .send({ userName })
    expect(res.body.errno).toBe(0)
})

// json schema test
test('json schema test, illegal format should fail', async() => {
    const res = await server.post('/api/user/register')
                            .send({
                                userName: '123', // userName should start with alhabetic / underscore
                                password: 'a',
                                gender: 'mail' // not number
                            })
    expect(res.body.errno).not.toBe(0)
})

// sign in
test('sign in, should succeed', async() => {
    const res = await server.post('/api/user/login')
                            .send({
                                userName,
                                password
                            })
    expect(res.body.errno).toBe(0)

    // retrieve cookie (for later user test delete)
    COOKIE = res.headers['set-cookie'].join(';')
})

// modify basic info 
test('change basic info should succeed', async () => {
    const res = await server.patch('/api/user/changeInfo')
                            .send({
                                nickName: 'test nickName',
                                city: 'test city',
                                picture: '/test.png'
                            })
                            .set('cookie', COOKIE)
    expect(res.body.errno).toBe(0)
})

//modify password
test('modify pwd should succeed', async () => {
    const res = await server.patch('/api/user/changePassword')
                            .send({
                                password,
                                newPassword: `p_${Date.now()}`
                            })
                            .set('cookie', COOKIE)
    expect(res.body.errno).toBe(0)
})

// delete
test('delete user, should succeed', async() => {
    const res = await server.post('/api/user/delete')
                            .set('cookie', COOKIE)
    expect(res.body.errno).toBe(0)
})

// logout
test('logout should succeed', async () => {
    const res = await server.post('/api/user/logout')
                            .set('cookie', COOKIE)
    expect(res.body.errno).toBe(0)
})



// re-query user, shouldn't exist.
test('check registered username, should exist', async() => {
    const res = await server.post('/api/user/isExist')
                            .send({ userName })
    expect(res.body.errno).not.toBe(0)
})