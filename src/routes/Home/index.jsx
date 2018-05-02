export default class Home extends React.PureComponent {
	state = {}
	componentDidMount() {
	    fetch('/list', {
	        params: {
	            page: 2,
	            take: 20	
	        }
	    }).then(res => {
	        this.setState({ list: res });
	        })
	        .catch(error => {
	            console.info(error, 'list');
	        });
	}
	render() {
	    console.log(this.state);
	    return <div>Home</div>;
	}
}
