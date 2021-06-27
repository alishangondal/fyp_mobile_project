import creatrfoodcontext from "./createfoodcontext";
import Recipe from "../API/FoodRecipe";

const Foodreducer = (state, action) => {
  switch (action.type) {
    case "get_login_data":
      return action.payload;
    case "get_data":
      return action.payload;
    case "get_filter":
      return action.payload;
    case "get_chief_data":
      return action.payload;
    case "get_food_data":
      return action.payload;
    case "get_cat_data":
      return action.payload;
    case "get_SUser_data":
      return action.payload;
    default:
      return state;
  }
};

const getsearch = (dispatch) => {
  return async (value) => {
    const response = await Recipe.get(
      `/recipes.json?orderBy="name"&startAt="${value}"&print=pretty`
    );
    var a = [];
    var j = 0;
    for (var i = 0; i < 100; i++) {
      if (!(response.data[i] == undefined)) {
        a[j] = response.data[i];
        j++;
      }
    }
    dispatch({ type: "get_filter", payload: a });
  };
};

const getlogindata = (dispatch) => {
  return async (name) => {
    const response = await Recipe.get(
      `/login.json?orderBy="user"&equalTo="${name}"&print=pretty`
    );
    var a = [];
    var j = 0;
    for (var i = 0; i < 100; i++) {
      if (!(response.data[i] == undefined)) {
        a[j] = response.data[i];
        j++;
      }
    }
    dispatch({ type: "get_login_data", payload: a });
  };
};

const getdata = (dispatch) => {
  return async () => {
    const response = await Recipe.get("/recipes.json");
    dispatch({ type: "get_data", payload: response.data });
  };
};

const getSingleuserdata = (dispatch) => {
  return async (type) => {
    const response = await Recipe.get(
      `/${type === "Chief" ? "chief" : "user"}.json`
    );
    dispatch({ type: "get_SUser_data", payload: response.data });
  };
};

const putfav = () => {
  return async (data, callback) => {
    var response = await Recipe.get(`/user/${data.user - 1}/${data.type}.json`);
    await Recipe.put(
      `/user/${data.user - 1}/${data.type}/${
        response.data == null ? 0 : response.data.length
      }.json`,
      {
        id: data.id,
        name: data.name,
        pic: data.pic,
      }
    );
    callback();
  };
};

const delfavrec = () => {
  return async (id, user, type, callback) => {
    var U = "user";
    var C = "fav_recipe";
    var delid = 0;
    if (type == "Chief") {
      U = "chief";
      C = "recipe";
    }
    const response = await Recipe.get(`/${U}/${user - 1}/${C}.json`);
    for (var i = 0; i < response.data.length; i++) {
      if (response.data[i] == null) {
        continue;
      }
      if (response.data[i].id == id) {
        delid = i;
        break;
      }
    }
    if (type == "Chief") {
      await Recipe.delete(`recipes/${id - 1}.json`);
    }
    await Recipe.delete(`/${U}/${user - 1}/${C}/${delid}.json`);
    callback();
  };
};

const delfavchief = () => {
  return async (id, user, callback) => {
    var delid;
    const response = await Recipe.get(`/user/${user - 1}/fav_chief.json`);
    for (var i = 0; i < response.data.length; i++) {
      if (response.data[i] == null) {
        continue;
      }
      if (response.data[i].id == id) {
        delid = i;
        break;
      }
    }
    await Recipe.delete(`/user/${user - 1}/fav_chief/${delid}.json`);
    callback();
  };
};

const putregistrationdata = (dispatch) => {
  return async (data, callback) => {
    var type;
    if (data.type == "Chief") {
      type = "chief";
    } else {
      type = "user";
    }
    var response = await Recipe.get(`/${type}.json`);
    await Recipe.put(`/${type}/${response.data.length}.json`, {
      id: response.data.length + 1,
      name: data.name,
      email: data.email,
      ph: data.phone,
    });
    var id = response.data.length + 1;
    response = await Recipe.get(`/login.json`);
    await Recipe.put(`/login/${response.data.length}.json`, {
      id: id,
      user: data.email,
      name: data.name,
      pass: data.password,
      account_type: data.type,
    });
    callback();
  };
};

const putrevorypass = (dispatch) => {
  return async (data, callback) => {
    await Recipe.put(`/login/${data.id - 1}.json`, {
      id: data.id,
      user: data.email,
      name: data.name,
      pass: data.pass,
      account_type: data.type,
    });
    callback();
  };
};

const putrecipe = (dispatch) => {
  return async (data, callback) => {
    var id = data.id;
    var response = await Recipe.get(`/recipes.json`);
    data.id = response.data.length + 1;
    await Recipe.put(`/recipes/${response.data.length}.json`, {
      id: data.id,
      name: data.name,
      pic: data.pic,
      rate: data.rate,
      serving: data.serving,
      views: data.views,
      category: data.category,
      des: data.des,
      ingredients: data.ingredients,
    });
    response = await Recipe.get(`/chief/${id - 1}/recipe.json`);
    await Recipe.put(
      `/chief/${id - 1}/recipe/${
        response.data == null ? 0 : response.data.length
      }.json`,
      {
        id: data.id,
        name: data.name,
        pic: data.pic,
      }
    );
    response = await Recipe.get(`/food.json`);
    await Recipe.put(`/food/${response.data.length}.json`, {
      id: response.data.length + 1,
      catogory: data.category,
      name: data.name,
      recipe: { id: data.id, name: data.name, pic: data.pic },
    });
    callback();
  };
};

const getcheifdata = (dispatch) => {
  return async () => {
    const response = await Recipe.get("/chief.json");
    dispatch({ type: "get_chief_data", payload: response.data });
  };
};

const getfooddata = (dispatch) => {
  return async () => {
    const response = await Recipe.get("/food.json");
    dispatch({ type: "get_food_data", payload: response.data });
  };
};

const getcatdata = (dispatch) => {
  return async (cat) => {
    const response = await Recipe.get(
      `/recipes.json?orderBy="category"&equalTo="${cat}"&print=pretty`
    );
    var a = [];
    var j = 0;
    for (var i = 0; i < 100; i++) {
      if (!(response.data[i] == undefined)) {
        a[j] = response.data[i];
        j++;
      }
    }
    dispatch({ type: "get_cat_data", payload: a });
  };
};

export const { Context, Provider } = creatrfoodcontext(
  Foodreducer,
  {
    getdata,
    getcheifdata,
    getcatdata,
    getlogindata,
    getSingleuserdata,
    putregistrationdata,
    putrevorypass,
    putrecipe,
    putfav,
    delfavrec,
    delfavchief,
    getsearch,
    getfooddata,
  },
  []
);
