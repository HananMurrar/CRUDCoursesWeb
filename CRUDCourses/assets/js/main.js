var nameInput = document.getElementById("name");
var price = document.getElementById("price");
var capacity = document.getElementById("capacity");
var description = document.getElementById("description");
var category = document.getElementById("category");

var addB = document.getElementById("add-btn");
var updateB = document.getElementById("update-btn");
var deleteB = document.getElementById("delete-btn");
var keyword = document.getElementById("keyword");
var tbody = document.getElementById("tbody");

updateB.style.display = "none";

var courses = [];

display();

// add
addB.onclick = function (e) {
  e.preventDefault();
  var course = {
    name: nameInput.value,
    price: price.value,
    capacity: capacity.value,
    description: description.value,
    category: category.value,
  };
  var errors = 0;
  if (course.name.length < 1) {
    errors++;
    nameInput.classList.add("is-invalid");
  } else {
    errors--;
    nameInput.classList.remove("is-invalid");
    nameInput.classList.add("is-valid");
  }
  if (isNaN(course.price) || !course.price) {
    errors++;
    price.classList.add("is-invalid");
  } else {
    errors--;
    price.classList.remove("is-invalid");
    price.classList.add("is-valid");
  }
  if (isNaN(course.capacity) || !course.capacity) {
    errors++;
    capacity.classList.add("is-invalid");
  } else {
    errors--;
    capacity.classList.remove("is-invalid");
    capacity.classList.add("is-valid");
  }
  if (!course.description) {
    errors++;
    description.classList.add("is-invalid");
  } else {
    errors--;
    description.classList.remove("is-invalid");
    description.classList.add("is-valid");
  }
  if (!course.category) {
    errors++;
    category.classList.add("is-invalid");
  } else {
    errors--;
    category.classList.remove("is-invalid");
    category.classList.add("is-valid");
  }
  courses.push(course);
  display();
  clear();
  Swal.fire("Good Job", "You Add Course", "successfully");
  localStorage.setItem("courses", JSON.stringify(courses));
};

// search
keyword.onkeyup = function () {
  var k = keyword.value;
  var data = ``;
  for (var i = 0; i < courses.length; i++) {
    if (
      courses[i].name.toLowerCase().includes(k.toLowerCase()) ||
      courses[i].category.toLowerCase().includes(k.toLowerCase()) ||
      courses[i].description.toLowerCase().includes(k.toLowerCase())
    ) {
      data += `
                <tr>
                <td>${i + 1}</td>
                <td>${courses[i].name}</td>
                <td>${courses[i].category}</td>
                <td>${courses[i].description}</td>
                <td>${courses[i].price}</td>
                <td>${courses[i].capacity}</td>
                <td>
                    <a href="#" class="btn btn-primary" onclick="edit(${i})"><i class="fa-solid fa-pen"></i></a>
                    <a href="#" class="btn btn-danger" onclick="deleteCourse(${i})"><i class="fa-solid fa-trash"></i></a>
                </td>
            </tr>
            `;
    }
  }
  tbody.innerHTML = data;
};

// display data
function display() {
  var data = ``;
  for (var i = 0; i < courses.length; i++) {
    data += `<tr>
        <td>${i + 1}</td>
        <td>${courses[i].name}</td>
        <td>${courses[i].category}</td>
        <td>${courses[i].description}</td>
        <td>${courses[i].price}</td>
        <td>${courses[i].capacity}</td>
        <td>
            <a href="#" class="btn btn-primary" onclick="edit(${i})"><i class="fa-solid fa-pen"></i></a>
            <a href="#" class="btn btn-danger" onclick="deleteCourse(${i})"><i class="fa-solid fa-trash"></i></a>
        </td>
    </tr>`;
  }
  tbody.innerHTML = data;
}

// clear input
function clear() {
  nameInput.value = "";
  price.value = "";
  capacity.value = "";
  category.value = "";
  description.value = "";
}

// delete data
function deleteCourse(i) {
  Swal.fire({
    title: "Are You Sure ?",
    text: "You Will Not Able To Revert This",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes Delete It",
  }).then((result) => {
    if (result.isConfirmed) {
      courses.splice(i, 1);
      display();
      localStorage.setItem("courses", JSON.stringify(courses));
      Swal.fire("Deleted", "Your File Deleted", "success");
    }
  });
}

// delete all data
deleteB.onclick = function () {
  Swal.fire({
    title: "Are You Sure ?",
    text: "You Will Not Able To Revert This",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes Delete It",
  }).then((result) => {
    if (result.isConfirmed) {
      courses = [];
      localStorage.setItem("courses", JSON.stringify(courses));
      display();
      Swal.fire("Deleted", "Your File Has Deleted", "success");
    }
  });
};

// edit
function edit(i) {
  nameInput.value = courses[i].name;
  price.value = courses[i].price;
  capacity.value = courses[i].capacity;
  description.value = courses[i].description;
  category.value = courses[i].category;
  updateB.onclick = function () {
    update(i);
  };
  addB.style.display = "none";
  updateB.style.display = "inline-block";
}

// update
function update(i) {
  Swal.fire({
    title: "Are You Sure ?",
    text: "You Will Not Able To Revert This",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes Edit It",
  }).then((result) => {
    if (result.isConfirmed) {
      var course = {
        name: nameInput.value,
        price: price.value,
        capacity: capacity.value,
        description: description.value,
        category: category.value,
      };
      courses[i] = course;
      display();
      clear();
      addB.style.display = "inline-block";
      updateB.style.display = "none";
      localStorage.setItem("courses", JSON.stringify(courses));
      Swal.fire("Updated", "Your Course Has Updated", "success");
    } else {
      clear();
      addB.style.display = "inline-block";
      updateB.style.display = "none";
    }
  });
}

// local storage
localStorage.setItem("courses", JSON.stringify(courses));

// courses array
if (localStorage.getItem("courses")) {
  courses = JSON.parse(localStorage.getItem("courses"));
} else {
  courses = [];
}
