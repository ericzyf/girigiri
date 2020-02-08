export default (name, pass) => {
    const E = new TextEncoder()
    name = String.fromCharCode(...E.encode(name))
    return 'Basic ' + window.btoa(`${name}:${pass}`)
}