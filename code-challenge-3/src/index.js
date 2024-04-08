//write your code here
const db = "http://localhost:3000/films"


document.addEventListener("DOMContentLoaded", () => {
  getMovies();
  document.querySelector("#buy-ticket").addEventListener("click", handleBuyTicket);
});
//introduce a function that will be used to get a specific movie
function getMovies() {
  fetch(db)
  .then(res => res.json())
  .then(movies => {
      movies.forEach(movie => {renderMovieList(movie)})
      const firstMovie = document.querySelector("#id1");
      firstMovie.dispatchEvent(new Event("click"));
  })
}
//use another function that will render the movies' list
function renderMovieList(movie) {
  const li = document.createElement("li");
  li.textContent = `${movie.title}`;
  li.id = "id" + movie.id;
  const ul = document.querySelector("#films");
  ul.appendChild(li);
  li.classList.add("film");
  li.classList.add('item');
  li.addEventListener("click", () => {handleMovieClick(movie)})
}
//introduce another function that will handle the click
function handleMovieClick(movie) {
  const poster = document.querySelector("img#poster")
  poster.src = movie.poster;
  poster.alt = movie.title;
  const info = document.querySelector("#showing");
  info.querySelector("#title").textContent = movie.title;
  info.querySelector("#runtime").textContent = movie.runtime+" minutes";
  info.querySelector("#film-info").textContent = movie.description;
  info.querySelector("#showtime").textContent = movie.showtime;
  info.querySelector("#ticket-num").textContent = movie.capacity - movie.tickets_sold + " remaining tickets";
}
//introduce another function for buying tickets
function handleBuyTicket(a) {
  const ticketDiv = document.querySelector("#ticket-num");
  const tickets = ticketDiv.textContent.split(" ")[0];
  if (tickets > 0) {
      ticketDiv.textContent = tickets - 1 + " remaining tickets";
  }
  else if (tickets == 0) {
      alert("No more tickets!");//output is given to the user that the tickets are sold out
      a.target.classList.add("sold-out");
      a.target.classList.remove("orange");
  }
}