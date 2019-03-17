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

$('.card-container').append(`
  <div class="posts-container"><span>Click a card to view five of their posts</span></div>
`)

$('.card-container').on('click', '.card', (e) => {
    const userId = e.target.id
    $('.posts-container').toggleClass('expanded')

    if ($('.posts-container').hasClass('expanded')) {
      $('span').hide()
      getPost(userId)
    } else {
      $('.posts').children().remove()
      $('span').show()
    }
  })

const getPost = (userId) => {
  $.ajax({
      url : `https://jsonplaceholder.typicode.com/posts?userId=${userId}`,
      type : 'GET',
      dataType:'json',
      success : (data) => {
        findAssociatedPosts(data, userId)
      },
      error : (response) => {
          alert(`Error: ${response.status}`)
      }
  })
}

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

const displayPosts = (title, body) => {
  $('.posts-container').append(`
    <div class="posts">
      <div class="title">${title}</div>
      <div class="body">${body}</div>
    </div>
  `)
}

const findAssociatedPosts = (data, userId) => {
  if (userId) {
    const match = data.filter(obj => {
      return userId == obj.userId
    })
    const matches = match.sort(() => 0.5 - Math.random()).slice(0, 5)
    const posts = matches.map((post) => {
      const title = post.title
      const body = post.body
      displayPosts(title, body)
    })
  }
}

const randomThreeCards = (data) => {
  const randomThree = data.sort(() => 0.5 - Math.random()).slice(0, 3)
  displayCards(randomThree)
}
