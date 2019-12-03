// DOM elements
const studentBody = document.querySelector("#studentBody")
const classSize = document.querySelector("#classSize")

// get students
function getStudents() {
  const url = "/api/students"

  fetch(url).then( (res) => {
    if (res.status === 200) {
      return res.json()
    } else {
      alert("Could not load students")
    }
  }).then( (json) => {
    classSize.innerText = json.length
    json.map((s) => {
      studentBody.innerHTML += "<tr><td>" + s._id + "</td><td>" + s.first_name + " " + s.last_name + "</td><td></td><td></td></tr>"
    })
  })
}

getStudents()