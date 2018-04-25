export default class Home extends React.PureComponent {
	state = {

	}
	componentDidMount() {
	    console.info('componentDidMount home');
	    fetch('/list', {
	        params: {
	            page: 1,
	            take: 10	
	        }
	    })
	        .then(res => {
	            console.log(res);
	            this.setState({ list: res });
	        })
	        .catch(error => {
	            console.info(error, 'list');
	        });
	    fetch('/test').then(res => {
	        console.log(res);
	        this.setState({ test: res });
	    })
	        .catch(error => {
	            console.info(error, 'test');
	        });
	    fetch('/post', {
	        method: 'POST',
	        params: {
	            page: 1,
	            take: 10	
	        },
	        body: {
	            user: 'lx',
	            pwd: 'hhahahah'
	        }
	    }).then(res => {
	        console.log(res);
	        this.setState({ post: res });
	    })
	        .catch(error => {
	            console.info(error, 'test');
	        });
	}
	render() {
	    return <div>HOME</div>;
	}
}
