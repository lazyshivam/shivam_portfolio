const form = document.getElementById('myForm');
// const form = document.querySelector('#myForm');
form.addEventListener('submit', async (event) => {
  event.preventDefault(); // prevent form submission from refreshing the page

const name=document.getElementById("name").value;
const email=document.getElementById("email").value;
const msg=document.getElementById("message").value;


  const url = 'https://my-portfolio-shivam.onrender.com/submit-form'; // replace this with the URL to your server-side form handler
 
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