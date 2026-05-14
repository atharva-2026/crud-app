const API = "https://crud-app-690u.onrender.com";

const form = document.getElementById("userForm");
const usersDiv = document.getElementById("users");

let editId = null;

async function fetchUsers() {
  const res = await fetch(API);
  const users = await res.json();

  usersDiv.innerHTML = "";

  users.forEach(user => {
    usersDiv.innerHTML += `
      <div class="user">
        <h3>${user.name}</h3>
        <p>${user.email}</p>

        <button onclick="editUser('${user._id}','${user.name}','${user.email}')">
          Edit
        </button>

        <button onclick="deleteUser('${user._id}')">
          Delete
        </button>
      </div>
    `;
  });
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;

  if(editId) {

    await fetch(`${API}/${editId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({name,email})
    });

    editId = null;

  } else {

    await fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({name,email})
    });

  }

  form.reset();
  fetchUsers();
});

async function deleteUser(id) {
  await fetch(`${API}/${id}`, {
    method: "DELETE"
  });

  fetchUsers();
}

function editUser(id,name,email) {
  document.getElementById("name").value = name;
  document.getElementById("email").value = email;

  editId = id;
}

fetchUsers();