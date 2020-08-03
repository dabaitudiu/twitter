# Instant Share

<p align="center">
  <img src="https://github.com/dabaitudiu/Instant-Share/blob/master/materials/logo-share.png" width="500">
</p>


Instant Share is
an extensible, highly modularized and structured **backend framework** for constructing **twitter-like website**. It is embedded with complete and compact unit testing for maintainence and extension. <hr>
- Keywords: JavaScript, Node.js, Koa2, Redis, MySQL, Sequelize ORM, application architecture, unit testing
- Demo: http://shareins.xyz
- Demo Account: {userName: ciri, passWord: ciri}

## 0.Overview
The focus of this project is to practice backend development ability to an enterprise-level, which needs high-concurrency, highly ordered architecture, and intact unit testing mechanisms. Spring, Node.js, Go, are nowadays popular tools and languages applied for backend development. Thus this project is my second step in my backend-practice triology. Compared with previous [CoderUCI Forum](https://coderuci.com), this project:
- Focus less on front-end, just ensure the essential components are working
- **Redis**: used for 'Sqaure Discovery Page', cahce the entries for fast access
- **Sequelize ORM**: Another way to manipulate database. Increases code unity, avoid SQL sentences, and convert everything to object manipulations
- **Session**: complete intact register & login & session transfer, applied **encryption method** to protect database leakage.
- **Architecture**: This project strictly follows the **MVCS** (model, view, controller, service) framework, convenient and easy to maintain and debug.
- **code standards**：Embedded with eslint, jsdoc comment semantics, and complete unit testing. Modeling the development process in an enterprise.

#### Framework

<p align="center">
  <img src="https://github.com/dabaitudiu/Instant-Share/blob/master/materials/structure.png" width = "600"/>
</p>

#### Testing
By testing, it's easier for us to check the compatibility of new features and original functions.
<p align="center">
  <img src="https://github.com/dabaitudiu/Instant-Share/blob/master/materials/testingdemo.png" width = "600"/>
</p>

## 1.Pages and Functions Introduction

#### Home Page
At home page, you can view the activities of people you are following. The **Load More** function here is to enhance website readability.

<p align="center">
  <img src="https://github.com/dabaitudiu/Instant-Share/blob/master/materials/index.gif" width = "700"/>
</p>

#### Share moments
By simply typing your thoughts or upload an image, you can share your splendid moments.
<p align="center">
  <img src="https://github.com/dabaitudiu/Instant-Share/blob/master/materials/post.gif" width = "700"/>
</p>

#### Follow/Unfollow
You can follow/unfollow a person in his profile page.
<p align="center">
  <img src="https://github.com/dabaitudiu/Instant-Share/blob/master/materials/follow.gif" width = "700"/>
</p>

#### Check posts that mentioned Me
Clicking "@ Me", you can find posts mentioned you
<p align="center">
  <img src="https://github.com/dabaitudiu/Instant-Share/blob/master/materials/atme.gif" width = "700"/>
</p>

#### Reply posts / at others
If you want to @others, simply type "@" in the text area. To reply to a message, press "Reply"
<p align="center">
  <img src="https://github.com/dabaitudiu/Instant-Share/blob/master/materials/reply.gif" width = "700"/>
</p>

#### Change personal info
Go to "Settings" page, you can change your personal info. Remember to save before your leave.
<p align="center">
  <img src="https://github.com/dabaitudiu/Instant-Share/blob/master/materials/changeinfo.gif" width = "700"/>
</p>


## 2. Deployment

#### 2-1. Install nodejs & npm
Please visit [Node.js](https://nodejs.org/en/download/package-manager/) to install these two essentials.

#### 2-2. Install npm packages
```shell
cd Instant-Share/
npm install
```

#### 2-3. Install & Setup MySQL & Redis
You can find the keys at src/conf folder

#### 2-4. Start / Test
```shell
npm run dev #(development)
npm run prd #(production)
npm run test #(test)
```

## 3. Acknowledgement 
This project takes [Shuangyue](https://www.imooc.com/t/4427201)'s instructions as references. I am very grateful for the teacher's help during the process of development. Finishing this project greatly enhanced my understanding of backend development and enterprise development workflow. 


## 4. License
[MIT License](https://github.com/dabaitudiu/Instant-Share/blob/master/LICENSE) © Zhenhan Li. University of California, Irvine. 



