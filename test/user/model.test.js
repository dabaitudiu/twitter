/**
 * @description user model test
 * @author Zhenhan Li
 */

 const { User } = require('../../src/db/model/index')

test(' User model attributes validation', () => {
     // build will construct a memoery-based user instance, but will not submnit to database
     const user = User.build({
         userName: 'zhangsan',
         password: 'p123123',
         nickName: 'zs',
         picture: '/xxx.png',
         city: 'Harbin'
     })

     // validate every attribute
     expect(user.userName).toBe('zhangsan')
     expect(user.password).toBe('p123123')
     expect(user.nickName).toBe('zs')
     expect(user.gender).toBe(3)
     expect(user.picture).toBe('/xxx.png')
     expect(user.city).toBe('Harbin')


 })