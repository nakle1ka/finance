function readFileAsBase64(e) {
    return new Promise(resolve => {
        const reader = new FileReader()
        reader.readAsDataURL(e.target.files[0])

        reader.onload = function (event) {
            let data = event.target.result
            resolve(data)
        }
    })
}

export default readFileAsBase64