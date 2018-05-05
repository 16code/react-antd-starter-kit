import * as React from 'react';
interface ExtraItem {
    id: number;
    size: number;
}
export interface IDockPanelProps {
    size?: 'large' | 'middle' | 'small';
    visible: boolean;
    loading?: boolean;
    onClose?: Function;
    onClickAction?: Function;
    title: React.ReactNode | string;
    actions: Array<string>;
    extra: {
        [key: string]: ExtraItem;
    };
}

export default class DockPanel extends React.Component<IDockPanelProps, any> {}
