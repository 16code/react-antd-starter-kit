export default function asyncCmp(getComponent) {
    return class AsyncComponent extends React.PureComponent {
        static Component = null;
        state = { Component: AsyncComponent.Component };
        constructor() {
            super();
            this.unMount = false;
        }
        componentWillMount() {
            if (!this.state.Component) {
                getComponent()
                    .then(({ default: Component }) => {
                        AsyncComponent.Component = Component;
                        !this.unMount && this.setState({ Component });
                    })
                    .catch(e => {
                        console.info(e);
                    });
            }
        }
        componentWillUnmount() {
            this.unMount = true;
            if(this.child) this.child.setState = () => {};
        }
        render() {
            const { Component } = this.state;
            if (Component) {
                return <Component ref={node => (this.child = node)} {...this.props} />;
            }
            return <div>Loading...</div>;
        }
    };
}
