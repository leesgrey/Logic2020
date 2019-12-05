// DOM elements
const studentBody = document.querySelector("#studentBody")
const classSize = document.querySelector("#classSize")

let students = {}

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
      let sum = 0
      let total = 0
      console.log(s.assignments)
      for (assignment in s.assignments) {
        sum += s.assignments[assignment]
        total += 1
      }
      let avg = sum / total
      studentBody.innerHTML += "<tr><td>" + s._id + "</td><td>" + s.first_name + " " + s.last_name + "</td><td>" + s.email + "</td><td>" + avg + "</td></tr>"

    })
    return 0
  }).then(() => {
    fetch("/api/students").then((res) => {
      if (res.status === 200) {
        return res.json()
      }
    }).then((json) => {
      students = json
    })
  })
}

getStudents()
