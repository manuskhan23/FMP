// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDXg1WPyln-EkrMM8pHt5rtBkjZPpYqgco",
  authDomain: "todo-app-7bd85.firebaseapp.com",
  databaseURL: "https://todo-app-7bd85-default-rtdb.firebaseio.com",
  projectId: "todo-app-7bd85",
  storageBucket: "todo-app-7bd85.appspot.com",
  messagingSenderId: "945549668047",
  appId: "1:945549668047:web:9deb6c75b247a638eb91ba",
  measurementId: "G-FPM5J97FP2"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

var userInput = document.getElementById("todoInput");
function addTodo() {
  var user = firebase.auth().currentUser;
  if (!user) {
    Swal.fire({ icon: 'error', title: 'Not Logged In', text: 'Please login first!' });
    return;
  }

  if (userInput.value === "") {
    Swal.fire({
      icon: 'warning',
      title: 'Empty Input',
      text: 'Please enter something before adding!',
      confirmButtonColor: '#3085d6',
    });
  } else {
    var todoList = document.getElementById("list");
    var liElement = document.createElement("li");
    var liText = document.createTextNode(userInput.value);
    liElement.appendChild(liText);
    todoList.appendChild(liElement);
    var delBtnElement = document.createElement("button");
    var delBtnText = document.createTextNode("Delete");
    delBtnElement.appendChild(delBtnText);
    delBtnElement.setAttribute("onclick", "deleteSingleItem(this)");
    delBtnElement.style.backgroundColor = "cyan";
    delBtnElement.style.boxShadow = "0 0 20px cyan";
    liElement.appendChild(delBtnElement);
    var editBtnElement = document.createElement("button");
    var editBtnText = document.createTextNode("Edit");
    editBtnElement.appendChild(editBtnText);
    editBtnElement.setAttribute("onclick", "editSingleItem(this)");
    editBtnElement.style.backgroundColor = "yellow";
    editBtnElement.style.boxShadow = "0 0 20px yellow";
    liElement.appendChild(editBtnElement);
    var todo_obj = {
      text: userInput.value,
      uid: user.uid
    };
    var key = firebase.database().ref("todos/" + user.uid).push(todo_obj).key;
    liElement.setAttribute("id", key);

    userInput.value = "";

    Swal.fire({
      icon: 'success',
      title: 'Added!',
      text: 'Your todo has been added successfully.',
      timer: 1000,
      showConfirmButton: false,
      position: 'top-end',
      toast: true
    });
  }
}
function deleteAll() {
  Swal.fire({
    title: 'Are you sure?',
    text: "This will delete all todos!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete all',
    cancelButtonText: 'No, cancel'
  }).then((result) => {
    if (result.isConfirmed) {
      var list = document.getElementById("list");
      list.innerHTML = "";
      var user = firebase.auth().currentUser;
      if (user) {
        firebase.database().ref("todos/" + user.uid).remove();
      }
      Swal.fire({
        icon: 'success',
        title: 'Deleted!',
        text: 'All todos removed.',
        timer: 1200,
        showConfirmButton: false,
        position: 'top-end',
        toast: true
      });
    }
  });
}
function deleteSingleItem(btn) {
  Swal.fire({
    title: 'Are you sure?',
    text: "Do you really want to delete this todo?",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it',
    cancelButtonText: 'No, cancel'
  }).then((result) => {
    if (result.isConfirmed) {
      var li = btn.parentNode;
      var todoId = li.id;
      var user = firebase.auth().currentUser;
      if (user) {
        firebase.database().ref("todos/" + user.uid + "/" + todoId).remove();
      }
      li.remove();
      Swal.fire({
        icon: 'success',
        title: 'Todo Deleted',
        timer: 1000,
        showConfirmButton: false,
        position: 'top-end',
        toast: true
      });
    }
  });
}
function editSingleItem(btn) {
  Swal.fire({
    title: 'Edit Todo',
    input: 'text',
    inputValue: btn.parentNode.childNodes[0].data,
    showCancelButton: true,
    confirmButtonText: 'Save',
    cancelButtonText: 'Cancel',
    inputValidator: (value) => {
      if (!value) {
        return 'Please enter something';
      }
    }
  }).then((result) => {
    if (result.isConfirmed) {
      var li = btn.parentNode;
      li.childNodes[0].data = result.value;
      var todoId = li.id;
      var user = firebase.auth().currentUser;
      if (user) {
        firebase.database().ref("todos/" + user.uid + "/" + todoId + "/text").set(result.value);
      }
      Swal.fire({
        icon: 'success',
        title: 'Updated!',
        text: 'Todo has been updated.',
        timer: 1000,
        showConfirmButton: false,
        position: 'top-end',
        toast: true
      });
    }
  });
}
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    var todoList = document.getElementById("list");
    if (todoList) {
      todoList.innerHTML = "";
      firebase.database().ref("todos/" + user.uid).on("child_added", function (data) {
        var liElement = document.createElement("li");
        var liText = document.createTextNode(data.val().text);
        liElement.appendChild(liText);
        liElement.setAttribute("id", data.key);

        // Delete button
        var delBtnElement = document.createElement("button");
        var delBtnText = document.createTextNode("Delete");
        delBtnElement.appendChild(delBtnText);
        delBtnElement.setAttribute("onclick", "deleteSingleItem(this)");
        delBtnElement.style.backgroundColor = "cyan";
        delBtnElement.style.boxShadow = "0 0 20px cyan";
        liElement.appendChild(delBtnElement);

        // Edit button
        var editBtnElement = document.createElement("button");
        var editBtnText = document.createTextNode("Edit");
        editBtnElement.appendChild(editBtnText);
        editBtnElement.setAttribute("onclick", "editSingleItem(this)");
        editBtnElement.style.backgroundColor = "yellow";
        editBtnElement.style.boxShadow = "0 0 20px yellow";
        liElement.appendChild(editBtnElement);

        todoList.appendChild(liElement);
      });
    }
  }
});
function Signup() {
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;

  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(function (response) {
      var user_uid = response.user.uid;
      var user_obj = { user_name: name };
      firebase.database().ref("manage_users/" + user_uid).set(user_obj);
      setTimeout(function () {
        window.location.href = "login.html";
      }, 3000);
    })
    .catch(function (error) {
      console.log(error);
    });
}
function Login() {
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var namebtn = document.getElementById("namebtn");

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(function (response) {
      var user_uid = response.user.uid;
      firebase.database().ref("manage_users/" + user_uid).on("child_added", function (data) {
        localStorage.setItem("username", data.val());
      });
      setTimeout(function () {
        window.location.href = "todo.html";
      }, 3000);
    })
    .catch(function (err) {
      console.log(err);
    });

  if (namebtn) {
    namebtn.innerHTML = "Welcome " + localStorage.getItem("username");
  }
}
function logout() {
  firebase.auth().signOut()
    .then(function () {
      localStorage.removeItem("username");
      setTimeout(function () {
        window.location.href = "login.html";
      }, 3000);
    })
    .catch(function (error) {
      console.log(error);
    });
}
