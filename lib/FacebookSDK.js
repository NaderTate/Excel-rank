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

export const fbLogin = () => {
  return new Promise((resolve, reject) => {
    window.FB.login(
      (response) => {
        resolve(response);
        console.log(response);
      },
      {
        scope:
          "public_profile,email,pages_show_list,pages_read_user_content,pages_read_engagement",
      }
    );
  });
};

export const getFacebookLoginStatus = () => {
  return new Promise((resolve, reject) => {
    window.FB.getLoginStatus(async (response) => {
      resolve(response);
    });
  });
};

// Get the pages the user manages and their access tokens
export const getUserPages = () => {
  return new Promise((resolve, reject) => {
    window.FB.getLoginStatus(async (response) => {
      if (response.authResponse) {
        const longToken = localStorage.getItem("fbLongToken");
        const data = await fetch(
          `https://graph.facebook.com/${response.authResponse.userID}/accounts?access_token=${longToken}`
        );
        const dataJson = await data.json();
        resolve(dataJson);
      }
    });
  });
};

// Get the data of a specific page using its id and token
export const getPageData = (pageId, pageToken) => {
  return new Promise(async (resolve, reject) => {
    const data = await fetch(
      `https://graph.facebook.com/v18.0/${pageId}?fields=name,picture{url},cover{source},published_posts{message,created_time,permalink_url,attachments},followers_count,access_token&access_token=${pageToken}`
    );
    const dataJson = await data.json();
    console.log(dataJson);
    resolve(dataJson);
  });
};

export const Logout = () => {
  return new Promise((resolve, reject) => {
    window.FB.logout((response) => {
      resolve(response);
      console.log(response);
    });
  });
};

