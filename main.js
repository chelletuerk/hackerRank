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

const displayCards = (randomThree) => {
  randomThree.map(obj => {
    $('.card-container').prepend(`
      <div class="card">
        <img class="avatar"
          src=https://api.adorable.io/avatars/150/${obj.email}3E.png>
        <div class="card-content">
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
      </div>
      `)
  })
}

$('.card-container').append(`
  <div class="posts-container"><span>Click a card to view five of their posts</span></div>
`)

const randomThreeCards = (data) => {
  const randomThree = data.sort(() => 0.5 - Math.random()).slice(0, 3)
  displayCards(randomThree)
}
