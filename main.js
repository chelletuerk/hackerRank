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
      <div id=${obj.id} class="card">
        <img id=${obj.id} class="avatar"
          src=https://api.adorable.io/avatars/150/${obj.email}3E.png>
        <div id=${obj.id} class="card-content">
          <div id=${obj.id} class="catch-phrase">
            "${obj.company.catchPhrase}"
          </div>
          <div id=${obj.id} class="name">
            ${obj.name}
          </div>
          <div id=${obj.id} class="email">
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

$('.card-container').on('click', '.card', (e) => {
  const userId = e.target.id
  findPost(userId)
})

const findPost = (userId) => {
  $.ajax({
      url : `https://jsonplaceholder.typicode.com/posts?userId=${userId}`,
      type : 'GET',
      dataType:'json',
      success : (data) => {
        //findAssociatedPosts(res, userId)
        findAssociatedPosts(data, userId)
        // console.log(data)
      },
      error : (response) => {
          alert(`Error: ${response.status}`)
      }
  })
}

const findAssociatedPosts = (data, userId) => {
  if (userId) {
    const match = data.filter(obj => {
      return userId == obj.userId
    })
    const matches = match.sort(() => 0.5 - Math.random()).slice(0, 5)
    const posts = matches.map((post) => {
      console.log(post)
      console.log(post.title)
      console.log(post.body)
    })
  }
}

const randomThreeCards = (data) => {
  const randomThree = data.sort(() => 0.5 - Math.random()).slice(0, 3)
  displayCards(randomThree)
}
