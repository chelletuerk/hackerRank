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
      <div class='card'>
        ${obj.name}</div>`)
  })
}

const randomThreeCards = (data) => {
  const randomThree = data.sort(() => 0.5 - Math.random()).slice(0, 3)
  display(randomThree)
}
