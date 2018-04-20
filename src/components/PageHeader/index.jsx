import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Breadcrumb, Tabs } from 'antd';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { urlToList } from 'utils';
import styles from './index.less';

const { TabPane } = Tabs;

export default class PageHeader extends PureComponent {
    static contextTypes = {
        routesMap: PropTypes.object,
        location: PropTypes.object
    };
    handleOnChange = key => {
        if (this.props.onTabChange) {
            this.props.onTabChange(key);
        }
    };
    renderItem = (url, routeName) => {
        return (
            <Breadcrumb.Item key={url}>
                <Link to={url}>{routeName}</Link>
            </Breadcrumb.Item>
        );
    };
    renderLast = (url, routeName) => <Breadcrumb.Item key={url}>{routeName}</Breadcrumb.Item>;
    conversionBreadcrumbList = () => {
        const { location, routesMap } = this.props;
        const pathSnippets = urlToList(location.pathname);
        const extraBreadcrumbItems = pathSnippets.map((url, index) => {
            const routeName = routesMap[url] && routesMap[url].name;
            const isLast = index === pathSnippets.length - 1;
            const isFirst = index === 0;
            if (routeName) {
                if (isFirst || isLast) {
                    return this.renderLast(url, routeName);
                } else {
                    return this.renderItem(url, routeName);
                }
            }
            return null;
        });
        const breadcrumbItems = [
            <Breadcrumb.Item key="home">
                <Link to="/">Home</Link>
            </Breadcrumb.Item>
        ].concat(extraBreadcrumbItems);
        return <Breadcrumb className={styles.breadcrumb}>{breadcrumbItems}</Breadcrumb>;
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
        const { title, logo, action, content, extraContent, tabList, className, tabBarExtraContent } = this.props;
        const clsString = classNames(styles.pageHeader, className);
        const breadcrumb = this.conversionBreadcrumbList();

        return (
            <div className={clsString}>
                {breadcrumb}
                <div className={styles.detail}>
                    {logo && <div className={styles.logo}>{logo}</div>}
                    <div className={styles.main}>
                        <div className={styles.row}>
                            {title && <h1 className={styles.title}>{title}</h1>}
                            {action && <div className={styles.action}>{action}</div>}
                        </div>
                        <div className={styles.row}>
                            {content && <div className={styles.content}>{content}</div>}
                            {extraContent && <div className={styles.extraContent}>{extraContent}</div>}
                        </div>
                    </div>
                </div>
                {tabList && tabList.length && this.renderTabs(tabList, tabBarExtraContent)}
            </div>
        );
    }
}
