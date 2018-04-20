const menuData = [
    {
        name: '首页',
        icon: 'home',
        path: 'home'
    },
    {
        name: '仪表盘',
        icon: 'dashboard',
        path: 'dashboard',
        role: ['admin', 'salesman', 'manager'],
        children: [
            {
                name: '分析页',
                path: 'analysis',
                role: ['admin']
            },
            {
                name: '监控页',
                path: 'monitor'
            }
        ]
    },
    {
        name: '表单页',
        icon: 'form',
        path: 'form',
        role: ['admin', 'salesman'],
        children: [
            {
                name: '基础表单',
                path: 'basic-form'
            },
            {
                name: '分步表单',
                path: 'step-form',
                role: ['salesman']
            }
        ]
    },
    {
        name: '列表页',
        icon: 'table',
        path: 'list',
        children: [
            {
                name: '查询表格',
                path: 'table-list'
            },
            {
                name: '搜索列表',
                path: 'search',
                children: [
                    {
                        name: '搜索列表（文章）',
                        path: 'articles'
                    },
                    {
                        name: '搜索列表（项目）',
                        path: 'projects'
                    }
                ]
            }
        ]
    }
];
/* eslint-disable-next-line */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/g;

function isUrl(path) {
    return reg.test(path);
}
function isHideMenu(curRole, menuRole) {
    if (!curRole) return true;
    if (!menuRole) return false;
    return ~menuRole.indexOf(curRole) ? false : true;
}
function formatter(data, currentUserRole, parentPath = '/', parentAuthRole) {
    return data.map(item => {
        let { path } = item;
        if (!isUrl(path)) {
            path = parentPath + item.path;
        }
        const result = {
            ...item,
            path,
            authRole: item.role || parentAuthRole,
            hideInMenu: isHideMenu(currentUserRole, item.role)
        };
        if (item.children) {
            result.children = formatter(item.children, currentUserRole, `${parentPath}${item.path}/`, item.role);
        }
        return result;
    });
}
export const getMenuData = currentUserRole => formatter(menuData, currentUserRole);

export function getMenuDataPathKeys(menus) {
    const keys = {};
    function loop(data) {
        data.forEach(item => {
            const { path, authRole, children } = item;
            if (children) loop(children);
            keys[path] = {
                authRole: authRole
            };
        });
    }
    loop(menus);
    return keys;
}
