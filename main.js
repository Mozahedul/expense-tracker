const showBtn = document.getElementById("show-expense-btn");

const handleShowForm = () => {
  const formContainer = document.getElementById("form-container");
  formContainer.classList.add("form-visible");
};

const handleCloseForm = () => {
  const formContainer = document.getElementById("form-container");
  formContainer.classList.remove("form-visible");
};

// form submit handler
const handleFormSubmit = (event) => {
  event.preventDefault();

  // Catch form data
  const formData = new FormData(event.currentTarget);
  const expenseName = formData.get("expenseName");
  const expensePrice = formData.get("expensePrice");

  // Fetch localstorage data
  const expenseData = JSON.parse(localStorage.getItem("expense-list")) || [];
  if (expenseName && expensePrice) {
    const data = { name: expenseName, price: expensePrice };
    expenseData?.push(data);
  }

  // Set the localstorage data
  localStorage.setItem("expense-list", JSON.stringify(expenseData));

  // Optionally, you can reset the form after submission
  event.currentTarget.reset();

  // close the form after form submission
  handleCloseForm();

  // After form submitting reload the page to show the data instantly
  window.location.reload();
};

document.addEventListener("DOMContentLoaded", function () {
  const showData = document.getElementById("show-data");
  // Fetch localstorage data to in the html page
  const expenseList = JSON.parse(localStorage.getItem("expense-list"));
  let html = "";
  expenseList.forEach((list) => {
    html += `
      <div class="show-expense">
        <span>${list.name}</span>
        <span>${list.price}</span>
        <button class="close-button">X</button>
      </div>
    `;
  });
  showData.innerHTML = html;

  // Add close button functionalities
  const closeButtons = document.querySelectorAll(".close-button");
  closeButtons.forEach((button, index) => {
    button.addEventListener("click", (event) => {
      expenseList.splice(index, 1);
      localStorage.setItem("expense-list", JSON.stringify(expenseList));
      window.location.reload();
    });
  });

  console.log(closeButtons);
});
