/**
 * @description json test
 * @author Zhenhan Li
 */

const server = require('./server')

test('json api return value test', async () => {
    const res = await server.get('/json')
    expect(res.body).toEqual({
        title:'koa2 json'
    })
    expect(res.body.title).toBe('koa2 json')
})


// post 

// test('json api post test', async () => {
//     const res = await server.post('/login').send({
//         userName: 'zhangsan',
//         password: '123'
//     })
//     expect(res.body).toEqual({
//         title: 'koa2 json'
//     })
//     expect(res.body.title).toBe('koa2 json')
// })