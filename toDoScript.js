window.onload = () => {
  const form1 = document.querySelector("#addForm");

  let items = document.getElementById("items");
  let submit = document.getElementById("submit");

  let editItem = null;

  form1.addEventListener("submit", addItem);
  items.addEventListener("click", removeItem);
};

function addItem(e) {
  e.preventDefault();

  let newItem = document.getElementById("item").value;
  if (newItem.trim() == "" || newItem.trim() == null)
    return false;
  else
    document.getElementById("item").value = "";

  let li = document.createElement("li");
  li.className = "list-group-item col-10 bg-secondary";

  let deleteButton = document.createElement("button");

  deleteButton.className =
    "btn-danger btn btn-sm float-right delete";

  deleteButton.appendChild(document.createTextNode("Delete"));

  let markButton = document.createElement("button");

  markButton.className =
    "btn-info btn btn-sm float-right mark";

  markButton.appendChild(document.createTextNode("Mark"));

  li.appendChild(document.createTextNode(newItem));
  li.appendChild(deleteButton);
  li.appendChild(markButton);

  items.appendChild(li);
}

function removeItem(e) {
  e.preventDefault();
  if (e.target.classList.contains("delete")) {
    let li = e.target.parentNode;
    items.removeChild(li);
  }
  else if (e.target.classList.contains("mark")) {
    let li = e.target.parentNode;
    li.className="list-group-item col-10 bg-danger";
  }
}

function toggleButton(ref, btnID) {
  document.getElementById(btnID).disabled = false;
}
