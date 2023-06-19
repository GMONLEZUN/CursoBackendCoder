class ProductManager{
    products;
    static id = 0;
    constructor(){
        this.products = [];
    }
    addProduct(title, description, price, thumbnail, code, stock){
        if (!title || !description || !price || !thumbnail || !code || !code || !stock) {
            throw new Error("Error: debés completar todos los campos del producto a agregar")  
        }
        let codeRepeated = this.products.findIndex(prod => prod.code == code);
        if (codeRepeated != -1) {
            throw new Error(`El código ya existe en el producto: ${this.products[codeRepeated].title}`)
        }
        const product = {
            id: ProductManager.id,
            title: title,
            description: description,
            price: price,
            thumbnail: thumbnail,
            code: code,
            stock: stock
        };

        this.products.push(product);
        ProductManager.id++;
    }
    getProducts(){
        return this.products;
    }
    getProductById(id){
        let product = this.products.find(prod => prod.id == id);
        if (!product) {
            throw new Error("Not found");
        }
        return product;
    }
}

const productManager = new ProductManager();

console.log(productManager.getProducts());

productManager.addProduct("Agua","Agua mineral sin gas", 250, "Imagen1","4fx2654fx154",35);
productManager.addProduct("Pepsi","Bebida Pepsi botella 2.25lts", 850, "Imagen1","4fx2660fb164",100);
productManager.addProduct("Gancia Pomelo","Bebida con alcohol sabor pomelo lata 500ml", 420, "Imagen1","5fx2560df165",100);
productManager.addProduct("Fernet Branca","Bebida con alcohol marca Branca, botella 1lts", 1950, "Imagen1","1bx2440db424",150);

console.log(productManager.getProducts());
console.log(productManager.getProductById(2));

// Error campo code repetido
// productManager.addProduct("Surtido Bagley","Galletitas surtidas marca Bagley paquete 500gr", 365, "Imagen1","1bx2440db424",77);

// Error campos obligatorios faltantes
// productManager.addProduct("Yerba Unión","Yerba marca Union paquete 900gr", 300, "Imagen1",77);

// Error producto con id no encontrado
// console.log(productManager.getProductById(99));