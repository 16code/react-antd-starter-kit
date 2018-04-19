const menuData = [
    {
        name: 'home',
        icon: 'home',
        path: 'home'
    },
    {
        name: 'dashboard',
        icon: 'dashboard',
        path: 'dashboard',
        children: [
            {
                name: '分析页',
                path: 'analysis'
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
        children: [
            {
                name: '基础表单',
                path: 'basic-form'
            },
            {
                name: '分步表单',
                path: 'step-form'
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
function formatter(data, parentPath = '/', parentAuthority) {
    return data.map(item => {
        let { path } = item;
        if (!isUrl(path)) {
            path = parentPath + item.path;
        }
        const result = {
            ...item,
            path,
            authority: item.authority || parentAuthority
        };
        if (item.children) {
            result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
        }
        return result;
    });
}
export const getMenuData = () => formatter(menuData);
