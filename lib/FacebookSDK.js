export const initFacebookSdk = () => {
  return new Promise((resolve, reject) => {
    // Load the Facebook SDK asynchronously
    window.fbAsyncInit = () => {
      window.FB.init({
        appId: "603592791842712",
        cookie: true,
        xfbml: true,
        version: "v18.0",
      });
      FB.AppEvents.logPageView();
      resolve();
      // Resolve the promise when the SDK is loaded
    };
  });
};

export const getFacebookLoginStatus = () => {
  return new Promise((resolve, reject) => {
    window.FB.getLoginStatus(async (response) => {
      resolve(response);
      if (response.authResponse) {
        // Get the pages the user manages and their access tokens
        // const data = await fetch(
        //   `https://graph.facebook.com/${response.authResponse.userID}/accounts?access_token=${response.authResponse.accessToken}`
        // );
        // const dataJson = await data.json();
        // console.log(dataJson);
        // // // // // // // // // // // // // // // // // // // // // // // // // // // // //
        // Get the page data, followers, posts, etc...
        //   const pageData = await fetch(
        //     `https://graph.facebook.com/v18.0/me?fields=name,followers_count,published_posts&access_token=EAAIk9uXyX5gBOyv9BYKE0AjVjQdZA8muiVQZBoCs89IZBZCTfOjhGZBNjeZA0OEqGBZCrPrpeZBmacyY2clSC5cZBZASZBQSPjlOoK63L63wozSZB5uyKOZBxkOwSHicW6kl3w7VOeDRZCkwWoKGrVSmJtx9ZAhHKg1lhOK0AIcyy4qdqkDuyAhc4mNxiP00RqLq18zZBTkp24m0gZBFzOXEPUNPOTOGsyXwZD`
        //   );
        //   const pageDataJson = await pageData.json();
        //   console.log(pageDataJson);
        // // // // // // // // // // // // // // // // // // // // // // // // // // // // //
        // Get the comment using its ID
        // const data = await fetch(
        //   `https://graph.facebook.com/v18.0/107400578717385_303882192413736/comments?access_token=EAAIk9uXyX5gBOyv9BYKE0AjVjQdZA8muiVQZBoCs89IZBZCTfOjhGZBNjeZA0OEqGBZCrPrpeZBmacyY2clSC5cZBZASZBQSPjlOoK63L63wozSZB5uyKOZBxkOwSHicW6kl3w7VOeDRZCkwWoKGrVSmJtx9ZAhHKg1lhOK0AIcyy4qdqkDuyAhc4mNxiP00RqLq18zZBTkp24m0gZBFzOXEPUNPOTOGsyXwZD`
        // );
        // const dataJson = await data.json();
        // console.log(dataJson);
      }
    });
  });
};

export const Logout = () => {
  return new Promise((resolve, reject) => {
    window.FB.logout((response) => {
      resolve(response);
    });
  });
};

export const fbLogin = () => {
  return new Promise((resolve, reject) => {
    window.FB.login(
      (response) => {
        resolve(response);
        console.log(response);
      },
      {
        scope:
          "public_profile,email,pages_show_list,pages_read_user_content,pages_read_engagement      ",
      }
    );
  });
};
