$.ajax({
    url : 'https://jsonplaceholder.typicode.com/users',
    type : 'GET',
    dataType:'json',
    success : (data) => {
      randomThreeCards(data)
    },
    error : (response) => {
        alert(`Error: ${response.status}`)
    }
})

const display = (randomThree) => {
  randomThree.map(obj => {
    $('.card-container').append(`
      <div class="card">
        <div class="card-content">
          <img class="avatar"
               src=https://api.adorable.io/avatars/150/${obj.email}3E.png>
          <div class="catch-phrase">
            "${obj.company.catchPhrase}"
          </div>
          <div class="name">
            ${obj.name}
          </div>
          <div class="email">
            ${obj.email}
          </div>
        </div>
      </div>`)
  })
}

const randomThreeCards = (data) => {
  const randomThree = data.sort(() => 0.5 - Math.random()).slice(0, 3)
  display(randomThree)
}
