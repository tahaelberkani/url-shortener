function updateLongUrlCharacterCount() {
    var longUrl = document.getElementById('longUrl').value;
    var length = longUrl.length;
    if (length == 0) {
        document.getElementById('characterCount1').innerHTML = 'write something to get a count of caracters.'
    } else {
        var displayText = 'this url is ' + length + ' characters long'
        console.log(displayText);
        document.getElementById('characterCount1').innerHTML = displayText
    }
}

async function sendAndUpdatePage() {
    var backend = "http://localhost:3000/api/"
    var longUrl = document.getElementById('longUrl').value;
    const response = await fetch(backend, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        url: longUrl
      }),
    });
    console.log("aaa")
    console.log(response)
    const data = await response.json();
    console.log(data)
    const {url} = data;
    updatepage(url)
//    const data = await response.json();

}


function updatepage(shortUrl) {
    var list = document.getElementsByClassName("firstInvisible");
    for (let item of list) {
        item.classList.remove("invisible")
    }
    var list2 = document.getElementsByClassName("secondInvisible");
    for (let item of list2) {
        item.classList.add("invisible")
    }
    document.getElementById("shortUrl").innerHTML = "http://localhost:3000/api/" + shortUrl
    document.getElementById("shortUrl").setAttribute("href", "http://localhost:3000/api/" + shortUrl)
    var length = shortUrl.length;
    var displayText = 'this url is ' + length + ' characters long'
    console.log(displayText);
    document.getElementById('characterCount1').innerHTML = displayText
}

function reloadPage() {
    location.reload();
    return false;
}

