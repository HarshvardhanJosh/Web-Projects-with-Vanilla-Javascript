const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const MovieSelect = document.getElementById('movie');
populateUI();

let ticketPrice = parseInt(MovieSelect.value);

// Save selected movie index and price
function SetMovieData(movieIndex, moviePrice){
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}

// Update total count
function updateSelectedCount(){
    const selectedSeats = document.querySelectorAll('.row .seat.selected');

    // Node list to array
    const seatIndex = [...selectedSeats].map(seat=> [...seats].indexOf(seat));
    localStorage.setItem('selectedSeats',JSON.stringify(seatIndex));
    
    const selectedseatCount = selectedSeats.length;

    count.innerText = selectedseatCount;
    total.innerText = selectedseatCount*ticketPrice;

}

//populateUI()- Get data from localstorage and populate UI
    function populateUI(){
        const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
        
        if(selectedSeats !== null && selectedSeats.length > 0){
            seats.forEach((seat, index)=>{
                if(selectedSeats.indexOf(index) > -1){
                    seat.classList.add('selected');
                }
            });
        }

        const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
        if(selectedMovieIndex !== null){
            MovieSelect.selectedIndex = selectedMovieIndex;
        }
    }

// Movie select event
MovieSelect.addEventListener('change', (e)=>{
    ticketPrice = +e.target.value;

    SetMovieData(e.target.selectedIndex, e.target.value);

    updateSelectedCount();

})
// Seat click event
container.addEventListener('click',(e)=>{

    if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')){
        e.target.classList.toggle('selected');

        updateSelectedCount();
    }
    e.preventDefault();
});

// Initial count and total set
updateSelectedCount();