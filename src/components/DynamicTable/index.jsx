import { Table } from 'antd';
import PropTypes from 'prop-types';
import connect from 'redux-connect-decorator';
import ToolbarRight from './ToolbarRight';
import styles from './index.less';
@connect(({ ajax }) => ({ isFetching: ajax.isFetching }))
export default class DynamicTable extends React.PureComponent {
	static propTypes = {
	    extra: PropTypes.array,
	    columns: PropTypes.array
	}
	constructor(props) {
	    super(props);
	    const { showSizeChanger } = props;
	    this.handleShowSizeChange = this.handleShowSizeChange.bind(this);
	    this.state = {
	        dataSource: [],
	        stateColumns: this.props.columns || [],
	        pagination: {
	            current: 1,
	            pageSize: 10,
	            showSizeChanger: !!showSizeChanger,
	            onChange: this.handleShowSizeChange,
	            onShowSizeChange: this.handleShowSizeChange,
	            pageSizeOptions: ['10', '20', '30', '50', '80', '100'],
	            showTotal: (total) => `共 ${total} 条`
	        }
	    };
	}
	componentDidMount() {
	    this.fetchData();
	}
	componentWillReceiveProps(nextProps) {
	    if (nextProps.searchParams && (nextProps.searchParams !== this.props.searchParams)) {
	        this.fetchData();
	    }
	}
	async fetchData() {
	    const { current, pageSize } = this.state.pagination;
	    const { url, fieldKey, searchParams } = this.props;
	    const params = searchParams ? Object.assign({ pageSize, current }, searchParams) : { pageSize, current };
	    const result = await fetch(url, { params }).catch(e => {
	        console.info(e, 'list');
	    });
	    result && this.setState({
	        dataSource: fieldKey ? result[fieldKey] : result,
	        pagination: Object.assign(this.state.pagination, result.meta)
	    });
	}
	handleShowSizeChange(current, pagSize) {
	    const { pagination } = this.state;
	    pagination.current = current;
	    pagination.pageSize = pagSize;
	    this.setState({ pagination }, () => {
	        this.fetchData();
	    });
	};
	get tableColumns() {
	    const { stateColumns } = this.state;
	    return stateColumns.map(c => {
	        if (c.checked === undefined) c.checked = true;
	        return c;
	    }).filter(c => c.checked);
	}
    handleColumnChange = newColumns => {
        this.setState({ stateColumns: [...newColumns] });
    };
    render() {
        const { stateColumns, pagination } = this.state;
        const { columns, extra, ...rest } = this.props;
        if (!columns) return null;
        return (
            <div className={styles['dynamic-table']}>
                <div className={styles['dynamic-table-toolbar']}>
                    {extra &&
                    <div className={styles['dynamic-table-left']}>
                        {React.Children.map(extra, item => (
                            <div className={styles['col-item']}>{item}</div>
                        ))}
                    </div>}
                    <div className={styles['dynamic-table-right']}>
                        <ToolbarRight
                            columns={stateColumns}
                            onConfirm={this.handleColumnChange}
                        />
                    </div>
                </div>
                <div className={styles['dynamic-table-body']}>
                    <Table
                        dataSource={this.state.dataSource}	
                        size="middle"
                        loading={this.props.isFetching}	
                        columns={this.tableColumns}
                        pagination={pagination}
                        {...rest}
                    />
                </div>
            </div>
        );
    }
}
