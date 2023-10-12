const myForm = document.getElementById('my-form');
const amount = document.getElementById('amount');
const description = document.getElementById('description');
const category = document.getElementById('category');
const list = document.getElementById('list');
const mssg = document.querySelector('.msg');

myForm.addEventListener('submit' , onSubmit);

function onSubmit(e) {
    e.preventDefault();

    if(amount.value === "" || description.value === ""){
        //Display an error message
        mssg.classList.add('error');
        mssg.textContent = 'Please enter all fields';

        // Remove error after 3 seconds
        setTimeout(() => mssg.remove(), 3000);
    }else{
        const amount = e.target.amount.value;
        const description = e.target.description.value;
        const category = e.target.category.value;
    
        const user = {
            amount,
            description,
            category
        };
    
        localStorage.setItem(user.amount + "-" + user.description + "-" + user.category , JSON.stringify(user));
        showUserOnScreen(user);
    }
}

function showUserOnScreen(user){
    const li = document.createElement('li');
    const details = document.createTextNode(`${amount.value} - ${description.value} - ${category.value}`);
 
    //Adding Delete Button and Functionality
    const deleteBtn = document.createElement('input');
    deleteBtn.type = "button";
    deleteBtn.value = 'Delete';
    deleteBtn.style.color = 'white';
    deleteBtn.style.backgroundColor = 'Red';

    deleteBtn.onclick = () => {
        localStorage.removeItem(user.amount + "-" + user.description + "-" + user.category);
        list.removeChild(li);
    }

    //Adding Edit Button and Functionailty
    const editBtn = document.createElement('input');
    editBtn.type = "button";
    editBtn.value = "Edit";
    editBtn.style.backgroundColor = 'lightBlue';

    editBtn.onclick = () => {
        localStorage.removeItem(user.amount + "-" + user.description + "-" + user.category);
        list.removeChild(li);
        document.getElementById('amount').value = user.amount;
        document.getElementById('description').value = user.description;
        document.getElementById('category').value = user.category;
    }

    li.appendChild(details);
    li.appendChild(deleteBtn);
    li.appendChild(editBtn);
    list.appendChild(li);

    // Clear Fields 
    amount.value = '';
    description.value = '';
    category.value = '';
}