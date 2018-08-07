import axios from 'axios';
var querystring = require('querystring');

const insertNewTrack = (that, data) => {
  axios.post('/insert',
    querystring.stringify(data), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }).then(function (response) {
    that.props.onFormSubmit({
      id: response.id,
      title: data.title,
      description: data.description
    });
  });
}

const updateTrack = (that, data) => {
  axios.post('/update',
    querystring.stringify(data), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }).then(function (response) {
      that.props.onFormSubmit({
        id: that.props.id,
        title: data.title,
        description: data.description
      });
  });
}

const updateTrackOnStartOrStop = (data) => {
  axios.post('/update', {_id: data.id, runningSince: data.runningSince, elapsed: data.elapsed, title: data.title, description: data.description}).then(function (response) {
      //console.log(response);
  });
}

const updateAll = (data) => {
  axios.post('/updateAll',
    {data: data}).then(function (response) {
    console.log(response.data);
  });
}

const createUrlWithParams = function(urlPath, json = null) {
  for (var key in json) {
    if (json.hasOwnProperty(key)) {
      urlPath = urlPath.replace(`{${key}}`, json[key] == null ? "" : json[key]);
    }
  }
  return urlPath;
}

export {
  insertNewTrack,
  updateTrack,
  updateAll,
  createUrlWithParams,
  updateTrackOnStartOrStop
}
