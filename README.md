# toDo

### Notes about LocalStorage


Local Storage pertenence a la ventana global de window, forma parte de la API de JS

Local Storage persiste

Session Storage solo cuando el navegador permanece abierto

### setItem
```js
// localStorage.setItem(key,value)
localStorage.setItem('name','Sofia')
sessionStorage.setItem('name','Sofia session')
```

LocalStorage sólo almacena strings

Por eso se puede usar JSON.stringify , de objeto a string

```js
const product = {
  name : "Monitor",
  price: 300
}

const productString = JSON.stringify(producto) // {"nombre":"Monitor,"precio":300}ç
localStorage.setItem('product', productString);

```

### getItem

JSON.parse de string a objeto

```js
/// localStorage.getItem(key);
const productString = localStorage.getItem('product'); // string
const productObject = JSON.parse(productString)         // object
```

### removeItem
```js
// localStorage.removeItem(key);
localStorage.removeItem('product);
```

### Update Item
No se puede hacer un update de los datos almacenado en Storage, lo que se hace es obtener el item, modificalo, volverlo a setear

```js
const meses = JSON.parse(localStorage.getItem('meses'));
meses.push('November');
localStorage.setItem('meses', JSON.stringify(meses));
```

### clear Storage

Borra todo

```js
localStorage.clear()
```

