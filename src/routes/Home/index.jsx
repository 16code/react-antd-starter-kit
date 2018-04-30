export default class Home extends React.PureComponent {
	state = {}
	componentDidMount() {
	    fetch('/list', {
	        params: {
	            page: 1,
	            take: 10	
	        }
	    }).then(res => {
	        this.setState({ list: res });
	        })
	        .catch(error => {
	            console.info(error, 'list');
	        });
	    fetch('/test').then(res => {
	        this.setState({ test: res });
	    })
	        .catch(error => {
	            console.info(error, 'test');
	        });
	    fetch('/post', {
	        method: 'POST',
	        body: {
	            user: 'lx',
	            pwd: 'hhahahah'
	        }
	    }).then(res => {
	        this.setState({ post: res });
	    })
	        .catch(error => {
	            console.info(error, 'test');
	        });
	}
	render() {
	    console.log(this.state);
	    return <div>13131</div>;
	}
}
