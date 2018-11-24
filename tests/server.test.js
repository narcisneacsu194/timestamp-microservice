const expect = require('expect');
const request = require('supertest');
const moment = require('moment-timezone');
const { app } = require('../server.js');

describe('/api/timestamp/:time', () => {
  it('should return timestamp and utc date when using YYYY-MM-DD format', (done) => {
    const dateStr = '2015-11-20';
    const expectedTimestamp = 1447977600000;
    const expectedUtc = 'Fri, 20 Nov 2015 00:00:00 GMT';
    request(app)
      .get(`/api/timestamp/${dateStr}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.unix).toBe(expectedTimestamp);
        expect(res.body.utc).toBe(expectedUtc);
      })
      .end(done);
  });

  it('should return timestamp and utc date when using unix timestamp as param', (done) => {
    const unixTimestamp = '1447970400000';
    const utc = 'Thu, 19 Nov 2015 22:00:00 GMT';
    request(app)
      .get(`/api/timestamp/${unixTimestamp}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.unix).toBe(parseInt(unixTimestamp, 10));
        expect(res.body.utc).toBe(utc);
      })
      .end(done);
  });

  it('should return error response if sending gibberish as param date', (done) => {
    const gibberishVar = 'gibberish';
    const error = 'Invalid Date';

    request(app)
      .get(`/api/timestamp/${gibberishVar}`)
      .expect(400)
      .expect((res) => {
        expect(res.body.error).toBe(error);
      })
      .end(done);
  });

  it('should return error response if using date param with invalid format', (done) => {
    const invalidDate = '2015-20-11';
    const error = 'Invalid Date';

    request(app)
      .get(`/api/timestamp/${invalidDate}`)
      .expect(400)
      .expect((res) => {
        expect(res.body.error).toBe(error);
      })
      .end(done);
  });
});

describe('/api/timestamp/', () => {
  it('should return current timestamp and utc date', (done) => {
    const currentDateWithoutTime = moment().format('ddd, DD MMM YYYY');
    const currentDateTimeZone = moment().tz('GMT').format('zz');

    request(app)
      .get('/api/timestamp')
      .expect(200)
      .expect((res) => {
        expect(res.body.utc).toEqual(expect.stringContaining(currentDateWithoutTime));
        expect(res.body.utc).toEqual(expect.stringContaining(currentDateTimeZone));
      })
      .end(done);
  });
});
