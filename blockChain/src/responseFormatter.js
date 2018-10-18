'use strict';

const DEFAULT_HTTP_SUCCESS_CODE = '200';
// const logger = require('../bootstrap/bunyan');
let statusCode = DEFAULT_HTTP_SUCCESS_CODE;
const constants = require('./constants');

module.exports = {
  formatResponse
};

function formatResponse (req, res, next) {
  let jsonResponse = res.json;
  req.__requestStartTime = new Date().getTime();
  res.json = (data) => {
    res.json = jsonResponse;
    if (data.meta) {
      if (!data.meta.code) {
        data.meta.code = data.statusCode || res.statusCode || statusCode;
      }
    } else {
      data = {
        meta: {
          code: data.statusCode || res.statusCode || statusCode
        },
        data: data
      };
    }
    if (!data.meta.skip || !data.meta.pageSize) {
      data.meta.skip = +req.query.skip || constants.pagination.skip;
      data.meta.pageSize = +req.query.pageSize || constants.pagination.pageSize;
    }
    return res.json(data);
  };
  next();
}
