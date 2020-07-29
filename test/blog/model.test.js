/**
 * @description tweet model unit test
 * @author Zhenhan Li
 */

const { Blog } = require('../../src/db/model/index')

test('tweet data model attributes should fit', () => {
    const blog = Blog.build({
        userId: 1,
        content: 'tweet content',
        image: '/test.png'
    })
    expect(blog.userId).toBe(1)
    expect(blog.content).toBe('tweet content')
    expect(blog.image).toBe('/test.png')
})