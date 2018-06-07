import { Layout } from 'antd';

export default function BlockLayout(props) {
    return (
        <Layout>
            <div className="page-content">{props.children}</div>
        </Layout>
    );
}
