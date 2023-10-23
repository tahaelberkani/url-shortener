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