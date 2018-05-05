import PropTypes from 'prop-types';
import { Spin } from 'antd';
import { DockPanelWrapper, DockPanelMask } from './DockPanel';
import DockPanelHead from './DockPanelHead';
import DockPanelBody from './DockPanelBody';
import styles from './index.less';

const extraItemShape = {
    label: PropTypes.string,
    value: PropTypes.any
};

class DockPanel extends React.PureComponent {
    static propTypes = {
        size: PropTypes.oneOf(['large', 'middle', 'small']),
        onClose: PropTypes.func,
        onClickAction: PropTypes.func,
        visible: PropTypes.bool,
        loading: PropTypes.bool,
        title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
        actions: PropTypes.array,
        extra: PropTypes.objectOf(PropTypes.shape(extraItemShape))
    };
    static defaultProps = {
        visible: false,
        size: 'large'
    };
    handleClosePanel = () => {
        const { onClose } = this.props;
        if (onClose) this.props.onClose();
    };
    handleActionMenuClick = ({ key }) => {
        const { extra, onClickAction } = this.props;
        onClickAction && onClickAction(key, extra);
    };
    render() {
        const { size, visible, loading, extra, title, actions, children } = this.props;
        return (
            <div className={styles['dock-panel-wrapper']}>
                <DockPanelMask visible={visible} onClick={this.handleClosePanel} />
                <DockPanelWrapper visible={visible} size={size}>
                    <DockPanelHead 
                        title={title}
                        actions={actions}
                        extra={extra}
                        onClosePanel={this.handleClosePanel}
                        onActionMenuClick={this.handleActionMenuClick}
                    />
                    <DockPanelBody extra={extra}>
                        <Spin spinning={visible && loading}>{children}</Spin>
                    </DockPanelBody>
                </DockPanelWrapper>
            </div>
        );
    }
}

export default DockPanel;
