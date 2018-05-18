const Loading = require('../Loading').Loading;
const asyncComponent = getComponent => {
    return class AsyncComponent extends React.PureComponent {
        state = { Component: null };
        constructor() {
            super();
            this.unMount = false;
        }
        componentWillMount() {
            if (!this.state.Component) {
                getComponent()
                    .then(({ default: Component }) => {
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
                return <Component key="Component" ref={node => (this.child = node)} {...this.props} />;
            }
            return <div style={{ paddingTop: '80px' }}><Loading key="Loading" size="small" /></div>;
        }
    };
};

module.exports = asyncComponent;