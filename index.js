const form = document.getElementById('myForm');
// const form = document.querySelector('#myForm');
form.addEventListener('submit', async (event) => {
  event.preventDefault(); // prevent form submission from refreshing the page

const name=document.getElementById("name").value;
const email=document.getElementById("email").value;
const msg=document.getElementById("message").value;


  // const url = 'https://my-portfolio-shivam.onrender.com/submit-form'; // replace this with the URL to your server-side form handler
   const url="http://localhost:8000/submit-form";
  var modal = document.getElementById("loading-modal");
  var submit_message=document.getElementById("submit-message");
  modal.style.display = "block";
  var progressBar = document.getElementById("loading-progress-bar");
  var progress = document.getElementById("modal_P");
  var Button = document.getElementById("modal_button");

  Button.style.display="none";
  progress.style.display="block";
  progressBar.style.width = "10%";
  submit_message.innerHTML="Loading...";

  var progressW = 0;
  var intervalId = setInterval(function() {
      progressW += 20;
      progressBar.style.width = progressW + "%";
      if (progressW >= 100) {
          clearInterval(intervalId);
      }
  }, 500);

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({name:name,email:email,msg:msg})
    });
   
    const data = await response.json();
    if (data.success) {
      clearInterval(intervalId);
  }
    progress.style.display="none";
    console.log(data);

    
    form.reset();
    if(data.success) {
      submit_message.innerHTML="Thank you for your message! We'll get back to you as soon as possible.";
      Button.style.display = "block";
    }
    document.getElementById("myButton").addEventListener("click", function() {
      modal.style.display = "none";
    });
    // if(data.success) alert("Thank you for your message! We'll get back to you as soon as possible.");
    // Do something with the response data, such as showing a success message to the user
  } catch (error) {
    console.error(error);
    // Handle any errors that occurred during form submission
  }
});

// code for mapping the skills in hmtl file goes here

  // Fetch the JSON data from the file
  fetch('skills.json')
    .then(response => response.json())
    .then(data => {
      // Call a function to map the skills to the HTML
      mapSkills(data.skills);
    })
    .catch(error => console.error('Error fetching skills data:', error));

  // Function to map skills to HTML
 // index.js

// Function to map skills to HTML
function mapSkills(skills) {
  const skillsContainer = document.getElementById('skillsContainer');

  // Loop through the skills array and create HTML elements
  skills.forEach(skill => {
    const skillItem = document.createElement('div');
    skillItem.classList.add('skill-item');

    const iconElement = document.createElement('i');
    // Split the class names by spaces and add them individually to the class list
    skill.icon.split(' ').forEach(className => {
      iconElement.classList.add(className);
    });

    const nameElement = document.createElement('h3');
    nameElement.textContent = skill.name;

    const categoryElement = document.createElement('p');
    categoryElement.textContent = skill.category;

    skillItem.appendChild(iconElement);
    skillItem.appendChild(nameElement);
    skillItem.appendChild(categoryElement);

    skillsContainer.appendChild(skillItem);
  });
}

// javascript code for project section
// Function to fetch project data from JSON and populate projects section
async function fetchProjects() {
  try {
    const response = await fetch('project.json');
    const data = await response.json();
    const projectsContainer = document.querySelector('.projects .row');

    data.projects.forEach(project => {
      const projectCard = `
        <div class="col-md-4 ">
          <a href="${project.link}" target="_blank" rel="noopener noreferrer">
            <div class="card mb-4  shadow-sm">
              <img src="${project.image}" class="card-img-top" alt="${project.name}">
              <div class="card-body">
                <h5 class="card-title">${project.name}</h5>
                <p class="card-text">${project.description}</p>
                <p class="card-text"><strong>Technologies:</strong> ${project.technologies.join(', ')}</p>
              </div>
            </div>
          </a>
        </div>
      `;
      projectsContainer.innerHTML += projectCard;
    });
  } catch (error) {
    console.error('Error fetching projects data:', error);
  }
}

// Call the function to populate projects on page load
fetchProjects();
