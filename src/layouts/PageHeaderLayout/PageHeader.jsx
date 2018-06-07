import PropTypes from 'prop-types';
import { Tabs } from 'antd';
import classNames from 'classnames';
import Breadcrumb from 'components/Breadcrumb';

import styles from './style.less';
const { TabPane } = Tabs;
export default class PageHeader extends React.PureComponent {
    static propTypes = {
        onTabChange: PropTypes.func,
        tabList: PropTypes.array,
        action: PropTypes.element,
        title: PropTypes.string
    };
    handleOnChange = key => {
        if (this.props.onTabChange) {
            this.props.onTabChange(key);
        }
    };

    renderTabs(tabList, tabBarExtraContent) {
        const { tabActiveKey, tabDefaultActiveKey } = this.props;
        const activeKeyProps = {};
        if (tabDefaultActiveKey !== undefined) {
            activeKeyProps.defaultActiveKey = tabDefaultActiveKey;
        }
        if (tabActiveKey !== undefined) {
            activeKeyProps.activeKey = tabActiveKey;
        }
        return (
            <Tabs
                className={styles.tabs}
                {...activeKeyProps}
                onChange={this.handleOnChange}
                tabBarExtraContent={tabBarExtraContent}
            >
                {tabList.map(item => <TabPane tab={item.tab} key={item.key} />)}
            </Tabs>
        );
    }
    render() {
        const { title, logo, action, tabList, className, tabBarExtraContent } = this.props;
        const clsString = classNames(styles.pageHeader, className);
        return (
            <div className={clsString}>
                <Breadcrumb />
                <div className={classNames(styles.detail, { [styles['with-tabs']]: tabList })}>
                    {logo && <div className={styles.logo}>{logo}</div>}
                    <div className={styles.main}>
                        <div className={styles.row}>
                            {title && <h1 className={styles.title}>{title}</h1>}
                            {action && <div className={styles.action}>{action}</div>}
                        </div>
                    </div>
                </div>
                {tabList && tabList.length && this.renderTabs(tabList, tabBarExtraContent)}
            </div>
        );
    }
}
