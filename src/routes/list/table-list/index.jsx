import Table from './Table';
import Header from './Header';

export default class TableList extends React.PureComponent {
    render() {
        return (<Header {...this.props}>
			Table List<Table />
        </Header>);
    }
}
