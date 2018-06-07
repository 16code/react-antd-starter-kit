import { Button, Popover, Menu, Icon } from 'antd';
import DescriptionList from 'components/DescriptionList';
import Ellipsis from 'components/Ellipsis';
import userActions from '../../common/userActions';

import styles from './index.less';
const { Description } = DescriptionList;
const MenuItem = Menu.Item;

export default class DockPanelHead extends React.PureComponent {
    state = {
        visible: false
    };
    handleVisibleChange = visible => {
        this.setState({ visible });
    };
    renderMenu = () => {
        const { onActionMenuClick, actions } = this.props;
        return (
            <Menu onClick={onActionMenuClick}>
                {actions.map(act => {
                    return (
                        userActions[act] && (
                            <MenuItem key={act}>
                                <Icon type={userActions[act].icon} />
                                {userActions[act].label}
                            </MenuItem>
                        )
                    );
                })}
            </Menu>
        );
    };
    renderAction = () => {
        return (
            <Popover
                content={
                    <div onClick={() => this.handleVisibleChange(false)} className={styles['head-actions']}>
                        {this.renderMenu()}
                    </div>
                }
                placement="leftTop"
                title="更多操作"
                trigger="click"
                visible={this.state.visible}
                onVisibleChange={this.handleVisibleChange}
            >
                <Button htmlType="button" shape="circle" icon="ellipsis" />
            </Popover>
        );
    };

    renderExtra = () => {
        const { extra } = this.props;
        let data = Object.keys(extra);
        data = data.length <= 4 ? data : data.slice(0, 4);
        return (
            <DescriptionList
                size="small"
                gutter={16}
                col={data.length}
                layout="vertical"
                className={styles['head-extra']}
            >
                {data.map(item => (
                    <Description key={item} term={extra[item].label}>
                        <Ellipsis lines={1} tooltip>
                            {extra[item].value}
                        </Ellipsis>
                    </Description>
                ))}
            </DescriptionList>
        );
    };
    render() {
        const { title, actions, onClosePanel, extra } = this.props;
        return (
            <div className={styles['dock-panel-head']}>
                <div className={styles['head-title']}>
                    <span style={{ paddingRight: '8px' }}>{title}</span>
                    <div className={styles['head-right']}>
                        {actions && this.renderAction()}
                        <span className={styles['head-close']}>
                            <Button shape="circle" icon="close" onClick={onClosePanel} />
                        </span>
                    </div>
                </div>
                {extra && this.renderExtra()}
            </div>
        );
    }
}
