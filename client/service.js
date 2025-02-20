const axios = require("axios");
axios.defaults.withCredentials = true;

// file used to link send request on the server side
export async function login(email, password) {
  try {
    const response = await axios({
      method: "post",
      url: "http://localhost:5000/login",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: {
        email: email,
        password: password,
      },
    });
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function registerAsClient(
  email,
  password,
  firstName,
  lastName,
  referralCode = null
) {
  console.log("Client registration request");
  try {
    var body = {
      email: email,
      password: password,
      first_name: firstName,
      last_name: lastName,
      user_type: "Client",
    };
    if (referralCode != null) {
      body.referral_code = referralCode;
    }
    const response = await axios({
      method: "post",
      url: "http://localhost:5000/register",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: body,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function registerAsRestorer(
  email,
  password,
  firstName,
  lastName,
  restaurantName,
  category,
  address,
  zipcode,
  country,
  city,
  phoneNumber,
  state = null,
  referral_code = null
) {
  try {
    var body = {
      email: email,
      password: password,
      first_name: firstName,
      last_name: lastName,
      user_type: "Restaurant",
    };
    if (referral_code != null) {
      body.referral_code = referral_code;
    }
    const response = await axios({
      method: "post",
      url: "http://localhost:5000/register",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: body,
    });

    if (response.status == 201) {
      var bodyAddress = {
        zipcode: zipcode,
        address: address,
        city: city,
        country: country,
        last_name: lastName,
        first_name: firstName,
        phone_number: phoneNumber,
      };
      if (state != null) {
        bodyAddress.state = state;
      }
      await axios({
        method: "post",
        url: "http://localhost:5000/addresses",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        data: bodyAddress,
      });

      await axios({
        method: "post",
        url: "http://localhost:5000/restaurants",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        data: {
          name: restaurantName,
          category: category,
        },
      });
    }

    return response.data;
  } catch (error) {
    console.log(error);
  }
  console.log("Restorer registration request");
}

//////////////
// Client part

const distAddress = "http://localhost:5000";

export async function getRestaurantsList() {
  try {
    const restaurantsList = await axios.get(distAddress + "/restaurants/"); // Mettre en paramètre quels restaurants afficher
    const datas = restaurantsList.data.data;
    return datas;
  } catch (err) {
    console.log(err);
  }
  return;
}

export async function getDishesList(restaurantId) {
  try {
    const dishesList = await axios.get(distAddress + "/dishes/", {
      params: {
        id: restaurantId,
      },
    }); // Mettre en paramètre quels restaurants afficher
    const datas = dishesList.data.data;
    return datas;
  } catch (err) {
    console.log(err);
  }
  return;
}

export async function addToBasket() {
  console.log("");
}

export async function order(
  userId,
  deliveryAddress,
  restaurantId,
  productsId,
  menuIds,
  price
) {
  try {
    const response = await axios.post(distAddress + "/clientorder/", {
      data: {
        user_id: userId,
        delivery_address: deliveryAddress,
        restaurant_id0: restaurantId,
        product_ids: productsId,
        menu_ids: menuIds,
        price: price,
        payment_token: "token_payment",
      },
    });
    console.log(response.data);
    return response.data;
  } catch (e) {
    console.log(e);
  }
  return;
}

////////////////
// Restorer part
export async function modifyDish(
  restaurantId,
  dishId,
  newName,
  newDescription,
  newPrice
) {
  try {
    const modifyDish = await axios.put(distAddress + "/modify/", {
      data: {
        id: restaurantId,
        idToModify: dishId,
        name: newName,
        description: newDescription,
        price: newPrice,
      },
    });
    const datas = modifyDish.data;
    return datas;
  } catch (err) {
    console.log(err);
  }
  return;
}

export async function addDish(
  restaurantId,
  dishName,
  dishDescription,
  dishPrice,
  dishImage
) {
  try {
    const response = await axios.post(distAddress + "/add/", {
      data: {
        id: restaurantId,
        dishName: dishName,
        dishDescription: dishDescription,
        dishPrice: dishPrice,
        dishPicture: dishImage,
      },
    });
    return response.data;
  } catch (e) {
    console.log(e);
  }
  return;
}

export async function getOrders() {
  try {
    const response = await axios.get(distAddress + "/orders/");
    return response;
  } catch (e) {
    console.log(e);
  }
}

export async function getDeliveries() {
  try {
    const response = await axios.get(distAddress + "/deliveries/");
    return response;
  } catch (e) {
    console.log(e);
  }
}

export async function modifyEmail(userId, newMail) {
  try {
    const response = await axios.put(distAddress + "/modifyemail/", {
      data: {
        id: userId,
        email: newMail,
      },
    });
    return response;
  } catch (e) {
    console.log(e);
  }
}

export async function modifyPassword(userId, newPwd) {
  try {
    const response = await axios.put(distAddress + "/modifypwd/", {
      data: {
        id: userId,
        password: newPwd,
      },
    });
    return response;
  } catch (e) {
    console.log(e);
  }
}

export async function getDeliveryAddress(userId) {
  try {
    const response = await axios.get(distAddress + "/getDeliveryAddress/", {
      params: {
        user_id: userId,
      },
    });
    return response.data;
  } catch (e) {
    console.log(e);
  }
}

export async function updateOrder(orderId, deliveryManId, newState) { // Delivery Man
  try {
    const response = await axios.put(distAddress + "/deliveries/", {
      data: {
        id: orderId,
        deliveryman_id: deliveryManId,
        newState: newState,
      },
    });
    return response;
  } catch (e) {
    console.log(e);
  }
}

export async function restorerAcceptOrder(orderId) { // Restorer
  try {
    const response = await axios.put(distAddress + "/restoreracceptorder/", {
      data: {
        orderID: orderId,
      }
    });
    return response;
  } catch (e) {
    console.log(e);
  }
}

export async function createNewAddress(userId, firstName, lastName, address, zipcode, city, state, country, phoneNumber, infos) {
  try {
    const response = await axios.post(distAddress + "/createNewAddress/", {
      data: {
        user_id: userId,
        firstName: firstName,
        lastName: lastName,
        address: address,
        zipcode: zipcode,
        city: city,
        state: state,
        country: country,
        phoneNumber: phoneNumber,
        infos: infos,
      },
    });
    return response.data;
  } catch (e) {
    console.log(e)
  }
}