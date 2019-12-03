function getAssignments() {
  const url = '/api/ass'

  fetch(url).then((res) => {
    if (res.status == 200){
      return res.json()
    } else {
      alert('Could not get assignments')
    }
  }).then((json) => {
    const

  })
}