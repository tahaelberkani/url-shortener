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

function sendAndUpdatePage() {
    var longUrl = document.getElementById('longUrl').value;
    var shortUrl = "https://bitly.com/";
    var list = document.getElementsByClassName("firstInvisible");
    for (let item of list) {
        item.classList.remove("invisible")
    }
    var list2 = document.getElementsByClassName("secondInvisible");
    for (let item of list2) {
        item.classList.add("invisible")
    }
    document.getElementById("shortUrl").innerHTML = shortUrl
    document.getElementById("shortUrl").setAttribute("href", shortUrl)
    var length = shortUrl.length;
    var displayText = 'this url is ' + length + ' characters long'
    console.log(displayText);
    document.getElementById('characterCount1').innerHTML = displayText
}

function reloadPage() {
    location.reload();
    return false;
}

