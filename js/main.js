let carrito = JSON.parse(localStorage.getItem("carrito")) ?? []

let productos = []

let bodyCarrito = document.querySelector("#canvaCarritoBody")

let totalCompra = document.querySelector("#totalCompra")



async function obtenerProductos() {
    const response = await fetch("./productos.json");
    return await response.json();
}

const mostrarProductos = () => {
    let divProductos = document.querySelector('#productos');
    divProductos.addEventListener('click', (e) => {
        añadirCarrito(e);
    });

    obtenerProductos().then((producto) => {
        productos = producto
        producto.forEach((element) => {
            const { imagen, nombre, precio, id } = element;
            divProductos.innerHTML += `
           
            <div class="col container-fluid">    
                <div class="card cardCarta border-light mb-3 bg-light bg-opacity-25"> 
                    <div class="card-header">
                        <img src="${imagen}" class="img-fluid">
                    </div>
                    <div class="card-body">
                        <h6>${nombre}</h6>
                        <p>$${precio}</p>
                    </div>
                </div>
                <button type="button" class="btn btn-success bg-dark btn-outline-"  id="${id}" >
                Añadir al carrito
              </button>
            </div>    
            
            `
        })
    })
    subtotal();

}


   



   const añadirCarrito = (e) => {
    let producto = productos.find(producto => producto && producto.id == e.target.id)
    if (carrito.find(producto => producto && producto.id == e.target.id)) {
        for (let index = 0; index < carrito.length; index++) {
            const producto = carrito[index];
            if (producto.id == e.target.id) {
                producto.cantidad++
            }
        }
    } else
        carrito.push({ ...producto, cantidad: 1, })
    localStorage.setItem("carrito", JSON.stringify(carrito));
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Tu producto se agregó al carrito',
        showConfirmButton:false,
        timer: 400
    })
       

    subtotal()

}

const subtotal = () => {
    bodyCarrito.innerHTML = ``
    carrito.forEach(producto => {
        bodyCarrito.innerHTML += `
        <div class="card cardCarrito p-3" style="width: 18rem;">
        <img src=${producto.imagen} class="img-fluid card-img-top" />
        <div class="card-body">
        <h4 class="card-title text-light fs-bold">${producto.nombre}</h4>
        <h6 class="card-text"> Precio: $${producto.precio} </h6>
        <h6> Cantidad:  ${producto.cantidad} </h4>
        </div>
        `
    });
    mostrarTotal()

}


const mostrarTotal = () => {
    let total = carrito.reduce((acc, producto) => acc + producto.precio * producto.cantidad, 0);
    totalCompra.innerHTML = `  
    <div class="card  bg-light  style="width: 20remrem;">
        <h5 class="card-header text-dark" >Precio final : </h5>
        <div class="card-body" style="width: 20rem;">
            <h6 class="card-text text-dark">$${total} </h6>
        </div>
    </div>    
        `;

};
 
const vaciarCarrito = () => {
    carrito = []
    bodyCarrito.innerHTML = ''
    totalCompra.innerHTML = ''

    localStorage.setItem("carrito", JSON.stringify(carrito))
}


const finalizarCompra = () => {
    carrito = []
    bodyCarrito.innerHTML = ''
    totalCompra.innerHTML = ''

    localStorage.setItem("carrito", JSON.stringify(carrito))
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Gracias por tu compra',
        showConfirmButton:false,
        timer: 500
})
}

mostrarProductos(); 