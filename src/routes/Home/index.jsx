export default class Home extends React.PureComponent {
	state = {}
	componentDidMount() {
	    fetch('/list', {
	        params: {
	            page: 1,
	            take: 10	
	        }
	    }).then(res => {
	        console.info(res);
	        })
	        .catch(error => {
	            console.info(error, 'list');
	        });
	    fetch('/test').then(res => {
	        console.info(res);
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
	        console.info(res);
	    })
	        .catch(error => {
	            console.info(error, 'test');
	        });
	}
	render() {
	    return <div>13131</div>;
	}
}
