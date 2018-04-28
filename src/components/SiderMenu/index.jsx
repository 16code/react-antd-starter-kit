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
            open={!props.collapsed}
            onMaskClick={() => {
                props.onCollapse(true);
            }}
            width="230px"
        >
            <SiderMenu {...props} collapsed={props.isMobile ? false : props.collapsed} />
        </DrawerMenu>
    ) : (
        <SiderMenu {...props} />
    );
}
