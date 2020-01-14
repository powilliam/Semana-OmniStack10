module.exports = function parseStringToArray(string) {
    return string.split(',').map(items => items.trim())
}