import { Table } from 'antd';
import PropTypes from 'prop-types';
import ToolbarRight from './ToolbarRight';
import './index.less';

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
        const tableProps = { ...this.props, columns: this.tableColumns, size: 'middle' };
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
                    <Table {...tableProps} />
                </div>
            </div>
        );
    }
}
