export default class Home extends React.PureComponent {
    componentDidMount() {
        fetch('/list').then(res => {
            console.log(res);
        })
            .catch(error => {
                console.info(error, 'list');
            });
        fetch('/test').then(res => {
            console.log(res);
        })
            .catch(error => {
                console.info(error, 'test');
            });
    }
    render() {
        return <div>HOME</div>;
    }
}
