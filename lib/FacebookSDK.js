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
    };
  });
};

export const fbLogin = () => {
  return new Promise((resolve, reject) => {
    window.FB.login(
      (response) => {
        resolve(response);
      },
      {
        scope:
          "public_profile,email,pages_show_list,pages_read_user_content,pages_read_engagement,instagram_basic",
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
          `https://graph.facebook.com/${response.authResponse.userID}/accounts?fields=access_token,name,id,instagram_business_account{username}&access_token=${longToken}`
        );
        const dataJson = await data.json();
        resolve(dataJson);
      }
    });
  });
};

// Get the data of a specific page using its id and token
export const getFacebookPageData = (pageId, pageToken) => {
  return new Promise(async (resolve, reject) => {
    const data = await fetch(
      `https://graph.facebook.com/v18.0/${pageId}?fields=name,picture{url},cover{source},published_posts{message,created_time,permalink_url,attachments},followers_count,instagram_business_account{username},access_token&access_token=${pageToken}`
    );
    const dataJson = await data.json();
    resolve(dataJson);
  });
};
export const getInstagramPageData = (pageId, pageToken) => {
  return new Promise(async (resolve, reject) => {
    const data = await fetch(
      `https://graph.facebook.com/v18.0/${pageId}?fields=followers_count,media{caption,comments_count,like_count,media_url,permalink,username,timestamp,media_type},name,media_count,profile_picture_url,username,website,follows_count,biography,ig_id&access_token=${pageToken}`
    );
    const dataJson = await data.json();
    resolve(dataJson);
  });
};

export const Logout = () => {
  return new Promise((resolve, reject) => {
    window.FB.logout((response) => {
      resolve(response);
    });
  });
};
