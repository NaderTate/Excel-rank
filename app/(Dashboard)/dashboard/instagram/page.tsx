import React from "react";

function page() {
  return (
    <div>
      <a href="https://www.facebook.com/v18.0/dialog/oauth?client_id=603592791842712&display=page&extras={'setup':{'channel':'IG_API_ONBOARDING'}}&redirect_uri=https://localhost:3000/dashboard/instagram&response_type=token&scope=instagram_basic,instagram_content_publish,instagram_manage_comments,instagram_manage_insights,pages_show_list,pages_read_engagement">
        Login to Facebook
      </a>
    </div>
  );
}

export default page;
