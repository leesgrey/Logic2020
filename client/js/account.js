"use strict";

fetch('/api/getCurrentUserInfo', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }
}).then((res) => {
  if (res.status === 200) {
    // console.log(res.json());
    return res.json();
  } else {
    return error;
  }
}).then(function(body){
  var name = body.first_name + " " + body.last_name;
  document.getElementById('mainUsername').innerText = name;
  document.getElementById('institution').innerText = body.institution;
  document.getElementById('term').innerText = body.term;
  document.getElementById('course').innerText = body.course;
});
