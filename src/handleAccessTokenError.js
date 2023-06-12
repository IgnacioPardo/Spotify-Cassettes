export function handleAccessTokenError(err) {
  // If access token is invalid, redirect to refresh_token endpoint with current refresh token
  console.log("err", err);
  if (err.status === 401) {
    var searchParams = new URLSearchParams(window.location.search);
    let refresh_token = searchParams.get("refresh_token");
    //console.log("refresh_token", refresh_token);
    //window.location.redirect(`/refresh_token?refresh_token=${refresh_token}`);
    // alert("Your session has expired. Please log in again.");
    // window.location.href = "/login";
    window.location.href = `/refresh_token?refresh_token=${refresh_token}`;
  }
}
