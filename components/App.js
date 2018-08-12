var GIPHY_PUB_KEY = '0caB0mf9hB1Iwf0YjYpmMZuLpjth9saa',
    GIPHY_API_URL = 'https://api.giphy.com';

App = React.createClass({
    getInitialState: function() {
        return {
            loading: false,
            searchingText: '',
            gif: {}
        };
    },

    getGifPromise: function(searchingText, callback) {
        return new Promise(
        function(resolve, reject) {
            const url = GIPHY_API_URL + '/v1/gifs/random?api_key=' + GIPHY_PUB_KEY + '&tag=' + searchingText;  // 2.
            const xhr = new XMLHttpRequest();
            xhr.onload = function() {
                if (xhr.status === 200) {
                    var data = JSON.parse(xhr.responseText).data; // 4.
                    var gif = {  
                        url: data.fixed_width_downsampled_url,
                        sourceUrl: data.url
                    };
                    resolve(gif);
                } else {
                    reject(new Error(this.statusText));
                }
            };
            xhr.open('GET', url);
            xhr.send();
        });
    }, 

/* wywolanie getGifPromise */
    handleSearch: function(searchingText) { 
        this.setState({
          loading: true  
        });
        this.getGifPromise(searchingText)
        .then(function(gif) {  
          this.setState({  
            loading: false,  
            gif: gif,  
            searchingText: searchingText  
          });
        }.bind(this));
    },


    render: function() {

        var styles = {
            margin: '0 auto',
            textAlign: 'center',
            width: '90%'
        };

        return (
            <div style={styles}>
                <h1>Wyszukiwarka GIFow!</h1>
                <p>Znajdź gifa na <a href='http://giphy.com'>giphy</a>. Naciskaj enter, aby pobrać kolejne gify.</p>
            <Gif 
                loading={this.state.loading}
                url={this.state.gif.url}
                sourceUrl={this.state.gif.sourceUrl}
            />
            <Search onSearch={this.handleSearch}/>
            </div>
        )
    }
})

