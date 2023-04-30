const form = document.getElementById('myForm');
// const form = document.querySelector('#myForm');
form.addEventListener('submit', async (event) => {
  event.preventDefault(); // prevent form submission from refreshing the page

const name=document.getElementById("name").value;
const email=document.getElementById("email").value;
const msg=document.getElementById("message").value;


  const url = 'https://my-portfolio-shivam.onrender.com/submit-form'; // replace this with the URL to your server-side form handler
 
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({name:name,email:email,msg:msg})
    });
    const data = await response.json();
    console.log(data);
    if(data.success) alert("Thank you for your message! We'll get back to you as soon as possible.");
    // Do something with the response data, such as showing a success message to the user
  } catch (error) {
    console.error(error);
    // Handle any errors that occurred during form submission
  }
});