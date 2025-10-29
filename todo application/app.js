var userInput = document.getElementById("todoInput");

  function addTodo() {
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

      // delete button
      var delBtnElement = document.createElement("button");
      var delBtnText = document.createTextNode("Delete");
      delBtnElement.appendChild(delBtnText);
      delBtnElement.setAttribute("onclick", "deleteSingleItem(this)");
      liElement.appendChild(delBtnElement);
      delBtnElement.style.backgroundColor = "cyan";
      delBtnElement.style.boxShadow = "0 0 20px cyan";

      // Edit button
      var editBtnElement = document.createElement("button");
      var editBtnText = document.createTextNode("Edit");
      editBtnElement.appendChild(editBtnText);
      editBtnElement.setAttribute("onclick", "editSingleItem(this)");
      editBtnElement.style.backgroundColor = "yellow";
      editBtnElement.style.boxShadow = "0 0 20px yellow";
      liElement.appendChild(editBtnElement);

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
        btn.parentNode.remove();
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
        btn.parentNode.childNodes[0].data = result.value;
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