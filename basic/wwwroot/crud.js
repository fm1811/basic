const baseUrl = window.location.origin;
console.log(baseUrl);

function getAllPeople() {
fetch(`${baseUrl}/people`, {
        method: "GET"
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Error getting people");
        }
        return response.json();
    })
    .then((data) => {
        console.log(data);
        const peopleList = document.getElementById("peopleList");
        peopleList.innerHTML = "";

        data.forEach((person) => {
            const row = document.createElement("tr");
            const idCell = document.createElement("td");
            idCell.textContent = person.id;
            row.appendChild(idCell);

            const nameCell = document.createElement("td");
            nameCell.textContent = person.name;
            row.appendChild(nameCell);

            const ageCell = document.createElement("td");
            ageCell.textContent = person.age;
            row.appendChild(ageCell);
            
            peopleList.appendChild(row);
        });
    })
    .catch(error => {
        console.error("Error getting people", error);
    });
}

function addNewPerson() {
    let name = document.getElementById("name").value;
    let age = document.getElementById("age").value;

    fetch(`${baseUrl}/addperson`, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `name=${name}&age=${age}`
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Error adding person");
        }
        return response.json();
    })
    .then(data => {
        console.log("Person added successfully", data);
        getAllPeople();
    })
    .catch(error => {
        console.error("Error adding person", error);
    });
}

function updatePerson() {
    let id = parseInt(document.getElementById("updateId").value);
    if (!id) {
        console.error("No id entered");
        alert("Please enter an id to update a person");
        return;
    }
    console.log(id);

    let name = document.getElementById("updateName").value;
    if (!name) {
        console.error("No name entered");
        return;
    }
    console.log(name);

    let age = document.getElementById("updateAge").value;
    if (!age) {
        console.error("No age entered");
        return;
    }
    console.log(age);

    const formdata = new FormData();
    formdata.append("id", id);
    formdata.append("updatedName", name);
    formdata.append("updatedAge", age);

    fetch(`${baseUrl}/updateperson`, {
        method: "PUT",
        body: formdata
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Error updating person");
        }
        return response.json();
    })
    .then(data => {
        console.log("Person updated successfully", data);
        getAllPeople();
    })
    .catch(error => {
        console.error("Error updating person", error);
    });
}

function findPerson() {
    let id = parseInt(document.getElementById("findId").value);
    if (!id) {
        console.error("No id entered");
        alert("Please enter an id to find a person");
        return;
    }

    fetch(`${baseUrl}/findperson`, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `id=${id}`
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Error finding person");
        }
        return response.json();
    })
    .then((data) => {
        console.log("Person found", data);
        alert(`Person found: ${data.name} is ${data.age} years old`);
        const peopleList = document.getElementById("peopleList");
        peopleList.innerHTML = "";
        const row = document.createElement("tr");
        const idCell = document.createElement("td");
        idCell.textContent = data.id;
        row.appendChild(idCell);

        const nameCell = document.createElement("td");
        nameCell.textContent = data.name;
        row.appendChild(nameCell);

        const ageCell = document.createElement("td");
        ageCell.textContent = data.age;
        row.appendChild(ageCell);
            
        peopleList.appendChild(row);

    })
    .catch(error => {
        console.error("Error finding person", error);
    });
}

function deletePerson() {
    let id = parseInt(document.getElementById("deleteId").value);
    if (!id) {
        console.error("Element with id 'deleteId' not found");
        alert("Please enter an id to delete a person");
        return;
    }
    const  formdata = new FormData();
    formdata.append("id", id);
    console.log(id);
    fetch(`${baseUrl}/deleteperson`, {
        method: "DELETE",
        body: formdata
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Error deleting person");
        }
        return response.json();
    })
    .then(data => {
        console.log("Person deleted successfully", data);
        getAllPeople();
    })
    .catch(error => {
        console.error("Error deleting person", error);
    });
}
