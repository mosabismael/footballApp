'use strict';

/**
 * Post.js controller
 *
 * @description: A set of functions called "actions" for managing `Post`.
 */
var ObjectId = require('mongodb').ObjectID;

module.exports = {

  /**
   * Retrieve post records.
   *
   * @return {Object|Array}
   */

  find: async (ctx, next, { populate } = {}) => {
    if (ctx.query._q) {
      return strapi.services.post.search(ctx.query);
      
    } else {

      return strapi.services.post.fetchAll(ctx.query, ctx.params, populate);

    }
  },
  findMyPost: async (ctx, next) => {
    return strapi.services.post.getMyPost(ctx.params)
  },
  findMaxTen: async (ctx, next, { populate } = {}) => {

    return strapi.services.post.fetchTenMax(ctx.params);

  },
  findByClass: async (ctx, next, { populate } = {}) => {
    if (ctx.query._q) {
      return strapi.services.post.search(ctx.query);
    } else {
    return strapi.services.post.fetchByClass(ctx.query,ctx.params);
    }

  },
  findByLocation: async (ctx, next, { populate } = {}) => {
    if (ctx.query._q) {
      return strapi.services.post.search(ctx.query);
    } else {
    return strapi.services.post.fetchByLocation(ctx.query,ctx.params);
    }

  },
  findByLocationClass: async (ctx, next, { populate } = {}) => {
    if (ctx.query._q) {
      return strapi.services.post.search(ctx.query);
    } else {
    return strapi.services.post.fetchByLocationClass(ctx.query,ctx.params);
    }
  },
  findByCurrentLocation:async (ctx, next, { populate } = {}) => {

    return strapi.services.post.fetchByCurrentLocation(ctx.params);

  },
  findPostSave: async (ctx) => {

    return strapi.services.post.fetchSave(ctx.params);

  },
  /**
   * Retrieve a post record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.post.fetch(ctx.params);
  },

  getuserClass: async (query,params) => {
    var array = [];
    return "..."
  
  },
  /**
   * Count post records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.post.count(ctx.query);
  },

  /**
   * Create a/an post record.
   *
   * @return {Object}
   */

  // create: async (ctx) => {


  //   return strapi.services.post.add(ctx.request.body);
  // },
  create: async (ctx) => {
    const data = await strapi.services.post.add(ctx.request.body);  // Send 201 `created`
    ctx.created(data);  // NEW LINE: call our method emitToAllUsers and pass it body request
    strapi.emitToAllUsers(ctx.request.body);
  },

  /**
   * Update a/an post record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.post.edit(ctx.params, ctx.request.body);
  },

  /**
   * Destroy a/an post record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.post.remove(ctx.params);
  }
};
