const url = new URLSearchParams(window.location.search);
const idParams = url.get('id');

// PRODUCT.HTML ELEMENT
const row = document.querySelector('#row')

// PRODUCTS.HTML ELEMENT
const col_2 = document.querySelector('#col-2');

// CART.HTML ELEMENT
const container = document.querySelector('#small-container')

// Initializing Sql.js Library
config = {
    locateFile: (filename) => `js/dist/${filename}`
}

const iniSqlJs = window.initSqlJs;
iniSqlJs(config).then((SQL) => {
    const db = new SQL.Database();

    // FUNCTION TO CREATE A cart TABLE
    const createTable = () => {
        const query = `CREATE TABLE IF NOT EXISTS cart
         (
           id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
           name TEXT NOT NULL,
           price INT NOT NULL,
           quantity INT NOT NULL
         )`

        db.run(query);

    }

    // FUNCTION TO INSERT DATA TO cart
    const saveProduct = () => {
        const query = `INSERT INTO cart(name,price,quantity) VALUES 
              ("Exclusive print","26.00","1"),
              ("Men's Hand Chain","20.00","1"),
              ("Lady Canvas sz:39","15.00","1"),
              ("best sneaker sz:46","18.00","1"),
              ("Smooth trouser Men","20.00","1"),
              ("Samsung Galaxy S24","790.00","1"),
              ("IPhone 16 pro Max","1100.00","1"),
              ("Hp Laptop core i5","250.00","1"),
              ("Canvas sz:42","49.00","1"),
              ("Smart Watch latest Version","18.00","1"),
              ("Men Jean High Quality","22.00","1"),
              ("Men's beach wear","12.00","1"),
              ("T-shirt","$670.00","1")`;

        db.run(query);

    }

    // FUNCTION TO FETCH DATA FROM cart TABLE
    const getProducts = () => {
        const query = 'SELECT * FROM cart';
        const res = db.exec(query);

        /*
           product[0] == id
           product[1] == Name
           product[2] == Price
           product[3] == Quantity
      
        */
        //  Iterating through the products array from database
        const values = res[0].values;
        values.map((product) => {

            let [id, name, price] = [product[0], product[1], product[2]];

            let html = `
            <div class="col-4">
              <img src="im/photo/images (47).jpeg">
              <h4>${name}</h4>
              <div class="rating">
                  <i class="fa fa-star"></i>
                  <i class="fa fa-star"></i>
                  <i class="fa fa-star"></i>
                  <i class="fa fa-star-half-o"></i>
                  <i class="fa fa-star-o"></i>
              </div>
              <p>$${price}</p>
              <a href="products.html?id=${id}" class="btn">Buy</a>
          </div>
          `;
            row.innerHTML += html;

        })

    }

    // FUNCTION TO FETCH SINGLE DATA FROM cart TABLE
    const getProduct = (id) => {
        const query = `SELECT * FROM cart WHERE id = ${id}`;
        const res = db.exec(query);

        /*
           val.values[0][0] == id
           val.values[0][1] == Name
           val.values[0][2] == Price
           val.values[0][3] == Quantity
         
        */

        // Extracting the value
        res.map((val) => {
            const [id, name, price, quantity] = [val.values[0][0], val.values[0][1], val.values[0][2], val.values[0][3]];

            const html = `
            <p class="error" style="color: orangered; font-size: 20px;"></p>
                <p>Home / t-shirt</p>
                <h1 class="productName">${name}</h1>
                <h4 class="productPrice">$${price}</h4>
                <select>
                    <option>select size</option>
                    <option>XXL</option>
                    <option>XL</option>
                    <option>large</option>
                    <option>small</option>
                </select>
                <span class="pQuantity">Quantity : ${quantity}</span>
                <button class="btn">Buy Now</button>
                 <a href="cart.html?id=${id}" id='cartBtn' class="btn">Add to Cart</a> 

                <h3>Product Details <i class="fa fa-ident"></i></h3>
                <br>
                <p>Give your summer wardrobe a style with the Exclusive print
                    Men's Active T-shirt. team it with pairs of shoe
                    for outing
                </p>
            `;

            col_2.innerHTML += html;

            // IMPLEMENTING CART.HTML
            let tax = 2.60;
            let total = parseInt(price) + tax;

            const hml = `
               <table>
            <tr>
                <th>product</th>
                <th>Quantity</th>
                <th>Subtotal</th>
            </tr>
            <tr>
                <td>
                    <div class="cart-info">
                        <img src="work/T shirt 2.jpeg">
                        <div>
                            <p>${name}</p>
                            <small>price: $${price}</small>
                            <br>
                            <button class="btn">Remove</button>
                        </div>
                    </div>
                </td>
                <td>

                <div style='display: flex; align-items: center; gap: 4px;'>
                  <input id='input' type='number' value=${quantity} />
                  <span>${quantity} </span>
               </div>

                </td>
                <td>${price}</td>
            </tr>
        </table>
        <div class="total-price">
            <table>
                <tr>
                    <td>Subtotal</td>
                    <td>$${price}</td>
                </tr>
                <tr>
                    <td>tax</td>
                    <td>$${tax}</td>
                </tr>
                <tr></tr>
                <td>total</td>
                <td>$${total}</td>
                </tr>
            </table>
            `;

            container.innerHTML += hml;
            
            
        })
        
    }

    // CALLING FUNCTIONS
    createTable();
    saveProduct();
    getProducts();
    getProduct(idParams);

})
