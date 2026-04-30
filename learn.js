const form = document.getElementById('login');
const x = document.getElementById('login');
const password = document.getElementById('password');
const email = document.getElementById('email');

form.addEventListener('submit', async function(event){
  event.preventDefault();
  email.ariaValueMax;
  const password = document.getElementById('password').
  value;
console.log(email, password)

});

try {
    const r = await fetch('https://jsonplaceholder.typicode.com/todos`)

        const y await r.json (
        );

        const u = y.find((a)) => a.email === email)

        if(u){
            x.textContent = `welcome`
            localStorage.setItem(`fi`, JSON.stringify(y))
        }
         else{
            x.textContent = `wrong email`
            }


         } catch (error) {
            x.textContent = `something went wrong`



};
