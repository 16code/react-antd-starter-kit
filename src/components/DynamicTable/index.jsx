import { Table } from 'antd';
import PropTypes from 'prop-types';
import connect from 'redux-connect-decorator';
import classNames from 'classnames';
import ToolbarRight from './ToolbarRight';
import styles from './index.less';
const Loading = require('components/Loading').Loading;

@connect(({ ajax }) => ({ isFetching: ajax.isFetching }))
export default class DynamicTable extends React.PureComponent {
    static propTypes = {
        extra: PropTypes.array,
        columns: PropTypes.array
    };
    static defaultProps = {
        searchParams: {}
    };
    static pageContent;
    constructor(props) {
        super(props);
        const { showSizeChanger } = props;
        this.handleShowSizeChange = this.handleShowSizeChange.bind(this);
        this.state = {
            dataSource: [],
            stateColumns: this.props.columns || [],
            pagination: {
                current: 1,
                pageSize: 30,
                showSizeChanger: !!showSizeChanger,
                onChange: this.handleShowSizeChange,
                onShowSizeChange: this.handleShowSizeChange,
                pageSizeOptions: ['10', '20', '30', '50', '80', '100'],
                showTotal: total => `共 ${total} 条`
            }
        };
    }
    componentDidMount() {
        this.pageContent = document.querySelector('.page-content');
        this.fetchData();
    }
    componentWillUnmount() {
        if (this.timer) window.clearTimeout(this.timer);
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.searchParams && nextProps.searchParams !== this.props.searchParams) {
            this.timer = window.setTimeout(() => this.fetchData(nextProps.searchParams), 300);
        }
    }
    scrollToBoxTop() {
        this.pageContent.scrollTo(0, 0);
    }
    async fetchData(searchParams = {}) {
        const { current, pageSize } = this.state.pagination;
        const { url, fieldKey, searchParams: prevSearchParams } = this.props;
        const mergeParams = Object.assign({ pageSize, current }, prevSearchParams, searchParams);
        const result = await fetch(url, { params: mergeParams }).catch(e => {
            console.info(e);
        });
        result &&
            this.setState({
                dataSource: fieldKey ? result[fieldKey] : result,
                pagination: Object.assign(this.state.pagination, result.meta)
            });
        this.scrollToBoxTop();
    }
    handleShowSizeChange(current, pagSize) {
        const { pagination } = this.state;
        pagination.current = current;
        pagination.pageSize = pagSize;
        this.setState({ pagination }, () => {
            this.fetchData();
        });
    }
    get tableColumns() {
        const { stateColumns } = this.state;
        return stateColumns
            .map(c => {
                if (c.checked === undefined) c.checked = true;
                return c;
            })
            .filter(c => c.checked);
    }
    handleReloadData = () => {
        this.fetchData();
    };
    handleColumnChange = newColumns => {
        this.setState({ stateColumns: [...newColumns] });
    };
    render() {
        const { stateColumns, pagination } = this.state;
        const { columns, extra, isFetching, ...rest } = this.props;
        if (!columns) return null;
        const toolbarCls = classNames(styles['dynamic-table-toolbar'], { [styles['without-extra']]: !extra });
        return (
            <div className={styles['dynamic-table']}>
                <div className={toolbarCls}>
                    {extra && (
                        <div className={styles['dynamic-table-left']}>
                            {React.Children.map(extra, item => <div className={styles['col-item']}>{item}</div>)}
                        </div>
                    )}
                    <div className={styles['dynamic-table-right']}>
                        <ToolbarRight
                            loading={isFetching}
                            columns={stateColumns}
                            onReload={this.handleReloadData}
                            onConfirm={this.handleColumnChange}
                        />
                    </div>
                </div>
                <div className={styles['dynamic-table-body']}>
                    {isFetching && (
                        <div className={styles['table-loading-mask']}>
                            <div className="loading">
                                <Loading />
                            </div>
                        </div>
                    )}
                    <Table
                        dataSource={this.state.dataSource}
                        size="middle"
                        loading={isFetching}
                        columns={this.tableColumns}
                        pagination={pagination}
                        {...rest}
                    />
                </div>
            </div>
        );
    }
}
