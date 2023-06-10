const fetchTopTracks = (access_token, setData) => {
    fetch('https://api.spotify.com/v1/me/top/tracks?limit=20&time_range=long_term', {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + access_token },
        json: true
    }).then(res => {
        return res.json();
    }).then(data => {
        //console.log(data);
        setData(data);
    }).catch(err => {
        console.log(err);
    });
}

const fetchTopArtists = (access_token, setData) => {
    fetch('https://api.spotify.com/v1/me/top/artists?limit=10&time_range=short_term', {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + access_token },
        json: true
    }).then(res => {
        return res.json();
    }).then(data => {
        //console.log(data);
        setData(data);
    }).catch(err => {
        console.log(err);
    });
}


const fetchUserData = (access_token, setData) => {
    fetch('https://api.spotify.com/v1/me', {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + access_token },
        json: true
    }).then(res => {
        return res.json();
    }).then(data => {
        //console.log(data);
        setData(data);
    }).catch(err => {
        console.log(err);
    });
}

export { fetchTopTracks, fetchTopArtists, fetchUserData };
