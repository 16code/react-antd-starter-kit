import 'rc-drawer-menu/assets/index.css';
import React from 'react';
import DrawerMenu from 'rc-drawer-menu';
import SiderMenu from './SiderMenu';

export default function AppSiderMenu(props) {
    return props.isMobile ? (
        <DrawerMenu
            parent={null}
            level={null}
            iconChild={null}
            placement="left"
            handleChild={false}
            open={!props.collapsed}
            onMaskClick={() => {
                props.onCollapse(true);
            }}
        >
            <SiderMenu width="200px" {...props} collapsed={props.isMobile ? false : props.collapsed} />
        </DrawerMenu>
    ) : (
        <SiderMenu {...props} />
    );
}
