import { Button, Tooltip, Popover, Checkbox } from 'antd';
import styles from './index.less';

export default class ToolbarRight extends React.PureComponent {
    state = {
        visible: false,
        key: this.randomKey
    };
	handleCheckboxChange = (item, event) => {
	    item.checked = event.target.checked;
	};
	handleClick = () => {
	    this.setState(prevState => ({ visible: !prevState.visible }));
	}
	handleConfirm = () => {
	    this.setState({ visible: false });
	    this.props.onConfirm(this.props.columns);
	};
	handleReset = () => {
	    const columns = this.resetCheckd;
	    this.props.onConfirm(columns);
	    this.setState({ visible: false, key: this.randomKey });
	};
	get randomKey() {
	    return Math.random().toString(32).substr(2, 7);
	}
	get resetCheckd() {
	    return this.props.columns.map(c => {
	        c.checked = true;
	        return c;
	    });
	}
    renderCheckBox = () => {
        const { columns } = this.props;
        const { key } = this.state;
        return (
            <div className={styles['selection-wrapper']}>
                <div className={styles['selection-list']} key={key}>
                    {columns.map((c, index) => (
                        c.dataIndex &&
                        <div className={styles['selection-item']} key={index}>
                            <Checkbox
                                onChange={event => this.handleCheckboxChange(c, event)}	
                                value={c.dataIndex}
                                defaultChecked={c.checked || true}
                            >{c.title}
                            </Checkbox>
                        </div>
                    ))}
                </div>
                <div className={styles['selection-actions']}>
                    <Button
                        onClick={this.handleConfirm}
                        htmlType="button"
                        type="primary"
                        style={{ marginRight: '8px' }}
                    >
                        确定
                    </Button>
                    <Button
                        onClick={this.handleReset}
                        htmlType="button"
                    >重置
                    </Button>
                </div>
            </div>
        );
    };
    render() {
        return (
            <Popover
                placement="leftTop"
                content={this.renderCheckBox()}
                visible={this.state.visible}
                title="选择显示字段"
                trigger="click"
            >
                <Tooltip placement="top" title="表头设置">
                    <Button type="default" shape="circle" icon="setting" onClick={this.handleClick} />
                </Tooltip>
            </Popover>
        );
    }
}
