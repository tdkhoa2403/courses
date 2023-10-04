let listCoursesBlock = document.querySelector('#list-courses');
let courseAPI = 'http://localhost:3000/courses';

function start() {
    getCourses(renderCourses);
    handleCreateForm();
}
start();


//Functions
function getCourses(callBack) {
    fetch(courseAPI)
        .then((response) => {
            return response.json();
        })
        .then(callBack);
}
function createCourse(data) {
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    fetch(courseAPI, options)
        .then(() => {
            renderCourses(data);
        })
}
function deleteCourse(id) {
    let options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    fetch(courseAPI + "/" + id, options)
}
function editCourse(id) {
    let name = document.querySelector('input[name="name"]');
    let description = document.querySelector('input[name="description"]');
    let createBtn = document.querySelector('#create');
    createBtn.innerHTML = "Save";
    name.focus();
    createBtn.onclick = function() {
        let formData = {
            name: name.value,
            description: description.value
        }
        let options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        };
        fetch(courseAPI + "/" + id, options)
    }
}
function renderCourses(courses) {
    let htmls = courses.map((course) => {
        return `
            <li>
                <h4>${course.name}</h4>
                <h4>${course.description}</h4>
                <button onclick="deleteCourse(${course.id})">Delete</button>
                <button onclick="editCourse(${course.id})">Edit</button>
            </li>
        `;
    });
    listCoursesBlock.innerHTML = htmls.join('');
}
function handleCreateForm() {
    let createBtn = document.querySelector('#create');
    createBtn.onclick = () => {
        let name = document.querySelector('input[name="name"]').value;
        let description = document.querySelector('input[name="description"]').value;
        let formData = {
            name: name,
            description: description
        }
        createCourse(formData)
    }
}

