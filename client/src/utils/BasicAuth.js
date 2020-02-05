export default (name, pass) => 'Basic ' + window.btoa(`${name}:${pass}`)
