import { parse, format } from 'node:url';
import { toNameValuePairs } from './util.js';

export function createSyntheticEventFromFrameNavigated(page, frameParams) {
  const { frame } = frameParams;
  const url = parse(frame.url, true);
  const req = {
    method: "GET",
    url: format(frame.url),
    queryString: toNameValuePairs(url.query),
    postData: undefined,
    headersSize: -1,
    bodySize: 0,
    cookies: [],
    headers: []
  };

  const entry = {
    cache: {},
    startedDateTime: page.startedDateTime ? page.startedDateTime : '',
    __requestWillBeSentTime: undefined,
    __wallTime: undefined,
    _requestId: frame.loaderId,
    __frameId: frame.id,
    _initialPriority: 'Very High',
    _priority: 'Very High',
    pageref: page.id,
    request: req,
    time: 0
  };

  return entry;
}

export function createSyntheticEventFromResponse(page, responseParams) {
  const url = parse(responseParams.response.url, true);
  const req = {
    method: "GET",
    url: format(responseParams.response.url),
    queryString: toNameValuePairs(url.query),
    postData: undefined,
    headersSize: -1,
    bodySize: 0,
    cookies: [],
    headers: []
  };

  const entry = {
    cache: {},
    startedDateTime: page.startedDateTime ? page.startedDateTime : '',
    __requestWillBeSentTime: (responseParams.response.timing || {}).requestTime,
    __wallTime: page.__wallTime,
    _requestId: responseParams.requestId,
    __frameId: responseParams.frameId,
    _initialPriority: 'Very High',
    _priority: 'Very High',
    pageref: page.id,
    request: req,
    time: 0
  };

  return entry;
} 