const nameInput = document.getElementById("name");
const priceInput = document.getElementById("price");
const capacityInput = document.getElementById("capacity");
const descriptionInput = document.getElementById("description");
const categoryInput = document.getElementById("category");

const addBtn = document.getElementById("add-btn");
const updateBtn = document.getElementById("update-btn");
const deleteBtn = document.getElementById("delete-btn");
const keyword = document.getElementById("keyword");
const tbody = document.getElementById("tbody");

let courses = JSON.parse(localStorage.getItem("courses")) || [];
let editIndex = null;

display();

// add course
addBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const course = {
        name: nameInput.value.trim(),
        price: priceInput.value.trim(),
        capacity: capacityInput.value.trim(),
        description: descriptionInput.value.trim(),
        category: categoryInput.value,
    };


    if (!course.name || !course.price || !course.capacity || !course.description || !course.category) {
        Swal.fire({
            title: "Error",
            text: "All fields are required",
            icon: "error",
            confirmButtonColor: "#2563eb",
        });
        return;
    }

    courses.push(course);
    saveAndDisplay("Course added successfully");
    clear();
});

// update course
updateBtn.addEventListener("click", () => {
    if (editIndex === null) return;

    const course = {
        name: nameInput.value.trim(),
        price: priceInput.value.trim(),
        capacity: capacityInput.value.trim(),
        description: descriptionInput.value.trim(),
        category: categoryInput.value,
    };

    if (!course.name || !course.price || !course.capacity || !course.description || !course.category) {
        Swal.fire({
            title: "Error",
            text: "All fields are required",
            icon: "error",
            confirmButtonColor: "#2563eb",
        });
        return;
    }

    courses[editIndex] = course;
    saveAndDisplay("Course updated successfully");
    addBtn.classList.remove("hidden");
    updateBtn.classList.add("hidden");
    clear();
    editIndex = null;
});

// delete course
function deleteCourse(i) {
    Swal.fire({
        title: "Are you sure ?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "Cancel",
        confirmButtonColor: "#dc2626",
        cancelButtonColor: "#2563eb",
    }).then((result) => {
        if (result.isConfirmed) {
            courses.splice(i, 1);
            saveAndDisplay("Course deleted");
        }
    });
}

// delete all
deleteBtn.addEventListener("click", () => {
    Swal.fire({
        title: "Are you sure ?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "Cancel",
        confirmButtonColor: "#dc2626",
        cancelButtonColor: "#2563eb",
    }).then((result) => {
        if (result.isConfirmed) {
            courses = [];
            saveAndDisplay("All courses deleted");
        }
    });
});

// edit course
function editCourse(i) {
    const course = courses[i];
    nameInput.value = course.name;
    priceInput.value = course.price;
    capacityInput.value = course.capacity;
    descriptionInput.value = course.description;
    categoryInput.value = course.category;

    addBtn.classList.add("hidden");
    updateBtn.classList.remove("hidden");
    editIndex = i;
}

// search
keyword.addEventListener("input", () => {
    display(keyword.value.trim().toLowerCase());
});

// display courses
function display(search = "") {
    tbody.innerHTML = "";

    courses.forEach((c, i) => {
        if (
            c.name.toLowerCase().includes(search.toLowerCase()) ||
            c.category.toLowerCase().includes(search.toLowerCase()) ||
            c.description.toLowerCase().includes(search.toLowerCase())
        ) {
            const row = document.createElement("tr");
            row.innerHTML = `
        <td class="border border-gray-400 px-2 py-1 text-center">${i + 1}</td>
        <td class="border border-gray-400 px-2 py-1">${c.name}</td>
        <td class="border border-gray-400 px-2 py-1">${c.price}</td>
        <td class="border border-gray-400 px-2 py-1">${c.capacity}</td>
        <td class="border border-gray-400 px-2 py-1">${c.description}</td>
        <td class="border border-gray-400 px-2 py-1">${c.category}</td>
        
        <td class="border border-gray-400 px-2 py-1 flex gap-2 justify-center">
          <button onclick="editCourse(${i})" class="bg-green-600 hover:bg-green-700 w-10 h-10 flex items-center justify-center rounded">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white pointer-events-none" fill="currentColor" viewBox="0 0 20 20">
              <path d="M17.414 2.586a2 2 0 010 2.828l-10 10a2 2 0 01-1.414.586H4a1 1 0 01-1-1v-2.586a2 2 0 01.586-1.414l10-10a2 2 0 012.828 0z"/>
            </svg>
          </button>

          <button onclick="deleteCourse(${i})" class="bg-red-600 hover:bg-red-700 w-10 h-10 flex items-center justify-center rounded">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white pointer-events-none" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M6 2a2 2 0 00-2 2v1h12V4a2 2 0 00-2-2H6zM4 7v9a2 2 0 002 2h8a2 2 0 002-2V7H4z" clip-rule="evenodd"/>
            </svg>
          </button>
        </td>
      `;
            tbody.appendChild(row);
        }
    });
}

// clear form
function clear() {
    nameInput.value = "";
    priceInput.value = "";
    capacityInput.value = "";
    descriptionInput.value = "";
    categoryInput.value = "";
}

// save and display
function saveAndDisplay(message) {
    localStorage.setItem("courses", JSON.stringify(courses));
    display();
    Swal.fire({
        title: message,
        icon: "success",
        confirmButtonColor: "#2563eb",
    });
}
