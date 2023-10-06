const studentListDiv = document.getElementById('studentList');


function start(){
fetch('/api/student', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    },

}).then((response) => response.json()).then((data) => {
    console.log(data)
    data.forEach((student) => {
        const studentDiv = document.createElement('div');
        studentDiv.className = 'student';
        studentDiv.innerHTML = `
        <h3>${student.firstName} ${student.lastName}</h3>
        `
        studentListDiv.appendChild(studentDiv);
    })
})
// <p>${student.email}</p>
// <p>${student.phone}</p>
// <p>${student.teacher_id}</p>
}

start()