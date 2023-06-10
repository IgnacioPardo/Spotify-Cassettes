const fetchTopTracks = (access_token, setData, onError, time_range = 'short_term', callback) => {
    fetch('https://api.spotify.com/v1/me/top/tracks?limit=20&time_range=' + time_range, {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + access_token },
        json: true
    }).then(res => {
        return res.json();
    }).then(data => {
        //console.log(data);
        setData(data);
        callback();
    }).catch(onError);
}

const fetchTopArtists = (access_token, setData, onError, time_range = 'short_term') => {
    fetch('https://api.spotify.com/v1/me/top/artists?limit=10&time_range=' + time_range, {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + access_token },
        json: true
    }).then(res => {
        return res.json();
    }).then(data => {
        //console.log(data);
        setData(data);
    }).catch(onError);
}


const fetchUserData = (access_token, setData, onError) => {
    fetch('https://api.spotify.com/v1/me', {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + access_token },
        json: true
    }).then(res => {
        return res.json();
    }).then(data => {
        //console.log(data);
        setData(data);
    }).catch(onError);
}

const fetchTracksAudioFeatures = async (access_token, track_ids, callback) => {
    var track_ids_query = track_ids.join(',');
    fetch('https://api.spotify.com/v1/audio-features?ids=' + track_ids_query, {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + access_token },
        json: true
    }).then(res => {
        return res.json();
    }).then(data => {
        callback(data);
        return data;
    }).catch(err => {
        console.log(err);
    });
}

export { fetchTopTracks, fetchTopArtists, fetchUserData, fetchTracksAudioFeatures };
