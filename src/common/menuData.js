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
        children: [
            {
                name: '分析页',
                path: 'analysis'
            },
            {
                name: '监控页',
                path: 'monitor',
                role: ['salesman', 'admin']
            }
        ]
    },
    {
        name: '表单页',
        icon: 'form',
        path: 'form',
        children: [
            {
                name: '基础表单',
                path: 'basic-form'
            },
            {
                name: '分步表单',
                path: 'step-form',
                role: ['admin', 'salesman']
            }
        ]
    },
    {
        name: '列表页',
        icon: 'table',
        path: 'list',
        children: [
            {
                name: '用户列表',
                path: 'users'
            },
            {
                name: '产品列表',
                path: 'products'
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

function formatter(data, parentPath = '/', parentAuthRole) {
    return data.map(item => {
        let { path } = item;
        if (!isUrl(path)) {
            path = parentPath + item.path;
        }
        const result = {
            ...item,
            path,
            authRole: item.role || parentAuthRole
        };
        if (item.children) {
            result.children = formatter(item.children, `${parentPath}${item.path}/`, item.role);
        }
        return result;
    });
}
export const getMenuData = () => formatter(menuData);

export function getMenuDataPathKeys(menus) {
    const keys = {};
    function loop(data) {
        data.forEach(item => {
            const { path, authRole, children, name } = item;
            if (children) loop(children);
            keys[path] = {
                authRole: authRole,
                name
            };
        });
    }
    loop(menus);
    return keys;
}
