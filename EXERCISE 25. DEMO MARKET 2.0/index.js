//  input value


let product = [
    { id: 1579581080923,category : 'Fast Food' , name: "Noodle", price: 3500, stock : 9},
    { id: 1579581081130,category : 'Electronic' , name: "Headphone", price: 430000, stock : 8},
    { id: 1579581081342,category : 'Cloth' , name: "Hoodie", price: 30000, stock : 7},
    { id: 1579581081577,category : 'Fruit' , name: "Apple", price: 10000, stock : 8}
];

const categories = ["All", "Fast Food", "Electronic", "Cloth", "Fruit"];

let carts = []

//  calculate all item 

const fnPayment = () => {
    const listPayment = carts.map((cart) => {
        const {id, category, name, price, qty} = cart

        return `<p> ${id} | ${category} | ${name} | ${price} x ${qty} = ${price * qty} </p> `
    })

    let subTotal = 0
    carts.forEach((cart) => {
        const {price, qty} = cart
        subTotal += (price * qty)
    })

    const ppn = subTotal * 0.1
    const finalTotal = subTotal + ppn

    const listDetail = listPayment.join("")
    const listTotal = `
        <h3>Sub Total Rp.${subTotal.toLocaleString("id")}</h3>
        <h3>Ppn Rp.${ppn.toLocaleString("id")}</h3>
        <h3>Total Rp.${finalTotal.toLocaleString("id")}</h3>
    `
    document.getElementById("Payment").innerHTML = listDetail + listTotal
}


// Render List
// bug

const fnRenderList = (index) => {
    const listProduct = product.map((product) => {
        const {id, category, name, price, stock} = product

        if(id != index){
            return `
                <tr>
                <td>${id}</td>
                <td>${category}</td>
                <td>${name}</td>
                <td>${price}</td>
                <td>${stock}</td>

                <td><input type="button" value="Add" onclick="fnAdd(${id})"></td>
                <td><input type="button" value="Delete" onclick="fnDelete(${id})"></td>
                <td><input type="button" value="Edit" onclick="fnEdit(${id})"></td
                
            </tr>`
        }

        return `
        <tr>
            <td>${id}</td>
            <td>${category}</td>
            <td><input value="${name}" type="text" id="nameEdit"></td>
            <td><input value="${price}" type="text" id="priceEdit"></td>
            <td><input value="${stock}" type="text" id="stockEdit"></td>
            <td><input type="button" value="Add" disabled></td>
            <td><input type="button" value="Save" onclick = "fnSave(${id})"></td>
            <td><input type="button" value="Cancel" onclick="fnCancel()"></td>
        </tr>`
    })

    const listCategory = categories.map((category) => {
        return `<option value="${category}">${category}</option>`

    })

    // data product
    document.getElementById("render").innerHTML = listProduct.join("")

    document.getElementById("catFilter").innerHTML = listCategory.join("")
    document.getElementById("catInput").innerHTML = listCategory.join("")

}


// ADD
const fnAdd = (index) => {
    
    const selectedProduct = product.find((product) => { return product.id == index})

    if(selectedProduct.stock == 0){
        alert('Stock sudah mencapai 0')
    } else {
            const foundCart = carts.find((cart) => { return cart.id == index})

        if(!foundCart) {
            const selectedProduct = product.find((product) => { return product.id == index})
            carts.push({...selectedProduct, qty : 1})
        } else {
            const idx = carts.findIndex((cart) => {return cart.id == index})

            carts[idx].qty ++
        }

        const idx = product.findIndex((product) => {return product.id == index})
        product[idx].stock --
        
    }
    

    fnRenderList()
    fnRenderCart()
}



// EDIT

const fnEdit = (index) => {
    fnRenderList(index)
}

// Cancel

const fnCancel = (index) => {
    fnRenderList()
}

// SAVE 

const fnSave = (index) => {
    const name = document.getElementById("nameEdit").value
    const price = document.getElementById("priceEdit").value
    const stock = document.getElementById("stockEdit").value

    // found index

    const found = product.findIndex((product) => {return product.id == index})

    // change data
    product[found] = {... product[found], name, price, stock}

    fnRenderList()

}

// DELETE

const fnDelete = (index) => {
    product = product.filter((product) => {
        return product.id != index
    })

    fnRenderList()
}

// DELETE CART

// DELETE

const fnDeleteCart = (index) => {

    const idxProduct = product.findIndex((product) => {return product.id == index})

    const idxCart = carts.findIndex((cart) => {return cart.id == index})
    
    product[idxProduct].stock += carts[idxCart].qty

    carts = carts.filter((cart) => {
        return cart.id != index
    })

    fnRenderList()

    fnRenderCart()
}


// RENDER CARTS

const fnRenderCart = () => {
    const listCart = carts.map((cart) => {
        const {id, category, name, price, qty} = cart
        return `
            <tr>
                <td>${id}</td>
                <td>${category}</td>
                <td>${name}</td>
                <td>${price}</td>
                <td>${qty}</td>
                <td><input type="button" value="Delete" onclick = "fnDeleteCart(${id})"></td>
            </tr>`
    })

    document.getElementById("carts").innerHTML = listCart.join("")
}








// RENDER FILTER

const fnRenderFilter = (arr) => {
    const listProduct = arr.map((product) => {
        const {id, category, name, price, stock} = product
        return `
            <tr>
                <td>${id}</td>
                <td>${category}</td>
                <td>${name}</td>
                <td>${price}</td>
                <td>${stock}</td>
                <td><input type="button" value="Add" onclick="fnAdd(${id})"></td>
                <td><input type="button" value="Delete" onclick="fnDelete(${id})"></td>
                <td><input type="button" value="Edit" onclick="fnEdit(${id})"></td
            </tr>`

    })

    // data product
    document.getElementById("render").innerHTML = listProduct.join("")

}

// Reset Filter

const fnResetFilter = () => {
    const inputTags = document.getElementsByName("txtFilter")
    
    for (const input of inputTags){
        input.value = ""
    }

    fnRenderList()
}

// input data

// const fnInputData = () => {
//     // get data from html
//     // create data object {push new data}
    
// }
const fnInputData = () => {

    const name = document.getElementById("nameInput").value
    const price = parseInt (document.getElementById("priceInput").value)
    const category = document.getElementById("catInput").value
    const stock  = document.getElementById("stockInput").value

    // create date object
    const time = new Date()
    const id = time.getTime()

    // push new data
    product.push ({id, name, price, category, stock})


    document.getElementById("nameInput").value = ""
    document.getElementById("priceInput").value = ""
    document.getElementById("stockInput").value = ""

// show render list
fnRenderList()

}
// FILTER NAME

const fnFilterName = () => {
    const keyword = document.getElementById("nameFilter").value

    const filterResult = product.filter((product) => {
        // get data from user
        // filtering
            const nameLow = product.name.toLowerCase()
    
    
            const keywordLow = keyword.toLowerCase()
    
            return nameLow.includes(keywordLow)
        
        })

        fnRenderFilter(filterResult)
}

    /* 
        gunakan array product(berisi semua data)
        melakukan filter dengan memilih data tertentu berdasarkan kriteria tertentu
        hasil filternya yang ditampilkan
    */

const fnFilterPrice = () => {
    // get min value
    const min = document.getElementById("min").value

    // get max value
    const max = document.getElementById("max").value

    let filterResult = product

    // lakukan filter saat 4semua text tidak kosong
    if(!(min == "" || max == "")){
        filterResult = product.filter((product) => {
            const {price} = product
            return price >= min && price <= max

        }) 
        
    }

    fnRenderFilter(filterResult)
}

// filter category

const fnFilterCategory = () => {
    const selectedCategory = document.getElementById("catFilter").value

    let filterResult = product

    if(selectedCategory != "All"){
        filterResult = product.filter((product) => {
            return product.category == selectedCategory
        })

    }
    fnRenderFilter(filterResult)


}

fnRenderList()
