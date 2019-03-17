//the code is not rendering exactly the same within the HackerRack editor.
//However, when you click on 'open new tab', it does render accordingly.
//I've made the app responsive with flexbox, so please, go changing
//browser window sizes to your delight!


//make initial API call to 'GET' users
//render 3 random user cards upon each refresh
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

//append expanding div underneath cards to render posts
$('.card-container').append(`
  <div class="posts-container"><span>Click a card to view five of their posts</span></div>
`)

//render posts corresponding with userId on card click
//expand div upon click to render 5 random posts
//hide expanding div instructions when open, and show again when collapsed
//remove previous posts upon each click
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

//API call using userId to GET corresponding posts
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

//render 3 random cards upon each refresh, returning a new array without
//mutating original array
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

//render title and body to corresponding userId
const displayPosts = (capTitle, body) => {
  $('.posts-container').append(`
    <div class="posts">
      <div class="title">${capTitle}</div>
      <div class="body">${body}</div>
    </div>
  `)
}

//pass in userId to filter results and return corresponding posts
//capitalize every word of title
const findAssociatedPosts = (data, userId) => {
  if (userId) {
    const match = data.filter(obj => {
      return userId == obj.userId
    })
    const matches = match.sort(() => 0.5 - Math.random()).slice(0, 5)
    const posts = matches.map((post) => {
      const title = post.title
      const capTitle = title.toLowerCase()
        .split(' ')
        .map((title) => title.charAt(0).toUpperCase() + title.substring(1))
        .join(' ')
      const body = post.body
      displayPosts(capTitle, body)
    })
  }
}

//sort through array to pull 3 random users upon each refresh
const randomThreeCards = (data) => {
  const randomThree = data.sort(() => 0.5 - Math.random()).slice(0, 3)
  displayCards(randomThree)
}
