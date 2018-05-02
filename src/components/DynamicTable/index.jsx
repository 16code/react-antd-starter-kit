import { Table } from 'antd';
import PropTypes from 'prop-types';
import connect from 'redux-connect-decorator';
import ToolbarRight from './ToolbarRight';
import './index.less';
@connect(({ ajax }) => ({ isFetching: ajax.isFetching }))
export default class DynamicTable extends React.PureComponent {
	static propTypes = {
	    extra: PropTypes.element,
	    columns: PropTypes.array
	}
    state = {
        stateColumns: this.props.columns || []
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
        const { stateColumns } = this.state;
        const { pagination, columns, ...rest } = this.props;
        if (!columns) return null;
        if (pagination && pagination.showSizeChanger) {
            pagination.pageSizeOptions = ['20', '30', '50', '80', '100'];
        }
        return (
            <div className="data-table">
                <div className="data-table-toolbar">
                    {this.props.extra && <div className="data-table-toolbar-left">
                        {this.props.extra}
                    </div>}
                    <div className="data-table-toolbar-right">
                        <ToolbarRight
                            columns={stateColumns}
                            onConfirm={this.handleColumnChange}
                        />
                    </div>
                </div>
                <div className="data-table-body">
                    <Table
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
