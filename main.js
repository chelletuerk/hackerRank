$.ajax({
    url : 'https://jsonplaceholder.typicode.com/users',
    type : 'GET',
    dataType:'json',
    success : (data) => {
        console.log(data)
    },
    error : (response) => {
        alert(`Error: ${response.status}`)
    }
})
