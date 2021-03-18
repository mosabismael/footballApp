'use strict';

/* global Post */

/**
 * Post.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */

// Public dependencies.
const _ = require('lodash');
const moment = require('moment');
var ObjectId = require('mongodb').ObjectID;

// const socket = io();
// listen for event name 'hello' & log it
const { convertRestQueryParams, buildQuery } = require('strapi-utils');


module.exports = {
  getMyPost: (params) => {
        var array = [];

    return new Promise((resolve, reject) => {
      Post
        .find({ user: params.user_id })
        .populate({ path: 'location', select: 'name' })
        .populate({ path: 'class', select: 'name' })
        .populate({ path: 'user', select: ['username', 'classes'] })
        .populate({ path: 'comments', select: ['content', 'user'] })
        .populate('likes').sort('-updatedAt')
        .then((items) => {
          for (let i = 0; i < items.length; i++) {
            if (items[i].likes.length > 0) {
              for (let l = 0; l < items[i].likes.length; l++) {
                if (items[i].likes[l]['user'] == params.user_id) {
                  array.push({
                    _id: items[i].id,
                    content: items[i].content,
                    userID: items[i].user['id'],
                    user: items[i].user['username'],
                    avatarUser: items[i].user.avatar,
                    classitemID: items[i].class['id'],
                    classitem: items[i].class['name'],
                    location: items[i].location['name'],
                    date: moment(items[i].updatedAt).fromNow(),
                    image: items[i].Image,
                    comment: items[i].comments.length,
                    Likes: items[i].likes.length,
                    type: items[i].type,
                    status: true
                  });

                  resolve(array);
                  i++;
                }
              }
              array.push({
                _id: items[i].id,
                content: items[i].content,
                userID: items[i].user['id'],
                user: items[i].user['username'],
                avatarUser: items[i].user.avatar,
                classitemID: items[i].class['id'],
                classitem: items[i].class['name'],
                location: items[i].location['name'],
                date: moment(items[i].updatedAt).fromNow(),
                image: items[i].Image,
                comment: items[i].comments.length,
                Likes: items[i].likes.length,
                type: items[i].type,
                status: false,
              });
              resolve(array);
            } else {
              array.push({
                _id: items[i].id,
                content: items[i].content,
                userID: items[i].user['id'],
                user: items[i].user['username'],
                avatarUser: items[i].user.avatar,
                classitemID: items[i].class['id'],
                classitem: items[i].class['name'],
                location: items[i].location['name'],
                date: moment(items[i].updatedAt).fromNow(),
                image: items[i].Image,
                comment: items[i].comments.length,
                Likes: items[i].likes.length,
                type: items[i].type,
                status: false,

              });
              resolve(array);
            }
          }
        });
    })},
  fetchSave: (params) => {
    var array = [];

    return new Promise((resolve, reject) => {
      Post
        .find().populate({ path: 'location', select: 'name' })
        .populate({ path: 'class', select: 'name' })
        .populate({ path: 'user', select: 'username' })
        .populate({ path: 'comments', select: ['content', 'user'] })
        .populate('likes').populate('saves').sort('-updatedAt')
        .then((items) => {
          for (let i = 0; i < items.length; i++) {
            if (items[i].saves.length > 0) {
              for (let l = 0; l < items[i].saves.length; l++) {
                if (items[i].saves[l]['user'] == params.user_id) {
                  array.push({
                    _id: items[i].id,
                    content: items[i].content,
                    userID: items[i].user['id'],
                    user: items[i].user['username'],
                    avatarUser: items[i].user.avatar,
                    classitemID: items[i].class['id'],
                    classitem: items[i].class['name'],
                    location: items[i].location['name'],
                    date: moment(items[i].updatedAt).fromNow(),
                    image: items[i].Image,
                    comment: items[i].comments.length,
                    Likes: items[i].likes.length,
                    type: items[i].type,
                    status: false,
                    code: 1
                  });
                  resolve(array);
                } else {
                  array.push({ message: 'not found post', code: 0 });
                  resolve(array);

                }
              }
            }
          }
        });
    })
  },

  /**
   * Promise to fetch all posts.
   *
   * @return {Promise}
   */

  fetchAll: (query,params, populate) => {
    const filters = convertRestQueryParams(query);
    var array = [];
    return new Promise((resolve, reject) => {
      Post
        .find()
        .sort(filters.sort)
        .skip(filters.start)
        .limit(filters.limit)
        .populate({ path: 'location', select: 'name' })
        .populate({ path: 'class', select: 'name' })
        .populate({ path: 'user', select: ['username', 'classes'] })
        .populate({ path: 'comments', select: ['content', 'user'] })
        .populate('likes').sort('-updatedAt')
        .then((items) => {
          for (let i = 0; i < items.length; i++) {
            if (items[i].likes.length > 0) {
              for (let l = 0; l < items[i].likes.length; l++) {
                if (items[i].likes[l]['user'] == params.user_id) {
                  array.push({
                    _id: items[i].id,
                    content: items[i].content,
                    userID: items[i].user['id'],
                    user: items[i].user['username'],
                    avatarUser: items[i].user.avatar,
                    classitemID: items[i].class['id'],
                    classitem: items[i].class['name'],
                    location: items[i].location['name'],
                    date: moment(items[i].updatedAt).fromNow(),
                    image: items[i].Image,
                    comment: items[i].comments.length,
                    Likes: items[i].likes.length,
                    type: items[i].type,
                    status: true
                  });

                  resolve(array);
                  i++;
                }
              }
              array.push({
                _id: items[i].id,
                content: items[i].content,
                userID: items[i].user['id'],
                user: items[i].user['username'],
                avatarUser: items[i].user.avatar,
                classitemID: items[i].class['id'],
                classitem: items[i].class['name'],
                location: items[i].location['name'],
                date: moment(items[i].updatedAt).fromNow(),
                image: items[i].Image,
                comment: items[i].comments.length,
                Likes: items[i].likes.length,
                type: items[i].type,
                status: false,
              });
              resolve(array);
            } else {
              array.push({
                _id: items[i].id,
                content: items[i].content,
                userID: items[i].user['id'],
                user: items[i].user['username'],
                avatarUser: items[i].user.avatar,
                classitemID: items[i].class['id'],
                classitem: items[i].class['name'],
                location: items[i].location['name'],
                date: moment(items[i].updatedAt).fromNow(),
                image: items[i].Image,
                comment: items[i].comments.length,
                Likes: items[i].likes.length,
                type: items[i].type,
                status: false,

              });
              resolve(array);
            }
          }
        });
    })
  },
  /**
  * Promise to fetch all posts.
  *
  * @return {Promise}
  */
  fetchTenMax: (params) => {
    var array = [];
    return new Promise((resolve, reject) => {
      Post
        .find()
        .populate({ path: 'location', select: 'name' })
        .populate({ path: 'class', select: 'name' })
        .populate({ path: 'user', select: 'username' })
        .populate({ path: 'comments', select: ['content', 'user'] })
        .populate('likes')
        .then((items) => {
          for (let i = 0; i < 10; i++) {
            if (items[i].likes.length > 0) {
              for (let l = 0; l < items[i].likes.length; l++) {
                if (items[i].likes[l]['user'] == params.user_id) {
                  array.push({
                    _id: items[i].id,
                    content: items[i].content,
                    userID: items[i].user['id'],
                    user: items[i].user['username'],
                    avatarUser: items[i].user.avatar,
                    classitemID: items[i].class['id'],
                    classitem: items[i].class['name'],
                    location: items[i].location['name'],
                    date: moment(items[i].updatedAt).fromNow(),
                    image: items[i].Image,
                    comment: items[i].comments.length,
                    Likes: items[i].likes.length,
                    type: items[i].type,

                    status: true
                  });
                  resolve(array.sort((a, b) => b.Likes - a.Likes));
                  i++;
                }
              }
              array.push({
                _id: items[i].id,
                content: items[i].content,
                userID: items[i].user['id'],
                user: items[i].user['username'],
                avatarUser: items[i].user.avatar,
                classitemID: items[i].class['id'],
                classitem: items[i].class['name'],
                location: items[i].location['name'],
                date: moment(items[i].updatedAt).fromNow(),
                image: items[i].Image,
                comment: items[i].comments.length,
                Likes: items[i].likes.length,
                type: items[i].type,

                status: false,
              });
              resolve(array.sort((a, b) => b.Likes - a.Likes));
            } else {
              array.push({
                _id: items[i].id,
                content: items[i].content,
                userID: items[i].user['id'],
                user: items[i].user['username'],
                avatarUser: items[i].user.avatar,
                classitemID: items[i].class['id'],
                classitem: items[i].class['name'],
                location: items[i].location['name'],
                date: moment(items[i].updatedAt).fromNow(),
                image: items[i].Image,
                comment: items[i].comments.length,
                Likes: items[i].likes.length,
                type: items[i].type,

                status: false
              });
              resolve(array.sort((a, b) => b.Likes - a.Likes));
            }
          }
        });
    })
  },
  /**
  * Promise to fetch all posts.
  *
  * @return {Promise}
  */
  fetchByClass: (query,params) => {
    var array = [];
    const filters = convertRestQueryParams(query);

    return new Promise((resolve, reject) => {
      Post
        .find({ class: params.ClassId })
        .sort(filters.sort)
        .skip(filters.start)
        .limit(filters.limit)
        .populate({ path: 'location', select: 'name' })
        .populate({ path: 'class', select: 'name' })
        .populate({ path: 'user', select: 'username' })
        .populate({ path: 'comments', select: ['content', 'user'] })
        .populate('likes').sort('-updatedAt')
        .then((items) => {
          for (let i = 0; i < items.length; i++) {
            if (items[i].likes.length > 0) {
              for (let l = 0; l < items[i].likes.length; l++) {
                if (items[i].likes[l]['user'] == params.user_id) {
                  array.push({
                    _id: items[i].id,
                    content: items[i].content,
                    userID: items[i].user['id'],
                    user: items[i].user['username'],
                    avatarUser: items[i].user.avatar,
                    classitemID: items[i].class['id'],
                    classitem: items[i].class['name'],
                    location: items[i].location['name'],
                    date: moment(items[i].updatedAt).fromNow(),
                    image: items[i].Image,
                    comment: items[i].comments.length,
                    Likes: items[i].likes.length,
                    type: items[i].type,

                    status: true
                  });
                  resolve(array);
                  i++;
                }
              }
              array.push({
                _id: items[i].id,
                content: items[i].content,
                userID: items[i].user['id'],
                user: items[i].user['username'],
                avatarUser: items[i].user.avatar,
                classitemID: items[i].class['id'],
                classitem: items[i].class['name'],
                location: items[i].location['name'],
                date: moment(items[i].updatedAt).fromNow(),
                image: items[i].Image,
                comment: items[i].comments.length,
                Likes: items[i].likes.length,
                type: items[i].type,

                status: false,
              });
              resolve(array);
            } else {
              array.push({
                _id: items[i].id,
                content: items[i].content,
                userID: items[i].user['id'],
                user: items[i].user['username'],
                avatarUser: items[i].user.avatar,
                classitemID: items[i].class['id'],
                classitem: items[i].class['name'],
                location: items[i].location['name'],
                date: moment(items[i].updatedAt).fromNow(),
                image: items[i].Image,
                comment: items[i].comments.length,
                Likes: items[i].likes.length,
                type: items[i].type,

                status: false,

              });
              resolve(array);
            }

          }
        });
    })
  },
  fetchByLocation: (query,params) => {
    var array = [];
    var array = [];
    const filters = convertRestQueryParams(query);

 
    return new Promise((resolve, reject) => {
      Post
        .find({ location: params.locationId })
        .sort(filters.sort)
        .skip(filters.start)
        .limit(filters.limit)
        .populate({ path: 'location', select: 'name' })
        .populate({ path: 'class', select: 'name' })
        .populate({ path: 'user', select: 'username' })
        .populate({ path: 'comments', select: ['content', 'user'] })
        .populate('likes').sort('-updatedAt')
        .then((items) => {
          for (let i = 0; i < items.length; i++) {
            if (items[i].likes.length > 0) {
              for (let l = 0; l < items[i].likes.length; l++) {
                if (items[i].likes[l]['user'] == params.user_id) {
                  array.push({
                    _id: items[i].id,
                    content: items[i].content,
                    userID: items[i].user['id'],
                    user: items[i].user['username'],
                    avatarUser: items[i].user.avatar,
                    classitemID: items[i].class['id'],
                    classitem: items[i].class['name'],
                    location: items[i].location['name'],
                    date: moment(items[i].updatedAt).fromNow(),
                    image: items[i].Image,
                    comment: items[i].comments.length,
                    Likes: items[i].likes.length,
                    type: items[i].type,

                    status: true
                  });
                  resolve(array);
                  i++;
                }
              }
              array.push({
                _id: items[i].id,
                content: items[i].content,
                userID: items[i].user['id'],
                user: items[i].user['username'],
                avatarUser: items[i].user.avatar,
                classitemID: items[i].class['id'],
                classitem: items[i].class['name'],
                location: items[i].location['name'],
                date: moment(items[i].updatedAt).fromNow(),
                image: items[i].Image,
                comment: items[i].comments.length,
                Likes: items[i].likes.length,
                type: items[i].type,

                status: false,
              });
              resolve(array);
            } else {
              array.push({
                _id: items[i].id,
                content: items[i].content,
                userID: items[i].user['id'],
                user: items[i].user['username'],
                avatarUser: items[i].user.avatar,
                classitemID: items[i].class['id'],
                classitem: items[i].class['name'],
                location: items[i].location['name'],
                date: moment(items[i].updatedAt).fromNow(),
                image: items[i].Image,
                comment: items[i].comments.length,
                Likes: items[i].likes.length,
                type: items[i].type,

                status: false,

              });
              resolve(array);
            }}
        });
    })
  },
  fetchByCurrentLocation: (params) => {
    var array = [];
    var goal = 30.663;
    return new Promise((resolve, reject) => {
      Post
        .find({ "location": { $near: { $geoNear: { type: "Point", coordinates: [50.0, 1.23] }, $maxDistance: 500 } } })
        .populate({ path: 'location', select: 'name' })
        .populate({ path: 'class', select: 'name' })
        .populate({ path: 'user', select: 'username' })
        .populate({ path: 'comments', select: ['content', 'user'] })
        .populate('likes')
        .then((items) => {
          for (let i = 0; i < items.length; i++) {
            if (items[i].likes.length > 0) {
              for (let l = 0; l < items[i].likes.length; l++) {
                if (items[i].likes[l]['user'] == params.user_id) {
                  array.push({
                    _id: items[i].id,
                    content: items[i].content,
                    userID: items[i].user['id'],
                    user: items[i].user['username'],
                    avatarUser: items[i].user.avatar,
                    classitemID: items[i].class['id'],
                    classitem: items[i].class['name'],
                    location: items[i].location['name'],
                    date: moment(items[i].updatedAt).fromNow(),
                    image: items[i].Image,
                    comment: items[i].comments.length,
                    Likes: items[i].likes.length,
                    type: items[i].type,
                    lat: items[i].lat,
                    long: items[i].long,

                    status: true
                  });
                  resolve(array.sort(function (a, b) {
                    return (Math.abs(b.lat - goal) < Math.abs(a.lat - goal) ? b : a);
                  }));
                  i++;
                }
              }
              array.push({
                _id: items[i].id,
                content: items[i].content,
                userID: items[i].user['id'],
                user: items[i].user['username'],
                avatarUser: items[i].user.avatar,
                classitemID: items[i].class['id'],
                classitem: items[i].class['name'],
                location: items[i].location['name'],
                date: moment(items[i].updatedAt).fromNow(),
                image: items[i].Image,
                comment: items[i].comments.length,
                Likes: items[i].likes.length,
                type: items[i].type,
                lat: items[i].lat,
                long: items[i].long,
                status: false,
              });
              resolve(array.sort(function (a, b) {
                return (Math.abs(b.lat - goal) < Math.abs(a.lat - goal) ? b : a);
              }));
            } else {
              array.push({
                _id: items[i].id,
                content: items[i].content,
                userID: items[i].user['id'],
                user: items[i].user['username'],
                avatarUser: items[i].user.avatar,
                classitemID: items[i].class['id'],
                classitem: items[i].class['name'],
                location: items[i].location['name'],
                date: moment(items[i].updatedAt).fromNow(),
                image: items[i].Image,
                comment: items[i].comments.length,
                Likes: items[i].likes.length,
                type: items[i].type,
                lat: items[i].lat,
                long: items[i].long,
                status: false,

              });
              resolve(array.sort(function (a, b) {
                  return (Math.abs(b.lat - goal) < Math.abs(a.lat - goal) ? b : a);
                })
              );
            } }
        });
    })
  },
  fetchByLocationClass: (query,params) => {
    var array = [];
    const filters = convertRestQueryParams(query);

  
    return new Promise((resolve, reject) => {
      Post
        .find({ location: params.locationId, class: params.ClassId })
        .sort(filters.sort)
        .skip(filters.start)
        .limit(filters.limit)
        .populate({ path: 'location', select: 'name' })
        .populate({ path: 'class', select: 'name' })
        .populate({ path: 'user', select: 'username' })
        .populate({ path: 'comments', select: ['content', 'user'] })
        .populate('likes').sort('-updatedAt')
        .then((items) => {
          for (let i = 0; i < items.length; i++) {
            if (items[i].likes.length > 0) {
              for (let l = 0; l < items[i].likes.length; l++) {
                if (items[i].likes[l]['user'] == params.user_id) {
                  array.push({
                    _id: items[i].id,
                    content: items[i].content,
                    userID: items[i].user['id'],
                    user: items[i].user['username'],
                    avatarUser: items[i].user.avatar,
                    classitemID: items[i].class['id'],
                    classitem: items[i].class['name'],
                    location: items[i].location['name'],
                    date: moment(items[i].updatedAt).fromNow(),
                    image: items[i].Image,
                    comment: items[i].comments.length,
                    Likes: items[i].likes.length,
                    type: items[i].type,

                    status: true
                  });
                  resolve(array);
                  i++;
                }
              }
              array.push({
                _id: items[i].id,
                content: items[i].content,
                userID: items[i].user['id'],
                user: items[i].user['username'],
                avatarUser: items[i].user.avatar,
                classitemID: items[i].class['id'],
                classitem: items[i].class['name'],
                location: items[i].location['name'],
                date: moment(items[i].updatedAt).fromNow(),
                image: items[i].Image,
                comment: items[i].comments.length,
                Likes: items[i].likes.length,
                type: items[i].type,

                status: false,
              });
              resolve(array);
            } else {
              array.push({
                _id: items[i].id,
                content: items[i].content,
                userID: items[i].user['id'],
                user: items[i].user['username'],
                avatarUser: items[i].user.avatar,
                classitemID: items[i].class['id'],
                classitem: items[i].class['name'],
                location: items[i].location['name'],
                date: moment(items[i].updatedAt).fromNow(),
                image: items[i].Image,
                comment: items[i].comments.length,
                Likes: items[i].likes.length,
                type: items[i].type,
                 status: false,
              });
              resolve(array);
            }
            }
        });
    })
  },
  /**
   * Promise to fetch a/an post.
   *
   * @return {Promise}
   */

  fetch: (params) => {
    // Select field to populate.
    var array = [];

    return new Promise((resolve, reject) => {
      Post
        .find({ _id: params._id })
        .populate({ path: 'location', select: 'name' })
        .populate({ path: 'class', select: 'name' })
        .populate({ path: 'user', select: ['username', 'classes'] })
        .populate({ path: 'comments', select: ['content', 'user'] })
        .populate('likes')
        .then((items) => {
          for (let i = 0; i < items.length; i++) {
            if (items[i].likes.length > 0) {
              for (let l = 0; l < items[i].likes.length; l++) {
                if (items[i].likes[l]['user'] == params.user_id) {
                  array.push({
                    _id: items[i].id,
                    content: items[i].content,
                    userID: items[i].user['id'],
                    user: items[i].user['username'],
                    avatarUser: items[i].user.avatar,
                    classitemID: items[i].class['id'],
                    classitem: items[i].class['name'],
                    location: items[i].location['name'],
                    date: moment(items[i].updatedAt).fromNow(),
                    image: items[i].Image,
                    comment: items[i].comments.length,
                    Likes: items[i].likes.length,
                    type: items[i].type,
                    status: true
                  });

                  resolve(array);
                  i++;
                }
              }
              array.push({
                _id: items[i].id,
                content: items[i].content,
                userID: items[i].user['id'],
                user: items[i].user['username'],
                avatarUser: items[i].user.avatar,
                classitemID: items[i].class['id'],
                classitem: items[i].class['name'],
                location: items[i].location['name'],
                date: moment(items[i].updatedAt).fromNow(),
                image: items[i].Image,
                comment: items[i].comments.length,
                Likes: items[i].likes.length,
                type: items[i].type,
                status: false,
              });
              resolve(array);
            } else {
              array.push({
                _id: items[i].id,
                content: items[i].content,
                userID: items[i].user['id'],
                user: items[i].user['username'],
                avatarUser: items[i].user.avatar,
                classitemID: items[i].class['id'],
                classitem: items[i].class['name'],
                location: items[i].location['name'],
                date: moment(items[i].updatedAt).fromNow(),
                image: items[i].Image,
                comment: items[i].comments.length,
                Likes: items[i].likes.length,
                type: items[i].type,
                status: false,

              });
                resolve(array);
            }
          }
        });
    })
  },

  /**
   * Promise to count posts.
   *
   * @return {Promise}
   */

  count: (params) => {
    const filters = convertRestQueryParams(params);

    return buildQuery({
      model: Post,
      filters: { where: filters.where },
    })
      .count()
  },

  /**
   * Promise to add a/an post.
   *
   * @return {Promise}
   */

  add: async (values) => {
    
        // Extract values related to relational data.
    const relations = _.pick(values, Post.associations.map(ast => ast.alias));
    const data = _.omit(values, Post.associations.map(ast => ast.alias));

    // Create entry with no-relational data.
    const entry = await Post.create(data);

    // Create relational data and return the entry.
    return Post.updateRelations({ _id: entry.id, values: relations });
  },

  /**
   * Promise to edit a/an post.
   *
   * @return {Promise}
   */

  edit: async (params, values) => {
    // Extract values related to relational data.
    const relations = _.pick(values, Post.associations.map(a => a.alias));
    const data = _.omit(values, Post.associations.map(a => a.alias));

    // Update entry with no-relational data.
    const entry = await Post.updateOne(params, data, { multi: true });

    // Update relational data and return the entry.
    return Post.updateRelations(Object.assign(params, { values: relations }));
  },

  /**
   * Promise to remove a/an post.
   *
   * @return {Promise}
   */

  remove: async params => {
    // Select field to populate.
    const populate = Post.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias)
      .join(' ');

    // Note: To get the full response of Mongo, use the `remove()` method
    // or add spent the parameter `{ passRawResult: true }` as second argument.
    const data = await Post
      .findOneAndRemove(params, {})
      .populate(populate);

    if (!data) {
      return data;
    }

    await Promise.all(
      Post.associations.map(async association => {
        if (!association.via || !data._id || association.dominant) {
          return true;
        }

        const search = _.endsWith(association.nature, 'One') || association.nature === 'oneToMany' ? { [association.via]: data._id } : { [association.via]: { $in: [data._id] } };
        const update = _.endsWith(association.nature, 'One') || association.nature === 'oneToMany' ? { [association.via]: null } : { $pull: { [association.via]: data._id } };

        // Retrieve model.
        const model = association.plugin ?
          strapi.plugins[association.plugin].models[association.model || association.collection] :
          strapi.models[association.model || association.collection];

        return model.update(search, update, { multi: true });
      })
    );

    return data;
  },

  /**
   * Promise to search a/an post.
   *
   * @return {Promise}
   */

  search: async (params) => {
    // Convert `params` object to filters compatible with Mongo.
    const filters = strapi.utils.models.convertParams('post', params);
    // Select field to populate.
    const populate = Post.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias)
      .join(' ');

    const $or = Object.keys(Post.attributes).reduce((acc, curr) => {
      switch (Post.attributes[curr].type) {
        case 'integer':
        case 'float':
        case 'decimal':
          if (!_.isNaN(_.toNumber(params._q))) {
            return acc.concat({ [curr]: params._q });
          }

          return acc;
        case 'string':
        case 'text':
        case 'password':
          return acc.concat({ [curr]: { $regex: params._q, $options: 'i' } });
        case 'boolean':
          if (params._q === 'true' || params._q === 'false') {
            return acc.concat({ [curr]: params._q === 'true' });
          }

          return acc;
        default:
          return acc;
      }
    }, []);
    var array = [];
    console.log(filters);
    return new Promise((resolve, reject) => {
      Post
        .find({ $or })
        .sort(filters.sort)
        .skip(filters.start)
        .limit(filters.limit)
        .populate({ path: 'location', select: 'name' })
        .populate({ path: 'class', select: 'name' })
        .populate({ path: 'user', select: ['username', 'classes'] })
        .populate({ path: 'comments', select: ['content', 'user'] })
        .populate(populate)
        .populate('likes').sort('-updatedAt')
        .then((items) => {
          for (let i = 0; i < items.length; i++) {
            if (items[i].likes.length > 0) {
              for (let l = 0; l < items[i].likes.length; l++) {
                if (items[i].likes[l]['user'] == params.user_id) {
                  array.push({
                    _id: items[i].id,
                    content: items[i].content,
                    userID: items[i].user['id'],
                    user: items[i].user['username'],
                    avatarUser: items[i].user.avatar,
                    classitemID: items[i].class['id'],
                    classitem: items[i].class['name'],
                    location: items[i].location['name'],
                    date: moment(items[i].updatedAt).fromNow(),
                    image: items[i].Image,
                    comment: items[i].comments.length,
                    Likes: items[i].likes.length,
                    type: items[i].type,
                    status: true
                  });

                  resolve(array);
                  i++;
                }
              }
              array.push({
                _id: items[i].id,
                content: items[i].content,
                userID: items[i].user['id'],
                user: items[i].user['username'],
                avatarUser: items[i].user.avatar,
                classitemID: items[i].class['id'],
                classitem: items[i].class['name'],
                location: items[i].location['name'],
                date: moment(items[i].updatedAt).fromNow(),
                image: items[i].Image,
                comment: items[i].comments.length,
                Likes: items[i].likes.length,
                type: items[i].type,
                status: false,
              });
              resolve(array);
            } else {
              array.push({
                _id: items[i].id,
                content: items[i].content,
                userID: items[i].user['id'],
                user: items[i].user['username'],
                avatarUser: items[i].user.avatar,
                classitemID: items[i].class['id'],
                classitem: items[i].class['name'],
                location: items[i].location['name'],
                date: moment(items[i].updatedAt).fromNow(),
                image: items[i].Image,
                comment: items[i].comments.length,
                Likes: items[i].likes.length,
                type: items[i].type,
                status: false,

              });
               resolve(array);
            }
          }
        });
    })
  },
  // return Post
  //   .find({ $or })
  //   .sort(filters.sort)
  //   .skip(filters.start)
  //   .limit(filters.limit)
  //   .populate(populate);

};
