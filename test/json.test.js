/**
 * @description json test
 * @author Zhenhan Li
 */

// const server = require('./server')

// test('json api return value test', async () => {
//     const res = await server.get('/json')
//     expect(res.body).toEqual({
//         title:'koa2 json'
//     })
//     expect(res.body.title).toBe('koa2 json')
// })
function sum (a,b) {
    return a + b
}
test('10 + 20 should equal to 30', () => {
    const res = sum(10,20)
    expect(res).toBe(30)
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